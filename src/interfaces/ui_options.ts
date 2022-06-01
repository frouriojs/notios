import type { ScriptDefinition } from './script_definition';

export type NpmClient = 'npm' | 'yarn' | 'pnpm';

export interface UiOptions {
  forceNoColor: boolean;
  manifestRelativePath: string;
  manifestFullPath: string;
  initialScriptNames: string[];
  scripts: ScriptDefinition[];
  npmClient: NpmClient;
  configFileFullPath: string;
}
