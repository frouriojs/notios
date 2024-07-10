import parseCliArgs from 'npm-run-all/bin/common/parse-cli-args.js';
import { envVarNames } from '../constants/ipc.js';
import { request } from './ipc_request.js';

export interface HijackNpmRunAllParams {
  name: string;
  initial?: any;
  options?: any;
}

const hijackNpmRunAll = async ({ name, initial, options }: HijackNpmRunAllParams) => {
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
      await import(`@notios/npm-run-all/bin/${name}/index.js`);
    } else {
      await import(`npm-run-all/bin/${name}/index.js`);
    }
  }
};

export default hijackNpmRunAll;
