import type { FC } from 'react';
import React from 'react';
import BoxWithSize from './box_with_size';
import Scrollable from './scrollable';

export interface ScrollableCounterProps {
  lines: string[];
  bottom?: number;
  left?: number;
}
const ScrollableCounter: FC<ScrollableCounterProps> = ({ bottom = 0, lines, ...rest }) => {
  return (
    <BoxWithSize height="100%" width="100%">
      {({ height }) => <Scrollable {...rest} lines={lines} top={Math.max(lines.length - height - bottom, 0)} />}
    </BoxWithSize>
  );
};

export default ScrollableCounter;
