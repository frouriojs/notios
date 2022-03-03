import type { ScriptDefinition } from './script_definition';

export type NpmClient = 'npm' | 'yarn' | 'pnpm';

export interface UiOptions {
  manifestRelativePath: string;
  manifestFullPath: string;
  scripts: ScriptDefinition[];
  npmClient: NpmClient;
}
