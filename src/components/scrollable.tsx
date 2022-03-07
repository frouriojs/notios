import { Box, measureElement, Text } from 'ink';
import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { useTermShapeContext } from '../contexts/term_shape_context';

export interface ScrollableProps {
  children: string;
}
const Scrollable: FC<ScrollableProps> = ({ children }) => {
  const { termWidth, termHeight } = useTermShapeContext();
  const [realHeight, setRealHeight] = useState(1);
  const [, setRealWidth] = useState(50);
  const ref = useRef<any>(null);
  useEffect(() => {
    const { width, height } = measureElement(ref.current);
    setRealWidth(width);
    setRealHeight(height);
  }, [termWidth, termHeight]);
  const lines = children.split('\n');
  return (
    <Box ref={ref}>
      <Text wrap="truncate">{lines.slice(-realHeight + 1).join('\n')}</Text>
    </Box>
  );
};

export default Scrollable;
