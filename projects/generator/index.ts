import consola from 'consola';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { run } from './runner';

const args = process.argv.slice(2);

if (!args[0]) {
  consola.error('Project path not specified');
  process.exit(1);
}

const projectPath = join(cwd(), args[0]);
// run~
await run(projectPath);
