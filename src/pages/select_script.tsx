import { Box, Text, useInput } from 'ink';
import path from 'path';
import type { FC } from 'react';
import React, { useState } from 'react';
import FullDivider from '../components/full_divider';
import { usePageContext } from '../contexts/page_context';
import { useProcManagerContext } from '../contexts/proc_manager_context';
import { useUiOptionsContext } from '../contexts/ui_options_context';

export interface SelectScriptProps {}
const SelectScript: FC<SelectScriptProps> = ({}) => {
  const { setPage } = usePageContext();
  const procManager = useProcManagerContext();
  const { scripts, manifestFullPath, npmClient } = useUiOptionsContext();
  const [index, setIndex] = useState(0);

  useInput((input, key) => {
    if (key.downArrow || (key.ctrl && !key.meta && input === 'n') || (!key.ctrl && !key.meta && input === 'j')) {
      setIndex((prev) => (prev + 1) % scripts.length);
    }

    if (key.upArrow || (key.ctrl && !key.meta && input === 'p') || (!key.ctrl && !key.meta && input === 'k')) {
      setIndex((prev) => (prev + scripts.length - 1) % scripts.length);
    }

    if (
      key.backspace ||
      key.delete ||
      (key.ctrl && !key.meta && input === 'h') ||
      (key.ctrl && !key.meta && input === 'o')
    ) {
      setPage('tree-procs');
    }

    if (
      key.return ||
      key.rightArrow ||
      (key.ctrl && !key.meta && input === 'm') ||
      (!key.ctrl && !key.meta && input === 'l') ||
      (key.ctrl && !key.meta && input === 'f')
    ) {
      procManager.createNode({
        name: scripts[index].name,
        type: 'none',
        own: {
          command: scripts[index].command,
          cwd: path.dirname(manifestFullPath),
          npmPath: npmClient,
        },
        status: 'running',
      });
      setPage('tree-procs');
    }
  });

  return (
    <Box flexDirection="column" flexGrow={1}>
      <Box flexDirection="column" flexGrow={1}>
        <Text>{manifestFullPath}</Text>
        {scripts.map((script, i) => {
          return (
            <Box key={script.name}>
              <Text color="yellow" inverse={index === i}>
                {script.name}
              </Text>
              <Text color="cyan"> ({script.command})</Text>
            </Box>
          );
        })}
      </Box>
      <FullDivider />
      <Box>
        <Box marginRight={2}>
          <Text>[Enter] run</Text>
        </Box>
        <Box marginRight={2}>
          <Text>[up/down] cursor</Text>
        </Box>
        <Box marginRight={2}>
          <Text>[backspace] back</Text>
        </Box>
      </Box>
    </Box>
  );
};
export default SelectScript;
