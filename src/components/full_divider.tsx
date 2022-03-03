import { Box, measureElement } from 'ink';
import Divider from 'ink-divider';
import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { useTermShapeContext } from '../contexts/term_shape_context';

const FullDivider: FC = () => {
  const { termWidth, termHeight } = useTermShapeContext();
  const [realWidth, setRealWidth] = useState(50);
  const ref = useRef(null);
  useEffect(() => {
    const { width } = measureElement(ref.current as any);
    setRealWidth(width);
  }, [termWidth, termHeight]);
  return (
    <Box ref={ref} width="100%">
      <Divider width={Math.max(realWidth - 5, 1)} />
    </Box>
  );
};

export default FullDivider;
