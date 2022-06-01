import { Box, Text } from 'ink';
import type { FC } from 'react';
import React, { useEffect, useMemo, useState } from 'react';
import { pageActions } from '../../libs/notios-config/src/action_definitions';
import FullDivider from '../components/full_divider';
import HelpPortal from '../components/help_portal';
import VerticalScrollable from '../components/vertical_scrollable';
import { useInspectContext } from '../contexts/inspect_context';
import { useNotiosConfigContext } from '../contexts/notios_config_context';
import { usePageContext } from '../contexts/page_context';
import { useProcManagerContext } from '../contexts/proc_manager_context';
import { useTreeProcContext } from '../contexts/tree_proc_context';
import useAction from '../hooks/use_action';
import type { ProcNode } from '../utils/proc_manager';

interface Line {
  indent: string;
  symbol: string;
  main: string;
  linesStat: string;
  command: string;
  node: ProcNode;
}

export interface TreeProcsProps {}
const TreeProcs: FC<TreeProcsProps> = ({}) => {
  const { setPage } = usePageContext();
  const { notiosConfig } = useNotiosConfigContext();
  const { setInspectingToken } = useInspectContext();
  const procManager = useProcManagerContext();
  const { openMap, selectedNodeToken, setSelectedNodeToken, setOpenMap } = useTreeProcContext();
  const [helpOpen, setHelpOpen] = useState(false);

  const dfs = (n: ProcNode, ind: string): Line[] => {
    const main = ` ${n.name}`;
    const linesStat = ` (${n.logAccumulated.lineCount} LINES)`;
    const command = n.procOwn?.command ? ` (${n.procOwn.command})` : '';
    if (openMap[n.token] && n.children.length > 0) {
      return [
        {
          indent: '',
          symbol: 'v',
          main,
          linesStat,
          command,
          node: n,
        },
        ...n.children.flatMap((c) => dfs(c, ind)).map((p) => ({ ...p, indent: `${ind}${p.indent}` })),
      ];
    }
    return [
      {
        indent: '',
        symbol: n.children.length > 0 ? '>' : '-',
        main,
        linesStat,
        command,
        node: n,
      },
    ];
  };

  const [{ rootNode }, setRootNode] = useState({ rootNode: procManager.rootNode });
  useEffect(() => {
    const listener = () => {
      setRootNode({ rootNode: procManager.rootNode });
    };
    procManager.addUpdateListener(listener);
    procManager.rootNode.addUpdateListener(listener);
    return () => {
      procManager.removeUpdateListener(listener);
      procManager.rootNode.removeUpdateListener(listener);
    };
  }, [procManager]);

  const lines = rootNode.children.flatMap((child) => dfs(child, '  '));
  const selectedIndex = useMemo(() => {
    if (selectedNodeToken === null) return 0;
    const i = lines.findIndex((line) => line.node.token === selectedNodeToken);
    if (i === -1) return 0;
    return i;
  }, [lines, selectedNodeToken]);
  const selectedNode = useMemo(() => lines[selectedIndex].node, [lines, selectedIndex]);

  const [scrollTop, setScrollTop] = useState(0);

  const canRestart = useMemo(() => {
    if (!selectedNode.procOwn) return false;
    if (selectedNode.status !== 'finished' && selectedNode.status !== 'killed') return false;
    return true;
  }, [lines, selectedIndex]);

  const canKill = useMemo(() => {
    if (!selectedNode.procOwn) return false;
    if (selectedNode.status !== 'running') return false;
    return true;
  }, [lines, selectedIndex]);

  useAction({
    page: 'tree-procs',
    actionMaps: {
      help: () => {
        setHelpOpen(true);
      },
      'cursor-prev': () => {
        if (lines.length > 0) {
          const newIndex = (selectedIndex + lines.length - 1) % lines.length;
          setSelectedNodeToken(lines[newIndex].node.token);
        }
      },
      'cursor-next': () => {
        if (lines.length > 0) {
          const newIndex = (selectedIndex + 1) % lines.length;
          setSelectedNodeToken(lines[newIndex].node.token);
        }
      },
      'select-script': () => {
        setPage('select-script');
      },
      expand: () => {
        if (selectedNode.children.length > 0) {
          setOpenMap((m) => ({ ...m, [selectedNode.token]: true }));
        }
      },
      collapse: () => {
        if (selectedNode.children.length > 0) {
          setOpenMap((m) => ({ ...m, [selectedNode.token]: false }));
        }
      },
      restart: () => {
        if (canRestart) {
          procManager.restartNode(selectedNode);
        }
      },
      kill: () => {
        if (canKill) {
          procManager.killNode(selectedNode);
        }
      },
      inspect: () => {
        const token = selectedNode.token;
        setInspectingToken(token);
        setPage('inspect-proc');
      },
    },
    notiosConfig,
    disabled: helpOpen,
  });

  if (helpOpen) {
    return (
      <HelpPortal
        page="tree-procs"
        actions={pageActions['tree-procs']}
        title="Help for tree processes page"
        onClose={() => setHelpOpen(false)}
      />
    );
  }

  return (
    <>
      <Box flexDirection="column" flexGrow={1}>
        <VerticalScrollable
          top={scrollTop}
          select={selectedIndex}
          onScrollRequest={(newTop) => {
            setScrollTop(newTop);
          }}
          lines={lines.map((line, i) => (
            <Box key={line.node.token}>
              <Text wrap="truncate">{line.indent}</Text>
              <Box width={1}>
                <Text wrap="truncate" color="yellow" inverse={selectedIndex === i}>
                  {line.symbol}
                </Text>
              </Box>
              <Text
                wrap="truncate"
                color={(() => {
                  const code = line.node.exitCode ?? 0;
                  if (line.node.status !== 'finished' && code !== 0) return 'magenta';
                  if (line.node.status === 'waiting') return 'gray';
                  if (line.node.status === 'running') return undefined;
                  if (line.node.status === 'killed') return 'yellow';
                  if (line.node.status === 'finished') {
                    if (code === 0) return 'green';
                    return 'red';
                  }
                })()}
              >
                {line.main}
              </Text>
              <Text wrap="truncate">{line.linesStat}</Text>
              {notiosConfig.showScriptCommandInTreeProcs && (
                <Box flexShrink={1}>
                  <Text wrap="truncate-end" color="cyan">
                    {line.command}
                  </Text>
                </Box>
              )}
            </Box>
          ))}
        />
      </Box>
      <FullDivider />
      <Box>
        <Box marginRight={2}>
          <Text wrap="truncate">Press [?] to open help.</Text>
        </Box>
        <Box marginRight={1}>
          <Text wrap="truncate">Status:</Text>
        </Box>
        {!canKill && !canRestart && (
          <Box marginRight={1}>
            <Text wrap="truncate">(cannot kill or restart)</Text>
          </Box>
        )}
        {canKill && (
          <Box marginRight={1}>
            <Text wrap="truncate">(can kill)</Text>
          </Box>
        )}
        {canRestart && (
          <Box marginRight={2}>
            <Text wrap="truncate">(can restart)</Text>
          </Box>
        )}
      </Box>
    </>
  );
};
export default TreeProcs;
