import fs from 'fs';
import nodeIpc from 'node-ipc';
import path from 'path';
import { envVarNames, IPC_CONFIG_NAME } from '../constants/ipc';
import type { IpcRequest, RunGroup } from '../interfaces/ipc_request';
import detectNpmClient from '../utils/detect_npm_client';
import { tryWithHint } from '../utils/error';

export const request = (matchTasks: any, cliName: string, args: string[], argv: any): void => {
  const manifestFullPath = path.resolve(process.cwd(), 'package.json');
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
  const runGroups: RunGroup[] = argv.groups.flatMap((group: any) => {
    return {
      parallel: group.parallel,
      patterns: group.patterns,
      runTasks: matchTasks(
        scripts.map((script) => script.name),
        group.patterns,
      ).map((name: string) => {
        return {
          name,
          command: (manifestJson as any).scripts[name],
        };
      }),
    };
  });
  const cwd = process.cwd();
  const request: IpcRequest = {
    cliName,
    args,
    cwd,
    parentToken: process.env[envVarNames.parentToken]!,
    npmPath: argv.npmPath,
    npmClient: detectNpmClient({ cwd }),
    runGroups,
  };
  const id = `${IPC_CONFIG_NAME}-${process.env[envVarNames.rootToken]}`;
  nodeIpc.config.logger = () => {};
  nodeIpc.connectTo(id, () => {
    const client = nodeIpc.of[id];
    client.on('connect', () => {
      client.emit(process.env[envVarNames.rootToken]!, request);
    });
    client.on('exit', (exitCode: number | null) => {
      process.exit(exitCode ?? undefined);
    });
  });
};
