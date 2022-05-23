import { Box, Text } from 'ink';
import type { FC } from 'react';
import React, { useCallback } from 'react';
import stringLength from 'string-length';
import wcwidth from 'wcwidth';
import useCurrentMs from '../hooks/use_current_ms';
import logWcslice from '../utils/log_wcslice';
import { LogLinesReadonly } from '../utils/proc_manager';
import BoxWithSize from './box_with_size';

const formatDate = (d: Date) => {
  return `${d.getFullYear()}/${`0${d.getMonth() + 1}`.slice(-2)}/${`0${d.getDate()}`.slice(
    -2,
  )} ${`0${d.getHours()}`.slice(-2)}:${`0${d.getMinutes()}`.slice(-2)}:${`0${d.getSeconds()}`.slice(-2)}`;
};

const rateToRgbHex = (t: number) => {
  return '#' + ('0' + Math.min(Math.max(Math.round(t * 255), 0), 255).toString(16)).slice(-2).repeat(3);
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
  timestamp: Date;
  read: boolean;
  title: string;
  abs: number;
  left: string;
  text: string;
  right: string;
  fixWidth: number;
}

export interface LogScrollableProps {
  lines: LogLinesReadonly;
  showTimestamp?: boolean;
  showTitle?: boolean;
  top?: number;
  left?: number;
}
const LogScrollable: FC<LogScrollableProps> = ({ lines, top = 0, left = 0, showTimestamp, showTitle }) => {
  const trimmedLines = useCallback(
    ({ height, width }: { height: number; width: number }) => {
      const shownLines: Line[] = [];
      for (let i = Math.max(top, 0); i < top + height && i < lines.length; i += 1) {
        const line = lines[i];
        if (!line.main.timestamp) continue;
        const ts = showTimestamp ? `(${line.main.timestamp ? formatDate(line.main.timestamp) : '???'})` : '';
        const title = showTitle ? (line.title ? `[${line.title}]` : '') : '';
        const wcstart = left;
        const wcend = left + width - 9 - ts.length - wcwidth(title);
        const { sliced: text, stylePrintableBytesLength } = logWcslice(line.main.content, wcstart, wcend);
        const textPrinted = logWcslice(
          line.main.content.filter((c) => c.type === 'print'),
          wcstart,
          wcend,
        ).sliced;
        const fixWidth = wcwidth(text) - (textPrinted.length - stringLength(textPrinted)) - stylePrintableBytesLength;
        shownLines.push({
          ts,
          timestamp: line.main.timestamp,
          read: Boolean(line.main.read),
          title,
          fixWidth,
          abs: top + i,
          left: wcstart > 0 ? '~' : '',
          text,
          right: text !== logWcslice(line.main.content, wcstart).sliced ? '~' : '',
        });
      }
      return shownLines;
    },
    [lines, top, left, showTimestamp, showTitle],
  );

  const Main: FC<{ width: number; height: number } & Line> = ({
    left,
    read,
    ts,
    text,
    right,
    timestamp,
    title,
    fixWidth,
  }) => {
    const ms = useCurrentMs();
    const rate = timestamp == null ? 1 : Math.min(0.04 + 0.93 ** ((ms - timestamp.getTime()) / 1000), 1);
    return (
      <Box height={1}>
        <Box>
          <Text color={rate < 0.5 ? '#ffffff' : '#000000'} backgroundColor={rateToRgbHex(rate)}>
            {read ? '   ' : ' @ '}
          </Text>
        </Box>
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
        <Box width={fixWidth}>
          <Text wrap="end">{text}</Text>
        </Box>
        <Box width={1}>
          <Text color="gray" italic>
            {right}
          </Text>
        </Box>
      </Box>
    );
  };

  return (
    <BoxWithSize height="100%" width="100%" flexDirection="column">
      {({ width, height }) =>
        trimmedLines({ width, height }).map((d) => <Main key={d.abs} width={width} height={height} {...d} />)
      }
    </BoxWithSize>
  );
};

export default LogScrollable;
