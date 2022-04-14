import { Box, Text, useInput } from 'ink';
import React, { FC, useEffect, useMemo, useState } from 'react';
import FullDivider from '../components/full_divider';
import ScrollableCounter from '../components/scrollable_counter';
import { useInspectContext } from '../contexts/inspect_context';
import { usePageContext } from '../contexts/page_context';
import { useProcManagerContext } from '../contexts/proc_manager_context';
import { useTermShapeContext } from '../contexts/term_shape_context';
import { createEmptyLogAccumulated } from '../utils/proc_manager';

export interface InspectProcProps {}
const InspectProc: FC<InspectProcProps> = ({}) => {
  const { setPage } = usePageContext();
  const { inspectingToken } = useInspectContext();
  const [bottom, setBottom] = useState(0);
  const [left, setLeft] = useState(0);
  const procManager = useProcManagerContext();
  const procNode = procManager.findNodeByToken(inspectingToken);
  const [log, setLog] = useState(procNode?.logAccumulated ?? createEmptyLogAccumulated());
  const [lastLogLength, setLastLogLength] = useState(log.lines.length);
  const { termWidth, termHeight } = useTermShapeContext();
  const [showTitle, setShowTitle] = useState(true);
  const [showTimestamp, setShowTimestamp] = useState(false);
  const bottomMax = Math.max(0, log.lines.length - termHeight + 2);
  const bottomMin = Math.min(0, -termHeight + 2 + 1);
  const moveBottomBy = (d: number) => {
    setBottom(Math.max(Math.min(bottom + d, bottomMax), bottomMin));
  };
  const moveLeftBy = (d: number) => {
    setLeft(Math.max(left + d, 0));
  };

  const rbottom = useMemo(() => {
    if (bottom === 0) return 0;
    return Math.max(Math.min(bottom + log.lines.length - lastLogLength, bottomMax), bottomMin);
  }, [bottom, lastLogLength, bottomMax, bottomMin]);

  useEffect(() => {
    if (bottom !== 0) {
      setBottom(bottom + log.lines.length - lastLogLength);
    }
    setLastLogLength(log.lines.length);
  }, [log, bottom, lastLogLength, bottomMax, bottomMin]);

  useEffect(() => {
    moveBottomBy(0);
    moveLeftBy(0);
  }, [termWidth, termHeight]);
  useInput((input, key) => {
    if (
      key.backspace ||
      key.delete ||
      (key.ctrl && !key.meta && input === 'h') ||
      (key.ctrl && !key.meta && input === 'o')
    ) {
      setPage('tree-procs');
    }
    if (
      key.upArrow ||
      (key.ctrl && !key.meta && input === 'y') ||
      (!key.ctrl && !key.meta && input === 'k') ||
      (key.ctrl && !key.meta && input === 'p')
    ) {
      moveBottomBy(1);
    }
    if (
      key.downArrow ||
      (key.ctrl && !key.meta && input === 'e') ||
      (!key.ctrl && !key.meta && input === 'j') ||
      (key.ctrl && !key.meta && input === 'n')
    ) {
      moveBottomBy(-1);
    }
    if (
      (!key.ctrl && key.rightArrow) ||
      (!key.ctrl && !key.meta && input === 'l') ||
      (key.ctrl && !key.meta && input === 'f')
    ) {
      moveLeftBy(1);
    }
    if (
      (!key.ctrl && key.leftArrow) ||
      (!key.ctrl && !key.meta && input === 'h') ||
      (key.ctrl && !key.meta && input === 'b')
    ) {
      moveLeftBy(-1);
    }
    if ((!key.ctrl && !key.meta && input === '^') || (!key.ctrl && !key.meta && input === '0')) {
      setLeft(0);
    }
    if (!key.ctrl && !key.meta && input === 'G') {
      setBottom(0);
    }
    if (!key.ctrl && !key.meta && input === 'g') {
      setBottom(bottomMax);
    }
    if ((!key.ctrl && !key.meta && input === 'd') || (!key.ctrl && !key.meta && key.pageDown)) {
      moveBottomBy(-(termHeight >> 1));
    }
    if ((!key.ctrl && !key.meta && input === 'u') || (!key.ctrl && !key.meta && key.pageUp)) {
      moveBottomBy(termHeight >> 1);
    }
    if (
      (key.ctrl && key.rightArrow) ||
      (!key.ctrl && !key.meta && input === 'e') ||
      (!key.ctrl && key.meta && input === 'f')
    ) {
      moveLeftBy(5);
    }
    if (
      (key.ctrl && key.leftArrow) ||
      (!key.ctrl && !key.meta && input === 'b') ||
      (!key.ctrl && key.meta && input === 'b')
    ) {
      moveLeftBy(-5);
    }
    if (!key.ctrl && !key.meta && input === 't') {
      setShowTimestamp((v) => !v);
    }
    if (!key.ctrl && !key.meta && input === 'v') {
      setShowTitle((v) => !v);
    }
  });
  useEffect(() => {
    if (!procNode) return;
    const listener = () => {
      setLog({ ...procNode.logAccumulated });
    };
    procNode.addUpdateListener(listener);
    return () => {
      procNode.removeUpdateListener(listener);
    };
  }, [procNode]);
  if (!procNode) return <Text color="red">Process not found.</Text>;
  return (
    <>
      <Box height="100%" width="100%" flexDirection="column" flexGrow={1}>
        <ScrollableCounter
          lines={log.lines}
          left={left}
          bottom={rbottom}
          showTitle={showTitle}
          showTimestamp={showTimestamp}
        />
      </Box>
      <FullDivider
        dividerChar={rbottom > 0 ? '─' : '='}
        title={rbottom > 0 ? `${rbottom}` : undefined}
        dividerColor={rbottom > 0 ? 'cyan' : 'cyanBright'}
      />
      <Box>
        <Box marginRight={2}>
          <Text>[arrow] scroll</Text>
        </Box>
        <Box marginRight={2}>
          <Text>[backspace] back</Text>
        </Box>
        <Box marginRight={2}>
          <Text>[v] label {showTitle ? 'ON' : 'OFF'}</Text>
        </Box>
        <Box marginRight={2}>
          <Text>[t] timestamp {showTimestamp ? 'ON' : 'OFF'}</Text>
        </Box>
        <Box marginRight={2}>
          <Text>[G] bottom</Text>
        </Box>
        <Box marginRight={2}>
          <Text>[0] leftmost</Text>
        </Box>
      </Box>
    </>
  );
};
export default InspectProc;
