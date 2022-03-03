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
  const { openMap, setIndex, index, setOpenMap } = useTreeProcContext();
  const dfs = (n: ProcNode, ind: string): Line[] => {
    const main = ` ${n.name}`;
    const linesStat = ` (${n.log.split('\n').length} LINES)`;
    const command = n.own?.command ? ` (${n.own.command})` : '';
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

  const canRestart = useMemo(() => {
    if (!lines[index].node.own) return false;
    if (lines[index].node.status !== 'finished') return false;
    return true;
  }, [lines, index]);

  useInput((input, key) => {
    if (key.downArrow || (key.ctrl && !key.meta && input === 'n') || (!key.ctrl && !key.meta && input === 'j')) {
      setIndex((prev) => (prev + 1) % lines.length);
    }

    if (key.upArrow || (key.ctrl && !key.meta && input === 'p') || (!key.ctrl && !key.meta && input === 'k')) {
      setIndex((prev) => (prev + lines.length - 1) % lines.length);
    }

    if (key.rightArrow || (!key.ctrl && !key.meta && input === 'l')) {
      if (lines[index].node.children.length > 0) {
        setOpenMap((m) => ({ ...m, [lines[index].node.token]: true }));
      }
    }

    if (key.leftArrow || (!key.ctrl && !key.meta && input === 'h')) {
      if (lines[index].node.children.length > 0) {
        setOpenMap((m) => ({ ...m, [lines[index].node.token]: false }));
      }
    }

    if (!key.ctrl && !key.meta && input === 'n') {
      setPage('select-script');
    }

    if (key.backspace || (key.ctrl && !key.meta && input === 'h') || (key.ctrl && !key.meta && input === 'o')) {
    }

    if (!key.ctrl && !key.meta && input === 'r') {
      if (canRestart) {
        procManager.restartNode(lines[index].node);
      }
    }

    if (key.return || (key.ctrl && !key.meta && input === 'm')) {
      const token = lines[index].node.token;
      setInspectingToken(token);
      setPage('inspect-proc');
    }
  });

  return (
    <>
      <Box flexDirection="column" flexGrow={1}>
        {lines.map((line, i) => (
          <Box>
            <Text>{line.indent}</Text>
            <Text color="yellow" inverse={index === i}>
              {line.symbol}
            </Text>
            <Text
              color={(() => {
                const code = line.node.exitCode ?? 0;
                if (line.node.status !== 'finished' && code !== 0) return 'magenta';
                if (line.node.status === 'waiting') return 'gray';
                if (line.node.status === 'running') return undefined;
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
          <Text>[Enter] run</Text>
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
          <Text>[N] new</Text>
        </Box>
        {canRestart && (
          <Box marginRight={2}>
            <Text>[R] restart</Text>
          </Box>
        )}
      </Box>
    </>
  );
};
export default TreeProcs;
