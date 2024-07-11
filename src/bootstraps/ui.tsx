import { Instance, render } from 'ink';
import React from 'react';
import { NotiosConfig } from '../../libs/notios-config/src/interfaces/notios-config';
import App from '../components/app';
import type { UiOptions } from '../interfaces/ui_options';
import type { ProcManager } from '../utils/proc_manager';
import { exitNotios } from './terminal';

export interface SetupUiParams {
  procManager: ProcManager;
  uiOptions: UiOptions;
  notiosConfig: NotiosConfig;
}
export const setupUi = ({ uiOptions, procManager, notiosConfig }: SetupUiParams) => {
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
