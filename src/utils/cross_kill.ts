import spawn from 'cross-spawn';
import pidtree from 'pidtree';

// TODO: dirty? (but reasonable)
let dirtyKillWaitCount = 0;

export const waitKillDone = () => {
  return new Promise<void>((resolve) => {
    if (dirtyKillWaitCount <= 0) {
      resolve();
      return;
    }
    const interval = setInterval(() => {
      if (dirtyKillWaitCount <= 0) {
        clearInterval(interval);
        resolve();
        return;
      }
    }, 0);
  });
};

const crossKill = (pid: number | undefined) => {
  if (typeof pid !== 'number') return;
  if (process.platform === 'win32') {
    spawn('taskkill', ['/F', '/T', '/PID', pid.toString()], {
      stdio: 'ignore',
    });
  } else {
    try {
      dirtyKillWaitCount += 1;
      pidtree(pid, (err, ps) => {
        try {
          process.kill(pid);
        } catch {}
        if (err) return;
        for (const p of ps) {
          try {
            process.kill(p);
          } catch {}
        }
        dirtyKillWaitCount -= 1;
      });
    } catch {
      dirtyKillWaitCount -= 1;
    }
  }
};

export default crossKill;
