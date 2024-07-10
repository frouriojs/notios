import { Box, Text } from 'ink';
import path from 'path';
import type { FC } from 'react';
import React, { useState } from 'react';
import { pageActions } from '../../libs/notios-config/src/action_definitions.js';
import FullDivider from '../components/full_divider.js';
import HelpPortal from '../components/help_portal.js';
import VerticalScrollable from '../components/vertical_scrollable.js';
import { useNotiosConfigContext } from '../contexts/notios_config_context.js';
import { usePageContext } from '../contexts/page_context.js';
import { useProcManagerContext } from '../contexts/proc_manager_context.js';
import { useUiOptionsContext } from '../contexts/ui_options_context.js';
import useAction from '../hooks/use_action.js';

export interface SelectScriptProps {}
const SelectScript: FC<SelectScriptProps> = ({}) => {
  const { setPage } = usePageContext();
  const { notiosConfig } = useNotiosConfigContext();
  const procManager = useProcManagerContext();
  const { scripts, manifestFullPath, npmClient } = useUiOptionsContext();
  const [index, setIndex] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);

  const startCurrentSelecting = () => {
    procManager.createNode({
      name: scripts[index].name,
      type: 'none',
      procOwn: {
        command: scripts[index].command,
        cwd: path.dirname(manifestFullPath),
        npmPath: npmClient,
      },
      status: 'running',
    });
  };

  useAction({
    page: 'select-script',
    actionMaps: {
      help: () => {
        setHelpOpen(true);
      },
      'cursor-prev': () => {
        setIndex((prev) => (prev + scripts.length - 1) % scripts.length);
      },
      'cursor-next': () => {
        setIndex((prev) => (prev + 1) % scripts.length);
      },
      back: () => {
        if (procManager.rootNode.children.length === 0) {
          return;
        }
        setPage('tree-procs');
      },
      'start-and-back': () => {
        startCurrentSelecting();
        setPage('tree-procs');
      },
      start: () => {
        startCurrentSelecting();
      },
    },
    notiosConfig,
    disabled: helpOpen,
  });

  if (helpOpen) {
    return (
      <HelpPortal
        page="select-script"
        actions={pageActions['select-script']}
        title="Help for select script page"
        onClose={() => setHelpOpen(false)}
      />
    );
  }

  return (
    <Box flexDirection="column" flexGrow={1}>
      <Box flexDirection="column" flexGrow={1}>
        <Text wrap="truncate">{manifestFullPath}</Text>
        <VerticalScrollable
          top={scrollTop}
          select={index}
          onScrollRequest={(newTop) => {
            setScrollTop(newTop);
          }}
          lines={scripts.map((script, i) => {
            return (
              <Box key={script.name}>
                <Text wrap="truncate" color="yellow" inverse={index === i}>
                  {script.name}
                </Text>
                {notiosConfig.showScriptCommandInSelectScript && (
                  <Text wrap="truncate" color="cyan">
                    {' '}
                    ({script.command})
                  </Text>
                )}
              </Box>
            );
          })}
        />
      </Box>
      <FullDivider />
      <Box>
        <Box marginRight={2}>
          <Text wrap="truncate">Press [?] to open help.</Text>
        </Box>
      </Box>
    </Box>
  );
};
export default SelectScript;
