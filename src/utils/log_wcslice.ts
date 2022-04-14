import wcwidth from 'wcwidth';
import { LogContentReadonly } from '../utils/proc_manager';

const logWcslice = (content: LogContentReadonly, start?: number | undefined, end?: number | undefined) => {
  const wclen = (to: number) => {
    const bytes = [];
    for (let i = 0; i < to; i += 1) {
      const char = content[i];
      switch (char.type) {
        case 'print':
          bytes.push(char.byte);
          break;
        default:
          break;
      }
    }
    const str = Buffer.from(bytes).toString('utf-8');
    // TODO: dirty hack
    let t = str.length;
    while (t > 0 && str[t - 1] === '�') t -= 1;
    return wcwidth(str.slice(0, t));
  };
  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = wclen(content.length) + 1;
  }
  if (end < 0) end = 0;
  let sliceStart = (() => {
    let lo = -1;
    let hi = content.length;
    while (lo + 1 < hi) {
      const mi = (lo + hi + 1) >> 1;
      if (wclen(mi) >= start) hi = mi;
      else lo = mi;
    }
    return hi;
  })();
  const sliceEnd = (() => {
    let lo = -1;
    let hi = content.length;
    while (lo + 1 < hi) {
      const mi = (lo + hi + 1) >> 1;
      if (wclen(mi) >= end) hi = mi;
      else lo = mi;
    }
    if (wclen(hi) > end) return hi - 1;
    return hi;
  })();
  const [firstStyleIndex, firstStyleBytes] = (() => {
    for (let i = Math.min(sliceStart, content.length - 1); i >= 0; i -= 1) {
      const c = content[i];
      if (c.type === 'style') {
        return [i, [...c.bytes]];
      }
    }
    return [-1, []];
  })();
  if (firstStyleIndex === sliceStart) sliceStart += 1;
  const bytes = content.slice(sliceStart, sliceEnd).flatMap((c) => {
    switch (c.type) {
      case 'style':
        return [...c.bytes];
      default:
        return [c.byte];
    }
  });
  if (firstStyleIndex === -1) {
    return Buffer.from(bytes).toString('utf-8');
  } else {
    return Buffer.from([...firstStyleBytes, ...bytes]).toString('utf-8');
  }
};

export default logWcslice;
