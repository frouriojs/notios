import type { NpmClient } from './ui_options';

export interface RunTask {
  name: string;
  command: string;
}

export interface RunGroup {
  parallel: boolean;
  patterns: string[];
  runTasks: RunTask[];
}

export interface IpcRequest {
  cliName: string;
  args: string[];
  cwd: string;
  parentToken: string;
  npmPath: string | null;
  npmClient: NpmClient;
  runGroups: RunGroup[];
}
