import { Box, Text, useInput } from 'ink';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import FullDivider from '../components/full_divider';
import Scrollable from '../components/scrollable';
import { useInspectContext } from '../contexts/inspect_context';
import { usePageContext } from '../contexts/page_context';
import { useProcManagerContext } from '../contexts/proc_manager_context';

export interface InspectProcProps {}
const InspectProc: FC<InspectProcProps> = ({}) => {
  const { setPage } = usePageContext();
  const { inspectingToken } = useInspectContext();
  const procManager = useProcManagerContext();
  const procNode = procManager.findNodeByToken(inspectingToken);
  useInput((input, key) => {
    if (key.backspace || (key.ctrl && !key.meta && input === 'h') || (key.ctrl && !key.meta && input === 'o')) {
      setPage('tree-procs');
    }
  });
  const [log, setLog] = useState(procNode?.log ?? '');
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
      <Box flexDirection="column" flexGrow={1}>
        <Scrollable>{log}</Scrollable>
      </Box>
      <FullDivider />
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
