import { Box, Text } from 'ink';
import type { FC } from 'react';
import React from 'react';
import BoxWithSize from './box_with_size';

export interface VerticalScrollableProps {
  lines: readonly React.ReactElement[];
  top: number;

  height?: number;

  // Select is for scroll + cursor view.
  select?: number;
  onScrollRequest?: (newTop: number) => void;
}

const VerticalScrollable: FC<VerticalScrollableProps> = ({
  lines,
  top,
  select,
  height: forceHeight,
  onScrollRequest,
}) => {
  return (
    <BoxWithSize height="100%" width="100%" flexDirection="column">
      {({ height: mesuredHeight, width }) => {
        const height = forceHeight ?? mesuredHeight;
        const realTop = Math.max(Math.min(top, lines.length), 0);
        const isTopOverflowed = realTop > 0;
        // last shown item index = realTop + height - 3
        // condition is (last shown item index) < lines.length - 1
        const isBottomOverflowed = realTop + height < lines.length + 2;

        // select
        if (select != null) {
          if (height > 3) {
            if (select < realTop) {
              onScrollRequest?.(select);
            } else if (select > realTop + height - 3) {
              onScrollRequest?.(select - height + 3);
            }
          }
        }

        return (
          <>
            <Box height={1} width="100%">
              <Text inverse color="cyan">
                {isTopOverflowed ? '^'.repeat(Math.max(width - 5, 3)) : ''}
              </Text>
            </Box>
            <Box width="100%" flexGrow={1} flexDirection="column">
              {lines.slice(realTop, realTop + height - 2)}
            </Box>
            <Box height={1} width="100%">
              <Text inverse color="cyan">
                {isBottomOverflowed ? 'v'.repeat(Math.max(width - 5, 3)) : ''}
              </Text>
            </Box>
          </>
        );
      }}
    </BoxWithSize>
  );
};

export default VerticalScrollable;
