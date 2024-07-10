import { Instance, render } from 'ink';
import React from 'react';
import { NotiosConfig } from '../../libs/notios-config/src/interfaces/notios-config.js';
import App from '../components/app.js';
import type { UiOptions } from '../interfaces/ui_options.js';
import type { ProcManager } from '../utils/proc_manager.js';
import { exitNotios } from './terminal.js';

export interface SetupUiParams {
  procManager: ProcManager;
  uiOptions: UiOptions;
  notiosConfig: NotiosConfig;
}
export const setupUi = ({ uiOptions, procManager, notiosConfig }: SetupUiParams) => {
  // eslint-disable-next-line prefer-const
  let rendered: Instance | undefined = undefined;
  const onExit = () => {
    if (!rendered) return;
    rendered.unmount();
    procManager.killAllNode(procManager.rootNode);
    exitNotios();
  };
  rendered = render(
    <App uiOptions={uiOptions} procManager={procManager} notiosConfig={notiosConfig.v1} onExit={onExit} />,
    {
      // Handle exit manually.
      exitOnCtrlC: false,
    },
  );
};
