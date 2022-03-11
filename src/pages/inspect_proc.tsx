import { Box, Text, useInput } from 'ink';
import type { FC } from 'react';
import React, { useEffect, useMemo, useState } from 'react';
import FullDivider from '../components/full_divider';
import ScrollableCounter from '../components/scrollable_counter';
import { useInspectContext } from '../contexts/inspect_context';
import { usePageContext } from '../contexts/page_context';
import { useProcManagerContext } from '../contexts/proc_manager_context';

export interface InspectProcProps {}
const InspectProc: FC<InspectProcProps> = ({}) => {
  const { setPage } = usePageContext();
  const { inspectingToken } = useInspectContext();
  const [bottom, setBottom] = useState(0);
  const [left, setLeft] = useState(0);
  const procManager = useProcManagerContext();
  const procNode = procManager.findNodeByToken(inspectingToken);
  const [log, setLog] = useState(procNode?.log ?? '');
  const logLines = useMemo(() => log.split('\n'), [log]);
  const moveBottomBy = (d: number) => {
    setBottom((bottom) => Math.max(Math.min(bottom + d, logLines.length), -50));
  };
  const moveLeftBy = (d: number) => {
    setLeft((bottom) => Math.max(bottom + d, 0));
  };
  useInput((input, key) => {
    if (key.backspace || (key.ctrl && !key.meta && input === 'h') || (key.ctrl && !key.meta && input === 'o')) {
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
    if (key.rightArrow || (!key.ctrl && !key.meta && input === 'l') || (key.ctrl && !key.meta && input === 'f')) {
      moveLeftBy(1);
    }
    if (key.leftArrow || (!key.ctrl && !key.meta && input === 'h') || (key.ctrl && !key.meta && input === 'p')) {
      moveLeftBy(-1);
    }
  });
  useEffect(() => {
    if (!procNode) return;
    const listener = () => {
      setLog(procNode.log);
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
        <ScrollableCounter lines={logLines} left={left} bottom={bottom} />
      </Box>
      <FullDivider
        dividerChar={bottom > 0 ? '─' : '='}
        title={bottom > 0 ? `${bottom}` : undefined}
        dividerColor={bottom > 0 ? 'cyan' : 'cyanBright'}
      />
      <Box>
        <Box marginRight={2}>
          <Text>[up/down] scroll(TODO)</Text>
        </Box>
        <Box marginRight={2}>
          <Text>[backspace] back</Text>
        </Box>
      </Box>
    </>
  );
};
export default InspectProc;
