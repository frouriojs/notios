import { program } from 'commander';
import fs from 'fs';
import path from 'path';
import type { UiOptions } from '../interfaces/ui_options';
import detectNpmClient from '../utils/detect_npm_client';
import { tryWithHint } from '../utils/error';

export const setupArgs = (): UiOptions => {
  program.option('--manifest <string>', 'package.json path', 'package.json');
  program.parse();
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
  return {
    manifestFullPath,
    manifestRelativePath,
    scripts,
    npmClient: detectNpmClient({ cwd: process.cwd() }),
  };
};
