import { Box, measureElement } from 'ink';
import React, { useEffect, useRef, useState } from 'react';
import { useTermShapeContext } from '../contexts/term_shape_context';

export type BoxWithSizeProps = Omit<Parameters<typeof Box>[0], 'ref' | 'children'> & {
  children: (size: { height: number; width: number }) => React.ReactNode;
};

export const dump = (obj: unknown) => {
  const fs = require('fs');
  const util = require('util');
  const path = require('path');
  const { homedir } = require('os');
  const debugLogFile = path.resolve(homedir(), 'notios-debug.log');

  fs.appendFileSync(debugLogFile, `${new Date().toLocaleTimeString()}: ${util.inspect(obj)}\n`);
};

const BoxWithSize = ({ children, ...rest }: BoxWithSizeProps) => {
  const ref = useRef<any>(null);
  const [realHeight, setRealHeight] = useState(1);
  const [realWidth, setRealWidth] = useState(1);
  const { termWidth, termHeight } = useTermShapeContext();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!ref.current) return;
      const { width, height } = measureElement(ref.current);
      if (!Number.isNaN(width)) {
        setRealWidth(width);
        setRealHeight(height);
        clearInterval(interval);
      }
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, [termWidth, termHeight]);
  return (
    <Box
      {...{
        ...rest,
        children: children?.({
          width: realWidth,
          height: realHeight,
        }),
      }}
      ref={ref}
    />
  );
};

export default BoxWithSize;
