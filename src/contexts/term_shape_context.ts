import React, { useContext, useEffect, useState } from 'react';

export type TermShapeContextValue = {
  termHeight: number;
  termWidth: number;
};

export const useTermShapeContextDefaultValue = (): TermShapeContextValue => {
  const [termHeight, setTermHeight] = useState(process.stdout.rows);
  const [termWidth, setTermWidth] = useState(process.stdout.columns);

  useEffect(() => {
    const interval = setInterval(() => {
      setTermHeight(process.stdout.rows);
      setTermWidth(process.stdout.columns);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setTermHeight(process.stdout.rows);
      setTermWidth(process.stdout.columns);
    };
    process.stdout.on('resize', handleResize);
    return () => {
      process.stdout.off('resize', handleResize);
    };
  }, []);

  return { termWidth, termHeight };
};

const createTermShapeContext = (): React.Context<TermShapeContextValue> => {
  return React.createContext<TermShapeContextValue>(undefined as any);
};

export const termShapeContext = createTermShapeContext();
export const useTermShapeContext = (): TermShapeContextValue => useContext(termShapeContext);
