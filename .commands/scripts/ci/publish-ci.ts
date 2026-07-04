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

const platformPackageDirs: string[] = [];

for (const target of targets) {
    const packageName = `@kecare/${target.platform}-${target.arch}`;
    const packageDir = join(distRoot, `${target.platform}-${target.arch}`);
    const isWindows = target.platform === "win32";
    const binName = isWindows ? "kecare.exe" : "kecare";
    const compiledOutput = join(packageDir, "kecare");
    const expectedOutput = join(packageDir, binName);

    platformPackageDirs.push(packageDir);
    ensureDir(packageDir);

    console.log(`\nBuilding ${packageName}`);

    run(process.execPath, [
        "build",
        join(cwd, "projects", "generator", "index.ts"),
        "--outfile",
        compiledOutput,
        "--compile",
        "--minify",
        "--target",
        target.bunTarget,
    ]);

    // Bun may create either `kecare` or `kecare.exe` depending on the target.
    // Normalize the filename so package.json#bin always points to an existing file.
    if (isWindows && existsSync(compiledOutput) && !existsSync(expectedOutput)) {
        renameSync(compiledOutput, expectedOutput);
    }

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
            kecare: `./${binName}`,
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

console.log("\nPublishing scoped binary packages");

for (const packageDir of platformPackageDirs) {
    const packageJson = readJson<PackageJson>(join(packageDir, "package.json"));

    if (packageExists(packageJson.name, version)) {
        console.log(`Skip existing package: ${packageJson.name}@${version}`);
        continue;
    }

    // All packages generated by this script are scoped packages, so publish them as public packages.
    run("npm", ["publish", "--registry", registry, "--tag", npmTag, "--access", "public"], {
        cwd: packageDir,
    });
}

console.log("\nPublish completed: only @kecare/* binary packages were published");
