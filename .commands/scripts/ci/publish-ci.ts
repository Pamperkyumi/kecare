import { join } from "node:path";
import {
    existsSync,
    mkdirSync,
    readFileSync,
    rmSync,
    writeFileSync,
    renameSync,
} from "node:fs";

const cwd = process.cwd();
const mainPackageDir = join(cwd, "packages", "kecare");
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
    files?: string[];
    bin?: Record<string, string> | string;
    exports?: any;
    os?: string[];
    cpu?: string[];
    optionalDependencies?: Record<string, string>;
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

function npmPublishArgs(pkg: PackageJson, npmTag: string): string[] {
    const args = ["publish", "--registry", registry, "--tag", npmTag];

    // Scoped packages are restricted/private by default, so the first public publish must set access explicitly.
    if (pkg.name.startsWith("@")) {
        args.push("--access", "public");
    }

    return args;
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
    // For normal branch pushes, read tags that point at HEAD.
    // This supports the workflow where you run `git push && git push --tags` or `git push --follow-tags`.
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

// Do not publish prerelease versions under latest.
if (prerelease === "alpha") npmTag = "alpha";
else if (prerelease === "beta") npmTag = "beta";
else if (prerelease === "rc") npmTag = "rc";
else if (prerelease) npmTag = "next";

console.log(`Release tag: ${rawTag}`);
console.log(`Package version: ${version}`);
console.log(`npm dist-tag: ${npmTag}`);

rmSync(distRoot, { recursive: true, force: true });
ensureDir(distRoot);

const platformPackageNames: string[] = [];
const platformPackageDirs: string[] = [];

for (const target of targets) {
    const packageName = `@kecare/${target.platform}-${target.arch}`;
    const packageDir = join(distRoot, `${target.platform}-${target.arch}`);
    const isWindows = target.platform === "win32";
    const binName = isWindows ? "kecare.exe" : "kecare";
    const compiledOutput = join(packageDir, "kecare");
    const expectedOutput = join(packageDir, binName);

    platformPackageNames.push(packageName);
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

    // Bun may create either `kecare` or `kecare.exe` depending on target behavior.
    // Normalize the filename so package.json#bin always points to a real file.
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

console.log("\nPreparing main package");

const mainPackageJsonPath = join(mainPackageDir, "package.json");
const mainPackageJson = readJson<PackageJson>(mainPackageJsonPath);

mainPackageJson.version = version;
mainPackageJson.repository = repository;
mainPackageJson.optionalDependencies = mainPackageJson.optionalDependencies || {};

// Remove old binary package names to avoid installing both old and new naming schemes.
for (const target of targets) {
    delete mainPackageJson.optionalDependencies[`kecare-${target.platform}-${target.arch}`];
    delete mainPackageJson.optionalDependencies[`@kecare/kecare-${target.platform}-${target.arch}`];
    mainPackageJson.optionalDependencies[`@kecare/${target.platform}-${target.arch}`] = version;
}

if (mainPackageJson.name.startsWith("@")) {
    mainPackageJson.publishConfig = {
        ...(mainPackageJson.publishConfig || {}),
        access: "public",
    };
}

writeJson(mainPackageJsonPath, mainPackageJson);

console.log("\nPackage dry run");

for (const packageDir of platformPackageDirs) {
    run("npm", ["pack", "--dry-run"], { cwd: packageDir });
}
run("npm", ["pack", "--dry-run"], { cwd: mainPackageDir });

console.log("\nPublishing platform packages first");

for (const packageDir of platformPackageDirs) {
    const packageJson = readJson<PackageJson>(join(packageDir, "package.json"));

    if (packageExists(packageJson.name, version)) {
        console.log(`Skip existing package: ${packageJson.name}@${version}`);
        continue;
    }

    run("npm", npmPublishArgs(packageJson, npmTag), { cwd: packageDir });
}

console.log("\nPublishing main package");

const preparedMainPackageJson = readJson<PackageJson>(mainPackageJsonPath);

if (packageExists(preparedMainPackageJson.name, version)) {
    console.log(`Skip existing package: ${preparedMainPackageJson.name}@${version}`);
} else {
    run("npm", npmPublishArgs(preparedMainPackageJson, npmTag), { cwd: mainPackageDir });
}

console.log("\nPublish completed");
