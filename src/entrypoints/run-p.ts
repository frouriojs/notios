import hijackNpmRunAll from '../bootstraps/hijack_npm_run_all.js';

hijackNpmRunAll({
  name: 'run-p',
  initial: { parallel: true },
  options: { singleMode: true },
});
