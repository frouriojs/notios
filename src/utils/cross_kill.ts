import spawn from 'cross-spawn';
import pidtree from 'pidtree';

const crossKill = (pid: number | undefined) => {
  if (typeof pid !== 'number') return;
  if (process.platform === 'win32') {
    spawn('taskkill', ['/F', '/T', '/PID', pid.toString()], {
      stdio: 'ignore',
    });
  } else {
    // try {
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
    });
    // } catch {}
  }
};

export default crossKill;
