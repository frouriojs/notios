import { program } from 'commander';
import fs from 'fs';
import path from 'path';
import type { UiOptions } from '../interfaces/ui_options';
import detectNpmClient from '../utils/detect_npm_client';
import { tryWithHint } from '../utils/error';

export const setupArgs = (): UiOptions => {
  program.option('--manifest <string>', 'package.json path', 'package.json');
  program.option('--no-color', 'force to suppress coloring');
  program.name('notios');
  program.argument('[run-script-name...]');
  program.version(require('../../package.json').version, '-v, --version');
  program.parse();
  const initialScriptNames = program.args;
  const options = program.opts();
  const forceNoColor: boolean = options['no-color'];
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

  initialScriptNames.forEach((scriptName) => {
    tryWithHint(() => {
      if (!(scriptName in (manifestJson as any).scripts)) {
        throw new Error('no such script');
      }
    }, `Manifest json ${JSON.stringify(manifestFullPath)} does not have such script: ${JSON.stringify(scriptName)}`);
  });

  return {
    forceNoColor,
    manifestFullPath,
    manifestRelativePath,
    initialScriptNames,
    scripts,
    npmClient: detectNpmClient({ cwd: process.cwd() }),
  };
};
