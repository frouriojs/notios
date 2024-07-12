import type { FC } from 'react';
import React from 'react';
import BoxWithSize from './box_with_size';
import { Box, Text } from 'ink';
import stringWidth from 'string-width';

const paddingChar = ' ';

const FullDivider: FC<{ title?: string; dividerChar?: string; dividerColor?: string }> = ({
  title,
  dividerChar = '-',
  dividerColor,
}) => {
  return (
    <BoxWithSize>
      {(size) => {
        const width = Math.max(size.width - 5, 1);
        const titleString = title ? `${paddingChar}${title}${paddingChar}` : '';
        const titleWidth = stringWidth(titleString);
        const dividerWidth = (width - titleWidth) / 2;
        const numberOfCharsPerSide = dividerWidth / stringWidth(dividerChar);
        const dividerSideString = dividerChar.repeat(numberOfCharsPerSide);

        return (
          <Box flexDirection="row">
            <Text>
              {paddingChar}
              <Text color={dividerColor}>{dividerSideString}</Text>
              <Text color="#fff">{titleString}</Text>
              <Text color={dividerColor}>{dividerSideString}</Text>
              {paddingChar}
            </Text>
          </Box>
        );
      }}
    </BoxWithSize>
  );
};

export default FullDivider;
