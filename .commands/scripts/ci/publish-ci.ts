import { join } from 'node:path';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const cwd = process.cwd();
const mainPackage = 'kecare';
// const childPackages = ['create-kecare'];

type PkgJson = {
    name: string;
    version: string;
    dependencies?: Record<string, string>;
    repository?: any;
    license?: string;
    homepage?: string;
};

function readJson<T>(path: string): T {
    return JSON.parse(readFileSync(path, 'utf-8')) as T;
}

function writeJson(path: string, data: any) {
    writeFileSync(path, JSON.stringify(data, null, 2));
}

function getRepoVersion(): string {
    const pj = readJson<{ version: string }>(join(cwd, 'packages', mainPackage, 'package.json'));
    return pj.version;
}

function getNpmTag(version: string): '' | 'rc' | 'beta' | 'alpha' {
    if (version.includes('-rc.')) return 'rc';
    if (version.includes('-beta.')) return 'beta';
    if (version.includes('-alpha.')) return 'alpha';
    return '';
}

function npmCmd(): string {
    return process.platform === 'win32' ? 'npm.cmd' : 'npm';
}

function run(cmd: string, args: string[], opts?: { cwd?: string; env?: Record<string, string> }) {
    const run = Bun.spawnSync({
        cmd: [cmd, ...args],
        cwd: opts?.cwd ?? cwd,
        env: { ...process.env, ...opts?.env },
        stdout: 'inherit',
        stderr: 'inherit',
    });
    if (run.exitCode !== 0) throw new Error(`command faile: ${cmd} ${args.join('')}`);
}

function npmPublish(dir: string, npmTag: string) {
    const args = ['publish', '--access', 'public'];
    if (npmTag) args.push('--tag', npmTag);
    run(npmCmd(), args, { cwd: dir });
}

function ensureDir(path: string) {
    if (!existsSync(path)) mkdirSync(path, { recursive: true });
}
// function copyLicenseTo(dir: string) {
//   const licensePath = join(cwd, 'LICENSE');
//   if (!existsSync(licensePath)) return;
//   writeFileSync(join(dir, 'LICENSE'), readFileSync(licensePath, 'utf-8'));
// }

function canonicalRepository() {
    const gh = process.env.GITHUB_REPOSITORY;
    const url = gh ? `https://github.com/${gh}` : 'https://github.com/Pamperkyumi/kecare';
    return { type: 'git', url };
}

function npmViewExists(pkgName: string, version: string): boolean {
    const r = Bun.spawnSync({
        cmd: [npmCmd(), 'view', `${pkgName}@${version}`, '--json'],
        cwd,
        env: { ...process.env },
        stdout: 'ignore',
        stderr: 'ignore',
    });
    return r.exitCode === 0;
}

function publishDirectPackages(version: string, npmTag: string) {
    const direct = ['create-kecare', 'kecare'];

    for (const pkg of direct) {
        const pkgDir = join(cwd, 'packages', pkg);
        const pjPath = join(pkgDir, 'package.json');
        const pj = readJson<PkgJson>(join(pkgDir, 'package.json'));

        if (npmViewExists(pj.name, version)) {
            console.log(`${pj.name}@${version} already exists, skipping publish`);
            continue;
        }
        console.log(`Publishing ${pj.name}@${version} (direct root)...`);
        pj.repository = canonicalRepository();
        writeJson(pjPath, pj);
        npmPublish(pkgDir, npmTag);
    }
}

function publishKecareBinaries(version: string, npmTag: string) {
    const repo = canonicalRepository();
    const kecareDistRoot = join(cwd, 'dist');
    ensureDir(kecareDistRoot);

    const targets = [
        { platform: 'darwin', arch: 'arm64', target: 'bun-darwin-arm64' },
        { platform: 'darwin', arch: 'x64', target: 'bun-darwin-x64' },
        { platform: 'linux', arch: 'arm64', target: 'bun-linux-arm64' },
        { platform: 'linux', arch: 'x64', target: 'bun-linux-x64' },
        { platform: 'win32', arch: 'x64', target: 'bun-windows-x64' },
    ];

    for (const t of targets) {
        const pkgName = `kecare-${t.platform}-${t.arch}`;

        if (npmViewExists(pkgName, version)) {
            console.log(`${pkgName}@${version} already exists, skipping publish`);
            continue;
        }

        const outDir = join(kecareDistRoot, `kecare-${t.platform}-${t.arch}`);
        rmSync(outDir, { recursive: true, force: true });
        ensureDir(outDir);

        console.log(`Building binary ${pkgName}@${version}...`);
        run(process.execPath, ['build', join(cwd, 'projects', 'generator', 'index.ts'), '--outfile', join(outDir, 'kecare'), '--compile', '--minify', '--sourcemap=inline', '--env=KECARE_*', '--target', t.target, '--external', 'vue', '--external', 'react'], {
            env: { KECARE_PRODUCTION: 'true' },
        });

        writeFileSync(join(outDir, 'index.js'), `console.log("This package is used to distribute cookbook binaries. You can run it directly.");`);

        const binTarget = t.platform === 'win32' ? 'kecare.exe' : 'kecare';

        writeJson(join(outDir, 'package.json'), {
            name: pkgName,
            type: 'module',
            version,
            exports: './index.js',
            os: [t.platform],
            cpu: [t.arch],
            files: ['index.js', binTarget],
            bin: { kecare: binTarget },
            repository: repo,
        });

        const raw = readFileSync(join(outDir, 'package.json'), 'utf-8');
        if (!raw.trim()) throw new Error(`binary package.json is empty: ${join(outDir, 'package.json')}`);
        JSON.parse(raw);

        console.log(`Publishing package.json is empty ${join(outDir, 'package.json')}`);
        npmPublish(outDir, npmTag);
    }
}

async function main() {
    const version = process.env.VERSION || getRepoVersion();
    const npmTag = process.env.NPM_TAG ?? getNpmTag(version);

    publishKecareBinaries(version, npmTag);

    publishDirectPackages(version, npmTag);

    console.log(`[publish-ci] done`);
}

main().catch((e) => {
    console.error(0);
    process.exit(1);
});
