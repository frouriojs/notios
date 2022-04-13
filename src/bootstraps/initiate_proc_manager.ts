import type { UiOptions } from '../interfaces/ui_options';
import detectNpmClient from '../utils/detect_npm_client';
import type { ProcManager } from '../utils/proc_manager';
import { createProcManager } from '../utils/proc_manager';

export interface InitiateProcManagerParams {
  uiOptions: UiOptions;
}
const initiateProcManager = ({ uiOptions }: InitiateProcManagerParams): ProcManager => {
  const procManager = createProcManager({
    forceNoColor: uiOptions.forceNoColor,
  });
  uiOptions.initialScriptNames.forEach((scriptName: any) => {
    const cwd = process.cwd();
    procManager.createNode({
      name: scriptName,
      type: 'none',
      status: 'running',
      procOwn: {
        cwd,
        command: scriptName,
        npmPath: detectNpmClient({ cwd }),
      },
    });
  });
  return procManager;
};

export default initiateProcManager;
