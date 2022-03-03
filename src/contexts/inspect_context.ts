import React, { useContext, useState } from 'react';

export type InspectContextValue = {
  inspectingToken: string;
  setInspectingToken: React.Dispatch<React.SetStateAction<string>>;
};

export const useInspectContextDefaultValue = (): InspectContextValue => {
  const [inspectingToken, setInspectingToken] = useState<string>('');
  return { inspectingToken, setInspectingToken };
};

const createInspectContext = (): React.Context<InspectContextValue> => {
  return React.createContext<InspectContextValue>(undefined as any);
};

export const inspectContext = createInspectContext();
export const useInspectContext = (): InspectContextValue => useContext(inspectContext);
