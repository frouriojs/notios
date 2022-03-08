import parseCliArgs from 'npm-run-all/bin/common/parse-cli-args';
import { envVarNames } from '../constants/ipc';
import { request } from './ipc_request';

export interface HijackNpmRunAllParams {
  name: string;
  initial?: any;
  options?: any;
}
/* eslint-disable import/no-dynamic-require */
const hijackNpmRunAll = ({ name, initial, options }: HijackNpmRunAllParams) => {
  if (process.env[envVarNames.rootToken] && process.env[envVarNames.parentToken]) {
    const args = process.argv.slice(2);
    const argv = parseCliArgs(args, initial, options);
    request(name, args, argv);
  } else {
    const npmRunAllFound = (() => {
      try {
        require.resolve('@notios/npm-run-all');
        return true;
      } catch {
        return false;
      }
    })();
    if (npmRunAllFound) {
      require(`@notios/npm-run-all/bin/${name}`);
    } else {
      require(`npm-run-all/bin/${name}`);
    }
  }
};
/* eslint-enable import/no-dynamic-require */

export default hijackNpmRunAll;
