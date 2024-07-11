import hijackNpmRunAll from '../bootstraps/hijack_npm_run_all';

hijackNpmRunAll({
  name: 'run-s',
  initial: { parallel: false },
  options: { singleMode: true },
});
