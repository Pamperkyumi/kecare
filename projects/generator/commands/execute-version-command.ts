import { type Params } from './__ROOT__.ts';
import consola from 'consola';
import packageJson from '../package.json' with { type: 'json' };

export async function executeVersionCommand(params: Params) {
    consola.info(packageJson.version);
}