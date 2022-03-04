import fs from 'fs';
import path from 'path';
import type { NpmClient } from '../interfaces/ui_options';

export const executable = (name: string) => {
  try {
    fs.accessSync(name, fs.constants.X_OK);
    return true;
  } catch {
    return false;
  }
};

export interface DetectNpmClientParams {
  cwd: string;
}
const detectNpmClient = ({ cwd }: DetectNpmClientParams): NpmClient => {
  if (fs.existsSync(path.resolve(cwd, 'package-lock.json'))) {
    return 'npm';
  }
  if (executable('yarn') && fs.existsSync(path.resolve(cwd, 'yarn.lock'))) {
    return 'yarn';
  }
  if (executable('pnpm') && fs.existsSync(path.resolve(cwd, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }
  return 'npm';
};

export default detectNpmClient;
