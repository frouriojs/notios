import Divider from 'ink-divider';
import type { FC } from 'react';
import React from 'react';
import BoxWithSize from './box_with_size.js';

export interface FullDividerProps {
  title?: string;
  dividerChar?: string;
  dividerColor?: string;
}
const FullDivider: FC<FullDividerProps> = ({ title, dividerChar, dividerColor }) => {
  return (
    <BoxWithSize>
      {({ width }) => (
        <Divider title={title} dividerChar={dividerChar} dividerColor={dividerColor} width={Math.max(width - 5, 1)} />
      )}
    </BoxWithSize>
  );
};

export default FullDivider;
