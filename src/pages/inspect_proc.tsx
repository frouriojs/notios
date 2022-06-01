import { Box, Text } from 'ink';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { pageActions } from '../../libs/notios-config/src/action_definitions';
import FullDivider from '../components/full_divider';
import HelpPortal from '../components/help_portal';
import LogScrollableCounter from '../components/log_scrollable_counter';
import { useInspectContext } from '../contexts/inspect_context';
import { useNotiosConfigContext } from '../contexts/notios_config_context';
import { usePageContext } from '../contexts/page_context';
import { useProcManagerContext } from '../contexts/proc_manager_context';
import { useTermShapeContext } from '../contexts/term_shape_context';
import useAction from '../hooks/use_action';
import { createEmptyLogAccumulated } from '../utils/proc_manager';

export interface InspectProcProps {}
const InspectProc: FC<InspectProcProps> = ({}) => {
  const { setPage } = usePageContext();
  const { notiosConfig } = useNotiosConfigContext();
  const { inspectingToken } = useInspectContext();
  const [bottom, setBottom] = useState(0);
  const [left, setLeft] = useState(0);
  const procManager = useProcManagerContext();
  const procNode = procManager.findNodeByToken(inspectingToken);
  const [log, setLog] = useState(procNode?.logAccumulated ?? createEmptyLogAccumulated());
  const [lastLogLength, setLastLogLength] = useState(log.lines.length);
  const { termWidth, termHeight } = useTermShapeContext();
  const [showTitle, setShowTitle] = useState(notiosConfig.showLabelByDefault);
  const [showTimestamp, setShowTimestamp] = useState(notiosConfig.showTimestampByDefault);
  const [helpOpen, setHelpOpen] = useState(false);

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

  useAction({
    page: 'inspect-proc',
    actionMaps: {
      help: () => {
        setHelpOpen(true);
      },
      back: () => {
        procManager.markNodeAsRead(procNode);
        setPage('tree-procs');
      },
      'scroll-down-line': () => {
        moveBottomBy(-1);
      },
      'scroll-up-line': () => {
        moveBottomBy(1);
      },
      'scroll-down-paragraph': () => {
        moveBottomBy(-notiosConfig.paragraphSize);
      },
      'scroll-up-paragraph': () => {
        moveBottomBy(notiosConfig.paragraphSize);
      },
      'scroll-down-page': () => {
        moveBottomBy(-termHeight);
      },
      'scroll-up-page': () => {
        moveBottomBy(termHeight);
      },
      'scroll-down-half-page': () => {
        moveBottomBy(-(termHeight >> 1));
      },
      'scroll-up-half-page': () => {
        moveBottomBy(termHeight >> 1);
      },
      'scroll-to-bottom': () => {
        setBottom(0);
      },
      'scroll-to-top': () => {
        setBottom(bottomMax);
      },
      'scroll-to-leftmost': () => {
        setLeft(0);
      },
      'scroll-right-char': () => {
        moveLeftBy(1);
      },
      'scroll-left-char': () => {
        moveLeftBy(-1);
      },
      'scroll-right-word': () => {
        moveLeftBy(notiosConfig.wordSize);
      },
      'scroll-left-word': () => {
        moveLeftBy(-notiosConfig.wordSize);
      },
      'toggle-timestamp': () => {
        setShowTimestamp((v) => !v);
      },
      'toggle-lable': () => {
        setShowTitle((v) => !v);
      },
    },
    notiosConfig,
    disabled: helpOpen,
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

  if (helpOpen) {
    return (
      <HelpPortal
        page="inspect-proc"
        actions={pageActions['inspect-proc']}
        title="Help for inspect process page"
        onClose={() => setHelpOpen(false)}
      />
    );
  }

  if (!procNode)
    return (
      <Text wrap="truncate" color="red">
        Process not found.
      </Text>
    );

  return (
    <>
      <Box height="100%" width="100%" flexDirection="column" flexGrow={1}>
        <LogScrollableCounter
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
          <Text wrap="truncate">Press [?] to open help.</Text>
        </Box>
      </Box>
    </>
  );
};

export default InspectProc;
