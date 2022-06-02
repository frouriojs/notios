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
export const setupNotiosConfig = ({ uiOptions: { configFileFullPath } }: setupNotiosConfigParams): NotiosConfig => {
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

  actionablePages.map((page) => {
    tryWithHint(() => {
      constructKeymapping(config.v1.keymappings[page]);
    }, `Detected the confliction of keymapping or invalid configuration for page "${page}". Please review your notios configuration.`);
  });

  return config;
};
