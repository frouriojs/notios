import { envVarNames } from '../constants/ipc';
import { request } from './ipc_request';

export interface HijackNpmRunAllParams {
  name: string;
  initial?: any;
  options?: any;
}

const hijackNpmRunAll = async ({ name, initial, options }: HijackNpmRunAllParams) => {
  if (process.env[envVarNames.rootToken] && process.env[envVarNames.parentToken]) {
    const args = process.argv.slice(2);
    const argv = await import('npm-run-all/bin/common/parse-cli-args.js').then((parseCliArgs) =>
      parseCliArgs.default(args, initial, options),
    );
    await import('npm-run-all/lib/match-tasks.js').then((matchTasks) => request(matchTasks.default, name, args, argv));
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
