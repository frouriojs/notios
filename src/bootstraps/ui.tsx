import { render } from 'ink';
import React from 'react';
import { NotiosConfig } from '../../libs/notios-config/src/interfaces/notios-config';
import App from '../components/app';
import { envVarNames } from '../constants/ipc';
import type { UiOptions } from '../interfaces/ui_options';
import type { ProcManager } from '../utils/proc_manager';

export interface SetupUiParams {
  procManager: ProcManager;
  uiOptions: UiOptions;
  notiosConfig: NotiosConfig;
}
export const setupUi = ({ uiOptions, procManager, notiosConfig }: SetupUiParams) => {
  // Switching into alternate screen.
  if (process.platform !== 'win32' && process.env[envVarNames.doNotAlternate] !== '1') {
    process.stdin.write('\u001B[?1049h');

    process.on('beforeExit', () => {
      process.stdin.write('\u001B[?1049l');
    });
  }

  render(<App uiOptions={uiOptions} procManager={procManager} notiosConfig={notiosConfig} />);
};
