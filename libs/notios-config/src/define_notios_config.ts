import { NotiosConfig } from './interfaces/notios-config';

export type ConfigFn = (defaultConfig: NotiosConfig) => NotiosConfig;

const defineNotiosConfig = (configFn: ConfigFn): ConfigFn => {
  return configFn;
};

export default defineNotiosConfig;
