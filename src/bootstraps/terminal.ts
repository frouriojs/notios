import { envVarNames } from '../constants/ipc';
import { waitKillDone } from '../utils/cross_kill';

export const setupTerminal = () => {
  if (process.platform !== 'win32' && process.env[envVarNames.doNotAlternate] !== '1') {
    // Switching into alternate screen.
    process.stdout.write('\u001B[?1049h');
  }
};
export const exitNotios = () => {
  if (process.platform !== 'win32' && process.env[envVarNames.doNotAlternate] !== '1') {
    const drained = process.stdout.write('\u001B[?1049l');
    if (!drained) {
      process.stdout.once('drain', () => {
        waitKillDone().then(() => {
          process.exit(0);
        });
      });
      return;
    }
  }
  waitKillDone().then(() => {
    process.exit(0);
  });
};
