import { join } from "node:path";
import {
    existsSync,
    mkdirSync,
    rmSync,
    writeFileSync,
    renameSync,
    readFileSync,
} from "node:fs";

const cwd = process.cwd();
const distRoot = join(cwd, "dist", "npm");
const registry = "https://registry.npmjs.org";

const targets = [
    { platform: "darwin", arch: "arm64", bunTarget: "bun-darwin-arm64" },
    { platform: "darwin", arch: "x64", bunTarget: "bun-darwin-x64" },
    { platform: "linux", arch: "arm64", bunTarget: "bun-linux-arm64" },
    { platform: "linux", arch: "x64", bunTarget: "bun-linux-x64" },
    { platform: "win32", arch: "x64", bunTarget: "bun-windows-x64" },
];

type PackageJson = {
    name: string;
    version: string;
    type?: string;
    description?: string;
    repository?: any;
    exports?: any;
    os?: string[];
    cpu?: string[];
    files?: string[];
    bin?: Record<string, string>;
    publishConfig?: Record<string, any>;
    [key: string]: any;
};

type SpawnResult = ReturnType<typeof Bun.spawnSync>;

function run(cmd: string, args: string[], opts?: { cwd?: string; allowFail?: boolean; quiet?: boolean }): SpawnResult {
    const result = Bun.spawnSync({
        cmd: [cmd, ...args],
        cwd: opts?.cwd ?? cwd,
        stdout: opts?.quiet ? "pipe" : "inherit",
        stderr: opts?.quiet ? "pipe" : "inherit",
    });

    if (!opts?.allowFail && result.exitCode !== 0) {
        throw new Error(`command failed: ${cmd} ${args.join(" ")}`);
    }

    return result;
}

function readJson<T>(path: string): T {
    return JSON.parse(readFileSync(path, "utf-8")) as T;
}

function writeJson(path: string, data: any) {
    writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
}

function ensureDir(path: string) {
    if (!existsSync(path)) mkdirSync(path, { recursive: true });
}

function packageExists(name: string, version: string): boolean {
    const result = run("npm", ["view", `${name}@${version}`, "version", "--registry", registry], {
        allowFail: true,
        quiet: true,
    });

    return result.exitCode === 0;
}

const ghRepo = process.env.GITHUB_REPOSITORY || "Pamperkyumi/kecare";
const repository = {
    type: "git",
    url: `https://github.com/${ghRepo}`,
};

let rawTag = "";

// Prefer the tag from the GitHub event itself when the workflow is triggered by a tag push.
if (process.env.GITHUB_REF?.startsWith("refs/tags/")) {
    rawTag = process.env.GITHUB_REF.replace("refs/tags/", "");
} else if (process.env.GITHUB_REF_TYPE === "tag" && process.env.GITHUB_REF_NAME) {
    rawTag = process.env.GITHUB_REF_NAME;
} else {
    // Fallback for manually dispatched workflows or branch pushes that point to a tagged commit.
    const tagResult = run("git", ["tag", "--points-at", "HEAD"], {
        allowFail: true,
        quiet: true,
    });

    const text = tagResult.stdout ? new TextDecoder().decode(tagResult.stdout) : "";
    const tags = text
        .split("\n")
        .map((x) => x.trim())
        .filter(Boolean)
        .filter((x) => /^v?\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(x));

    if (tags.length > 1) {
        throw new Error(`multiple semver tags point at HEAD: ${tags.join(", ")}`);
    }

    rawTag = tags[0] || "";
}

if (!rawTag) {
    console.log("No semver tag found on this push. Skip npm publish.");
    process.exit(0);
}

const version = rawTag.replace(/^v/, "");

if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(version)) {
    throw new Error(`invalid release tag: ${rawTag}. Expected v1.2.3, 1.2.3, v1.2.3-beta.1, etc.`);
}

let npmTag = "latest";
const prerelease = version.match(/^\d+\.\d+\.\d+-([0-9A-Za-z-]+)/)?.[1];

// Never publish prerelease versions under latest.
if (prerelease === "alpha") npmTag = "alpha";
else if (prerelease === "beta") npmTag = "beta";
else if (prerelease === "rc") npmTag = "rc";
else if (prerelease) npmTag = "next";

console.log(`Release tag: ${rawTag}`);
console.log(`Package version: ${version}`);
console.log(`npm dist-tag: ${npmTag}`);
console.log("Publishing only scoped binary packages under @kecare/*");

rmSync(distRoot, { recursive: true, force: true });
ensureDir(distRoot);

// react-devtools-core 是 ink（由 oh-my-logo 传递依赖）的可选 peer 依赖，环境中未安装。
// bun 编译的独立二进制在启动时会预解析所有 external 导入，因此不能像 CLI 构建那样用
// --external 绕过，否则用户机器上会直接报
// "Cannot find package 'react-devtools-core' from 'B:/~BUN/root/kecare'"。
// 这里用构建插件把该包替换成空实现，将（仅开发用的）devtools 分支内联为无操作。
const stubReactDevtoolsCorePlugin = {
    name: "stub-react-devtools-core",
    setup(builder: any) {
        builder.onResolve({ filter: /^react-devtools-core$/ }, () => ({
            path: "react-devtools-core",
            namespace: "stub",
        }));
        builder.onLoad({ filter: /.*/, namespace: "stub" }, () => ({
            contents: "export default { connectToDevTools() {} };",
            loader: "js",
        }));
    },
};

// cfonts 通过运行时动态 require(path.normalize(`../fonts/${font}.json`)) 加载字体，
// bun 编译的独立二进制里没有 node_modules 文件，导致 help 渲染时报
// "Font file for the font 'block' could not be found"。
// 这里用插件替换 GetFont 模块，把全部字体 JSON 静态打进 bundle（总共约 165KB）。
const inlineCfontsFontsPlugin = {
    name: "inline-cfonts-fonts",
    setup(builder: any) {
        builder.onLoad({ filter: /cfonts[\\/]lib[\\/]GetFont\.js$/ }, () => {
            const fontNames = [
                "3d", "block", "chrome", "console", "grid", "huge", "pallet",
                "shade", "simple", "simple3d", "simpleBlock", "slick", "tiny",
            ];

            const lines = ["'use strict';"];

            for (const name of fontNames) {
                const key = name.replace(/[^a-z0-9]/gi, "_");
                lines.push(`const font_${key} = require("../fonts/${name}.json");`);
            }

            lines.push("const GetFont = (font) => {");
            lines.push("  switch (font) {");
            for (const name of fontNames) {
                const key = name.replace(/[^a-z0-9]/gi, "_");
                lines.push(`    case "${name}": return font_${key};`);
            }
            lines.push("    default: return false;");
            lines.push("  }");
            lines.push("};");
            lines.push("module.exports = exports = { GetFont };");

            return { contents: lines.join("\n"), loader: "js" };
        });
    },
};

const platformPackageDirs: string[] = [];

for (const target of targets) {
    const packageName = `@kecare/${target.platform}-${target.arch}`;
    const packageDir = join(distRoot, `${target.platform}-${target.arch}`);
    const isWindows = target.platform === "win32";
    const binName = isWindows ? "kecare.exe" : "kecare";
    const expectedOutput = join(packageDir, binName);

    platformPackageDirs.push(packageDir);
    ensureDir(packageDir);

    console.log(`\nBuilding ${packageName}`);

    const buildResult = await Bun.build({
        entrypoints: [join(cwd, "projects", "generator", "index.ts")],
        compile: true,
        minify: true,
        target: target.bunTarget,
        plugins: [stubReactDevtoolsCorePlugin, inlineCfontsFontsPlugin],
    });

    if (!buildResult.success) {
        for (const log of buildResult.logs) {
            console.error(log);
        }
        throw new Error(`build failed: ${packageName}`);
    }

    // 插件模式下 Bun.build 会忽略 outfile，产物以 generator / generator.exe 命名写到 cwd。
    // 将其移动到平台包目录并统一命名，保证 package.json#bin 指向的文件真实存在。
    let compiledPath = "";
    for (const output of buildResult.outputs) {
        if (output.kind === "entry-point") {
            compiledPath = output.path;
            break;
        }
    }

    if (!compiledPath) {
        throw new Error(`binary artifact not found after build: ${packageName}`);
    }

    renameSync(compiledPath, expectedOutput);

    if (!existsSync(expectedOutput)) {
        throw new Error(`binary not found after build: ${expectedOutput}`);
    }

    writeFileSync(
        join(packageDir, "index.js"),
        [
            "import { dirname, join } from \"node:path\";",
            "import { fileURLToPath } from \"node:url\";",
            "",
            "const dir = dirname(fileURLToPath(import.meta.url));",
            `export const binaryPath = join(dir, ${JSON.stringify(binName)});`,
            "export default binaryPath;",
            "",
        ].join("\n")
    );

    writeJson(join(packageDir, "package.json"), {
        name: packageName,
        version,
        type: "module",
        description: `Kecare binary for ${target.platform}-${target.arch}.`,
        repository,
        exports: {
            ".": "./index.js",
            "./package.json": "./package.json",
        },
        os: [target.platform],
        cpu: [target.arch],
        files: [binName, "index.js"],
        bin: {
            kecare: `${binName}`,
        },
        publishConfig: {
            access: "public",
        },
    } satisfies PackageJson);
}

console.log("\nPackage dry run");

for (const packageDir of platformPackageDirs) {
    run("npm", ["pack", "--dry-run"], { cwd: packageDir });
}

function publishAndVerify(name: string, packageDir: string) {
    if (packageExists(name, version)) {
        console.log(`Skip existing package: ${name}@${version}`);
        return;
    }

    run("npm", ["publish", "--registry", registry, "--tag", npmTag, "--access", "public"], {
        cwd: packageDir,
    });
}

console.log("\nPublishing scoped binary packages");

for (const packageDir of platformPackageDirs) {
    const packageJson = readJson<PackageJson>(join(packageDir, "package.json"));
    publishAndVerify(packageJson.name, packageDir);
}

publishAndVerify("kecare", join(cwd, "packages", "kecare"));
publishAndVerify("create-kecare", join(cwd, "packages", "create-kecare"));


console.log("\nPublish completed: only @kecare/* binary packages were published");
