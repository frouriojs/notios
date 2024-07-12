import fs from 'fs';
import { actionablePages } from '../../libs/notios-config/src/action_definitions';
import { ConfigFn } from '../../libs/notios-config/src/define_notios_config';
import { NotiosConfig } from '../../libs/notios-config/src/interfaces/notios-config';
import defaultConfig from '../constants/default_config';
import { UiOptions } from '../interfaces/ui_options';
import { tryWithHint } from '../utils/error';
import { constructKeymapping } from '../utils/keymapping';

export interface setupNotiosConfigParams {
  uiOptions: UiOptions;
}
export const setupNotiosConfig = ({
  uiOptions: { configFileFullPath },
}: setupNotiosConfigParams): NotiosConfig => {
  const configFileContent = (() => {
    try {
      return fs.readFileSync(configFileFullPath);
    } catch {
      return null;
    }
  })();
  const config: NotiosConfig = (() => {
    if (configFileContent === null) {
      return defaultConfig;
    } else {
      const fn: ConfigFn = require(configFileFullPath);
      return fn(defaultConfig);
    }
  })();

  actionablePages
    .filter((page) => page !== 'common')
    .map((page) => {
      tryWithHint(
        () => {
          constructKeymapping({ ...config.v1.keymappings.common, ...config.v1.keymappings[page] });
        },
        [
          `Detected the confliction of keymapping or invalid configuration for page "${page}"(including "common" keymapping).`,
          `See error message for more details.`,
          `Review your notios configuration.`,
        ].join(' '),
      );
    });

  if (config.v1.keymappings.common.exit.length < 1) {
    tryWithHint(() => {
      throw new Error(`no keymapping for exit`);
    }, 'Keymapping for common.exit is necessary because you would be unable to exit notios.');
  }

  return config;
};
