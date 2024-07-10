import { Box, Text } from 'ink';
import React, { FC, useEffect, useState } from 'react';
import { Action, ActionablePage, pageActions } from '../../libs/notios-config/src/action_definitions.js';
import {
  NotiosConfigActionKeymapping,
  NotiosConfigKeymappingRoot,
} from '../../libs/notios-config/src/interfaces/notios-config.js';
import { useNotiosConfigContext } from '../contexts/notios_config_context.js';
import { useTermShapeContext } from '../contexts/term_shape_context.js';
import useAction from '../hooks/use_action.js';
import FullDivider from './full_divider.js';
import VerticalScrollable from './vertical_scrollable.js';

export const keymappingToText = (keymapping: NotiosConfigKeymappingRoot): React.ReactElement => {
  const baseColor = 'blue';
  const specialColor = 'cyan';
  const attrColor = 'yellow';
  switch (keymapping.type) {
    case 'seq':
      return (
        <>
          {keymapping.seq.map((k, i) => (
            <>
              {keymappingToText(k)}
              {keymapping.seq.length > i + 1 && (
                <Text wrap="truncate" color="gray">
                  {' then '}
                </Text>
              )}
            </>
          ))}
        </>
      );
    case 'char':
      return (
        <>
          {keymapping.ctrl && (
            <>
              <Text wrap="truncate" color={attrColor}>
                CTRL
              </Text>
              <Text wrap="truncate">-</Text>
            </>
          )}
          {keymapping.meta && (
            <>
              <Text wrap="truncate" color={attrColor}>
                META
              </Text>
              <Text wrap="truncate">-</Text>
            </>
          )}
          {keymapping.shift && (
            <>
              <Text wrap="truncate" color={attrColor}>
                SHIFT
              </Text>
              <Text wrap="truncate">-</Text>
            </>
          )}
          <Text wrap="truncate" color={baseColor}>
            {keymapping.char === ' ' ? '<SPACE>' : keymapping.char}
          </Text>
        </>
      );
    case 'special':
      return (
        <>
          {keymapping.ctrl && (
            <>
              <Text wrap="truncate" color={attrColor}>
                CTRL
              </Text>
              <Text wrap="truncate">-</Text>
            </>
          )}
          {keymapping.shift && (
            <>
              <Text wrap="truncate" color={attrColor}>
                SHIFT
              </Text>
              <Text wrap="truncate">-</Text>
            </>
          )}
          <Text wrap="truncate" color={specialColor}>
            {keymapping.special}
          </Text>
        </>
      );
  }
};

export interface HelpPortalProps {
  page: ActionablePage;
  title: string;
  actions: Record<string, Action>;
  denyHelpOpen?: boolean;
  onClose?: () => void;
}
const HelpPortal: FC<HelpPortalProps> = ({ page, title, actions, denyHelpOpen, onClose }) => {
  const { notiosConfig } = useNotiosConfigContext();
  const [scrollTop, setScrollTop] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);
  const { termWidth, termHeight } = useTermShapeContext();

  const lines = [
    <Box key="title" height={1}>
      <Text wrap="truncate">{title}</Text>
    </Box>,
    <Box key="divider" height={1}>
      <Text wrap="truncate" color="gray">
        {'*'.repeat(20)}
      </Text>
    </Box>,
    <Box key="doc-1" height={1}>
      <Text wrap="truncate" color="gray">
        {'Keymapping can be configured in '}
      </Text>
      <Text wrap="truncate" color="green">
        {'notios.config.cjs'}
      </Text>
      <Text wrap="truncate" color="gray">
        {'.'}
      </Text>
    </Box>,
    <Box key="doc-2" height={1}>
      <Text wrap="truncate" color="gray">
        {'Please visit the'}
      </Text>
    </Box>,
    <Box key="doc-3" height={1}>
      <Text wrap="truncate" color="cyan">
        {'documentation ( https://github.com/frouriojs/notios#readme )'}
      </Text>
    </Box>,
    <Box key="doc-4" height={1}>
      <Text wrap="truncate" color="gray">
        {'for more information.'}
      </Text>
    </Box>,
    <Box key="empty" height={1}>
      <Text wrap="truncate"> </Text>
    </Box>,
    ...Object.entries(actions).flatMap(([actionName, action]) => [
      <Box key={`${actionName}:top-empty-1`} height={1}>
        <Text wrap="truncate"> </Text>
      </Box>,
      <Box key={`${actionName}:top-empty-2`} height={1}>
        <Text wrap="truncate"> </Text>
      </Box>,
      <Box key={`${actionName}:top-sep`} height={1}>
        <Text wrap="truncate" color="gray">
          {'='.repeat(20)}
        </Text>
      </Box>,
      <Box key={`${actionName}:actionName`} height={1}>
        <Text wrap="truncate">
          {'"'}
          {actionName}
          {'"'}
        </Text>
      </Box>,
      <Box key={`${actionName}:description`} height={1}>
        <Text wrap="truncate">
          {'  * '}
          {action.description}
        </Text>
      </Box>,
      <Box key={`${actionName}:center-sep`} height={1}>
        <Text wrap="truncate" color="gray">
          {'-'.repeat(20)}
        </Text>
      </Box>,
      ...(() => {
        const actionKeymapping = (notiosConfig.keymappings as any)[page][actionName] as NotiosConfigActionKeymapping;
        if (actionKeymapping.length === 0) {
          return [
            <Box key={`${actionName}:no-keymappings`} height={1}>
              <Text wrap="truncate" color="gray">
                {'  No keymappings'}
              </Text>
            </Box>,
          ];
        }
        return actionKeymapping.map((e, i) => {
          const text = keymappingToText(e);
          return (
            <Box key={`${actionName}:keymapping-${i}`} height={1}>
              <Text wrap="truncate" color="gray">
                {'  - '}
              </Text>
              {text}
            </Box>
          );
        });
      })(),
      <Box key={`${actionName}:bottom-sep`} height={1}>
        <Text wrap="truncate" color="gray">
          {'='.repeat(20)}
        </Text>
      </Box>,
    ]),
  ];

  const scrollTopMax = Math.max(0, lines.length - termHeight + 4);
  const scrollTopMin = 0;

  const moveTopBy = (d: number) => {
    setScrollTop(Math.max(Math.min(scrollTop + d, scrollTopMax), scrollTopMin));
  };

  const moveBottomBy = (d: number) => {
    return moveTopBy(-d);
  };

  useEffect(() => {
    moveTopBy(0);
  }, [termWidth, termHeight]);

  useAction({
    page: 'help',
    actionMaps: {
      help: () => {
        if (denyHelpOpen) return;
        setHelpOpen(true);
      },
      back: () => {
        onClose?.();
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
        setScrollTop(scrollTopMax);
      },
      'scroll-to-top': () => {
        setScrollTop(scrollTopMin);
      },
    },
    notiosConfig,
    disabled: helpOpen,
  });

  if (helpOpen && !denyHelpOpen) {
    return (
      <>
        <Box flexDirection="column" flexGrow={1}>
          <HelpPortal
            page="help"
            title="Help for help page"
            actions={pageActions['help']}
            onClose={() => setHelpOpen(false)}
            denyHelpOpen
          />
        </Box>
      </>
    );
  }

  return (
    <>
      <Box flexDirection="column" flexGrow={1}>
        <VerticalScrollable top={scrollTop} lines={lines} />
      </Box>
      <FullDivider />
      <Box height={1}>
        {denyHelpOpen ? (
          <Text wrap="truncate">{"Sorry, can't help anymore."}</Text>
        ) : (
          <Text wrap="truncate">Press [?] to open help of help.</Text>
        )}
      </Box>
    </>
  );
};

export default HelpPortal;
