import type { FC } from 'react';
import React from 'react';
import { LogLinesReadonly } from '../utils/proc_manager';
import BoxWithSize from './box_with_size';
import LogScrollable from './log_scrollable';

export interface LogScrollableCounterProps {
  lines: LogLinesReadonly;
  showTimestamp?: boolean;
  showTitle?: boolean;
  bottom?: number;
  left?: number;
}
const LogScrollableCounter: FC<LogScrollableCounterProps> = ({ bottom = 0, lines, ...rest }) => {
  return (
    <BoxWithSize height="100%" width="100%">
      {({ height }) => <LogScrollable {...rest} lines={lines} top={Math.max(lines.length - height - bottom, 0)} />}
    </BoxWithSize>
  );
};

export default LogScrollableCounter;
