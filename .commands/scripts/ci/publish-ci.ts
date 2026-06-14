import { join } from "node:path";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const cwd = process.cwd();
const mainPackage = "kecare";

type PkgJson = {
    name: string;
    version: string;
    repository?: any;
};

function readJson<T>(path: string): T {
    return JSON.parse(readFileSync(path, "utf-8")) as T;
}

function writeJson(path: string, data: any) {
    writeFileSync(path, JSON.stringify(data, null, 2));
}

function getRepoVersion(): string {
    const pj = readJson<{ version: string }>(
        join(cwd, "packages", mainPackage, "package.json")
    );
    return pj.version;
}

function getNpmTag(version: string): "" | "rc" | "beta" | "alpha" {
    if (version.includes("-rc.")) return "rc";
    if (version.includes("-beta.")) return "beta";
    if (version.includes("-alpha.")) return "alpha";
    return "";
}

function run(cmd: string, args: string[], opts?: { cwd?: string }) {
    const res = Bun.spawnSync({
        cmd: [cmd, ...args],
        cwd: opts?.cwd ?? cwd,
        stdout: "inherit",
        stderr: "inherit",
    });

    if (res.exitCode !== 0) {
        throw new Error(`command failed: ${cmd} ${args.join(" ")}`);
    }
}

function ensureDir(path: string) {
    if (!existsSync(path)) mkdirSync(path, { recursive: true });
}

function canonicalRepository() {
    const gh = process.env.GITHUB_REPOSITORY;
    return {
        type: "git",
        url: gh
            ? `https://github.com/${gh}`
            : "https://github.com/Pamperkyumi/kecare",
    };
}

/**
 * 🚀 ONLY BUILD BINARIES (NO NPM PUBLISH ANYMORE)
 */
function buildKecareBinaries(version: string) {
    const repo = canonicalRepository();

    const distRoot = join(cwd, "dist");
    rmSync(distRoot, { recursive: true, force: true });
    ensureDir(distRoot);

    const targets = [
        { platform: "darwin", arch: "arm64", target: "bun-darwin-arm64" },
        { platform: "darwin", arch: "x64", target: "bun-darwin-x64" },
        { platform: "linux", arch: "arm64", target: "bun-linux-arm64" },
        { platform: "linux", arch: "x64", target: "bun-linux-x64" },
        { platform: "win32", arch: "x64", target: "bun-windows-x64" },
    ];

    const artifacts: string[] = [];

    for (const t of targets) {
        const outDir = join(distRoot, `kecare-${t.platform}-${t.arch}`);
        ensureDir(outDir);

        console.log(`🔨 Building ${t.platform}-${t.arch}`);

        run(process.execPath, [
            "build",
            join(cwd, "projects/generator/index.ts"),
            "--outfile",
            join(outDir, "kecare"),
            "--compile",
            "--minify",
            "--target",
            t.target,
        ]);

        const binName = t.platform === "win32" ? "kecare.exe" : "kecare";

        // metadata file (for GitHub release context)
        writeJson(join(outDir, "package.json"), {
            name: `kecare-${t.platform}-${t.arch}`,
            version,
            repository: repo,
            os: [t.platform],
            cpu: [t.arch],
            bin: binName,
        });

        artifacts.push(outDir);
    }

    return artifacts;
}

function publishCLI() {
    console.log("📦 CLI publish should be handled separately via npm:");
    console.log("👉 packages/kecare (ONLY @kecare/cli)");
}

/**
 * ENTRY
 */
async function main() {
    const version = process.env.VERSION || getRepoVersion();
    const npmTag = getNpmTag(version);

    console.log(`🚀 Kecare build start: ${version} (${npmTag})`);

    // 1. build binaries ONLY
    const artifacts = buildKecareBinaries(version);

    // 2. print for GitHub Actions release step
    console.log("\n📦 Artifacts ready for GitHub Release:");
    for (const a of artifacts) {
        console.log(" -", a);
    }

    // 3. remind CLI publish (separate system)
    publishCLI();

    console.log("\n✅ build completed (NO npm binary publish)");
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});