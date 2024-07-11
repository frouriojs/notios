import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import BoxWithSize from './box_with_size';

export interface FullDividerProps {
  title?: string;
  dividerChar?: string;
  dividerColor?: string;
}
const FullDivider: FC<FullDividerProps> = ({ title, dividerChar, dividerColor }) => {
  const [Divider, setDivider] = useState<FC<any>>();

  useEffect(() => {
    import('ink-divider').then(setDivider);
  }, []);

  return (
    <BoxWithSize>
      {({ width }) =>
        Divider && (
          <Divider title={title} dividerChar={dividerChar} dividerColor={dividerColor} width={Math.max(width - 5, 1)} />
        )
      }
    </BoxWithSize>
  );
};

export default FullDivider;
