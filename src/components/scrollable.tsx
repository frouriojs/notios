import { Box, Text } from 'ink';
import type { FC } from 'react';
import React, { useCallback } from 'react';
import stringLength from 'string-length';
import wcwidth from 'wcwidth';
import logWcslice from '../utils/log_wcslice';
import { LogLinesReadonly } from '../utils/proc_manager';
import BoxWithSize from './box_with_size';

const formatDate = (d: Date) => {
  return `${d.getFullYear()}/${`0${d.getMonth()}`.slice(-2)}/${`0${d.getDate()}`.slice(-2)} ${`0${d.getHours()}`.slice(
    -2,
  )}:${`0${d.getMinutes()}`.slice(-2)}:${`0${d.getSeconds()}`.slice(-2)}`;
};

const colorOfStr = (s: string) => {
  if (s === '<out>') return 'cyan';
  if (s === '<err>') return 'red';
  const cs = [
    'green',
    'blue',
    'yellow',
    'grey',
    'magenta',
    'redBright',
    'greenBright',
    'blueBright',
    'cyanBright',
    'yellowBright',
    'greyBright',
    'magentaBright',
  ];
  let sum = 0;
  for (const c of s) sum = (sum + c.charCodeAt(0)) % cs.length;
  return cs[sum];
};

interface Line {
  ts: string;
  title: string;
  abs: number;
  left: string;
  text: string;
  right: string;
}

export interface ScrollableProps {
  lines: LogLinesReadonly;
  showTimestamp?: boolean;
  showTitle?: boolean;
  top?: number;
  left?: number;
}
const Scrollable: FC<ScrollableProps> = ({ lines, top = 0, left = 0, showTimestamp, showTitle }) => {
  const trimmedLines = useCallback(
    ({ height, width }: { height: number; width: number }) => {
      const shownLines: Line[] = [];
      for (let i = Math.max(top, 0); i < top + height && i < lines.length; i += 1) {
        const line = lines[i];
        if (!line.main.timestamp) continue;
        const ts = showTimestamp ? `(${line.main.timestamp ? formatDate(line.main.timestamp) : '???'})` : '';
        const title = showTitle ? (line.title ? `[${line.title}]` : '') : '';
        const wcstart = left;
        const wcend = left + width - 8 - ts.length - wcwidth(title);
        const text = logWcslice(line.main.content, wcstart, wcend);
        shownLines.push({
          ts,
          title,
          abs: top + i,
          left: wcstart > 0 ? '~' : '',
          text,
          right: text !== logWcslice(line.main.content, wcstart) ? '~' : '',
        });
      }
      return shownLines;
    },
    [lines, top, left, showTimestamp, showTitle],
  );
  return (
    <BoxWithSize height="100%" width="100%" flexDirection="column">
      {({ width, height }) =>
        trimmedLines({ width, height }).map(({ ts, title, text, left, right, abs }) => (
          <Box key={abs} height={1}>
            <Box>
              <Text color="gray">{ts}</Text>
            </Box>
            <Box>
              <Text color={colorOfStr(title)}>{title}</Text>
            </Box>
            <Box width={1}>
              <Text color="gray" inverse>
                {left}
              </Text>
            </Box>
            <Box width={wcwidth(text) - (text.length - stringLength(text))}>
              <Text wrap="end">{text}</Text>
            </Box>
            <Box width={1}>
              <Text color="gray" italic>
                {right}
              </Text>
            </Box>
          </Box>
        ))
      }
    </BoxWithSize>
  );
};

export default Scrollable;
