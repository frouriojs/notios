import { Box, Text, useInput } from 'ink';
import type { FC } from 'react';
import React, { useEffect, useMemo, useState } from 'react';
import FullDivider from '../components/full_divider';
import { useInspectContext } from '../contexts/inspect_context';
import { usePageContext } from '../contexts/page_context';
import { useProcManagerContext } from '../contexts/proc_manager_context';
import { useTreeProcContext } from '../contexts/tree_proc_context';
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
  const { setInspectingToken } = useInspectContext();
  const procManager = useProcManagerContext();
  const { openMap, selectedNodeToken, setSelectedNodeToken, setOpenMap } = useTreeProcContext();
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

  useInput((input, key) => {
    if (
      (!key.shift && key.tab) ||
      key.downArrow ||
      (key.ctrl && !key.meta && input === 'n') ||
      (!key.ctrl && !key.meta && input === 'j')
    ) {
      if (lines.length > 0) {
        const newIndex = (selectedIndex + 1) % lines.length;
        setSelectedNodeToken(lines[newIndex].node.token);
      }
    }

    if (
      (key.shift && key.tab) ||
      key.upArrow ||
      (key.ctrl && !key.meta && input === 'p') ||
      (!key.ctrl && !key.meta && input === 'k')
    ) {
      if (lines.length > 0) {
        const newIndex = (selectedIndex + lines.length - 1) % lines.length;
        setSelectedNodeToken(lines[newIndex].node.token);
      }
    }

    if (key.rightArrow || (!key.ctrl && !key.meta && input === 'l')) {
      if (selectedNode.children.length > 0) {
        setOpenMap((m) => ({ ...m, [selectedNode.token]: true }));
      }
    }

    if (key.leftArrow || (!key.ctrl && !key.meta && input === 'h')) {
      if (selectedNode.children.length > 0) {
        setOpenMap((m) => ({ ...m, [selectedNode.token]: false }));
      }
    }

    if (!key.ctrl && !key.meta && input === 'n') {
      setPage('select-script');
    }

    if (
      key.backspace ||
      key.delete ||
      (key.ctrl && !key.meta && input === 'h') ||
      (key.ctrl && !key.meta && input === 'o')
    ) {
    }

    if (!key.ctrl && !key.meta && input === 'r') {
      if (canRestart) {
        procManager.restartNode(selectedNode);
      }
    }

    if (!key.ctrl && !key.meta && input === 'x') {
      if (canKill) {
        procManager.killNode(selectedNode);
      }
    }

    if (key.return || (key.ctrl && !key.meta && input === 'm')) {
      const token = selectedNode.token;
      setInspectingToken(token);
      setPage('inspect-proc');
    }
  });

  return (
    <>
      <Box flexDirection="column" flexGrow={1}>
        {lines.map((line, i) => (
          <Box key={line.node.token}>
            <Text>{line.indent}</Text>
            <Box minWidth={1}>
              <Text color="yellow" inverse={selectedIndex === i}>
                {line.symbol}
              </Text>
            </Box>
            <Text
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
            <Text>{line.linesStat}</Text>
            <Text color="cyan">{line.command}</Text>
          </Box>
        ))}
      </Box>
      <FullDivider />
      <Box>
        <Box marginRight={2}>
          <Text>[Enter] log</Text>
        </Box>
        <Box marginRight={2}>
          <Text>[up/down] cursor</Text>
        </Box>
        <Box marginRight={2}>
          <Text>[right] open</Text>
        </Box>
        <Box marginRight={2}>
          <Text>[left] close</Text>
        </Box>
        <Box marginRight={2}>
          <Text>[n] new</Text>
        </Box>
        {canKill && (
          <Box marginRight={2}>
            <Text>[x] kill</Text>
          </Box>
        )}
        {canRestart && (
          <Box marginRight={2}>
            <Text>[r] restart</Text>
          </Box>
        )}
      </Box>
    </>
  );
};
export default TreeProcs;
