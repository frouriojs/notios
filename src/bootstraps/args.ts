import { program } from 'commander';
import fs from 'fs';
import path from 'path';
import type { UiOptions } from '../interfaces/ui_options';
import detectNpmClient from '../utils/detect_npm_client';
import { tryWithHint } from '../utils/error';
import { ProcManager } from '../utils/proc_manager';

export interface setupArgsParams {
  procManager: ProcManager;
}
export const setupArgs = ({ procManager }: setupArgsParams): UiOptions => {
  program.option('--manifest <string>', 'package.json path', 'package.json');
  program.name('scui');
  program.argument('[run-script-name]');
  program.allowExcessArguments(false);
  program.version(require('../../package.json').version, '-v, --version');
  program.parse();
  const scriptName = program.args[0];
  const options = program.opts();
  const manifestFullPath = path.resolve(process.cwd(), options.manifest);
  const manifestRelativePath = path.relative(process.cwd(), manifestFullPath);
  const manifestJsonString = tryWithHint(
    () => fs.readFileSync(manifestFullPath).toString(),
    `Failed to read file ${JSON.stringify(manifestFullPath)}.\nPlease check existense of file and access permissions.`,
  );
  const manifestJson = tryWithHint(
    () => JSON.parse(manifestJsonString),
    `Failed to parse file ${JSON.stringify(manifestFullPath)} as json.`,
  );
  const scripts = tryWithHint(
    () =>
      Object.entries((manifestJson as { scripts: Record<string, string> }).scripts).map(([name, command]) => {
        if (typeof command !== 'string') throw new TypeError('command is not string');
        return { name, command };
      }),
    `Manifest json ${JSON.stringify(
      manifestFullPath,
    )} does not have scripts section correctly.\nPlease check the npm documentation for more information: https://docs.npmjs.com/misc/scripts/`,
  );

  tryWithHint(() => {
    if (typeof scriptName === 'string') {
      if (!(scriptName in (manifestJson as any).scripts)) {
        throw new Error('no such script');
      }

      const cwd = process.cwd();
      procManager.createNode({
        name: scriptName,
        type: 'none',
        status: 'running',
        own: {
          cwd,
          command: scriptName,
          npmPath: detectNpmClient({ cwd }),
        },
      });
    }
  }, `Manifest json ${JSON.stringify(manifestFullPath)} does not have such script: ${JSON.stringify(scriptName)}`);

  return {
    manifestFullPath,
    manifestRelativePath,
    scripts,
    npmClient: detectNpmClient({ cwd: process.cwd() }),
  };
};
