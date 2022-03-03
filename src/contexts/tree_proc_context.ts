import React, { useContext, useState } from 'react';

export type TreeProcContextValue = {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  openMap: Record<string, boolean>;
  setOpenMap: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
};

export const useTreeProcContextDefaultValue = (): TreeProcContextValue => {
  const [index, setIndex] = useState(0);
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  return { index, setIndex, openMap, setOpenMap };
};

const createTreeProcContext = (): React.Context<TreeProcContextValue> => {
  return React.createContext<TreeProcContextValue>(undefined as any);
};

export const treeProcContext = createTreeProcContext();
export const useTreeProcContext = (): TreeProcContextValue => useContext(treeProcContext);
