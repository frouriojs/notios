import parseCliArgs from 'npm-run-all/bin/common/parse-cli-args';
import { request } from '../bootstraps/ipc_request';
import { envVarNames } from '../constants/ipc';

if (process.env[envVarNames.rootToken] && process.env[envVarNames.parentToken]) {
  const args = process.argv.slice(2);
  const argv = parseCliArgs(args, { parallel: false }, { singleMode: true });
  request('run-s', args, argv);
} else {
  require('npm-run-all/bin/run-s');
}
