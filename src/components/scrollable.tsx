import { Box, Text } from 'ink';
import type { FC } from 'react';
import React, { useCallback } from 'react';
import stringLength from 'string-length';
import wcslice from 'wcslice';
import wcwidth from 'wcwidth';
import { LogLinesReadonly } from '../utils/proc_manager';
import BoxWithSize from './box_with_size';

interface Line {
  abs: number;
  left: string;
  text: string;
  right: string;
}

export interface ScrollableProps {
  lines: LogLinesReadonly;
  top?: number;
  left?: number;
}
const Scrollable: FC<ScrollableProps> = ({ lines, top = 0, left = 0 }) => {
  const trimmedLines = useCallback(
    ({ height, width }: { height: number; width: number }) => {
      const shownLines: Line[] = [];
      for (let i = Math.max(top, 0); i < top + height && i < lines.length; i += 1) {
        const line = lines[i];
        const wcstart = left;
        const wcend = left + width - 2.5;
        // TODO
        const text = wcslice(line, wcstart, wcend);
        shownLines.push({
          abs: top + i,
          left: wcstart > 0 ? '~' : '',
          text,
          right: text !== wcslice(line, wcstart) ? '~' : '',
        });
      }
      return shownLines;
    },
    [lines, top, left],
  );
  return (
    <BoxWithSize height="100%" width="100%" flexDirection="column">
      {({ width, height }) =>
        trimmedLines({ width, height }).map(({ text, left, right, abs }) => (
          <Box key={abs}>
            <Text color="gray" italic>
              {left}
            </Text>
            <Box width={wcwidth(text) - (text.length - stringLength(text))}>
              <Text wrap="end">{text}</Text>
            </Box>
            <Text color="gray" italic>
              {right}
            </Text>
          </Box>
        ))
      }
    </BoxWithSize>
  );
};

export default Scrollable;
