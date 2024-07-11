import { Box } from 'ink';
import type { FC } from 'react';
import React from 'react';
import { useTermShapeContext } from '../contexts/term_shape_context';

interface GlobalWrapperProps {
  children: React.ReactNode;
}
const GlobalWrapper: FC<GlobalWrapperProps> = ({ children }) => {
  const { termHeight } = useTermShapeContext();
  return (
    <Box flexDirection="column" height={termHeight}>
      {children}
    </Box>
  );
};

export default GlobalWrapper;
