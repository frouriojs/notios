import React, { useContext, useState } from 'react';

export type TreeProcContextValue = {
  selectedNodeToken: null | string;
  setSelectedNodeToken: React.Dispatch<React.SetStateAction<null | string>>;
  openMap: Record<string, boolean>;
  setOpenMap: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
};

export const useTreeProcContextDefaultValue = (): TreeProcContextValue => {
  const [selectedNodeToken, setSelectedNodeToken] = useState<null | string>(null);
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  return { selectedNodeToken, setSelectedNodeToken, openMap, setOpenMap };
};

const createTreeProcContext = (): React.Context<TreeProcContextValue> => {
  return React.createContext<TreeProcContextValue>(undefined as any);
};

export const treeProcContext = createTreeProcContext();
export const useTreeProcContext = (): TreeProcContextValue => useContext(treeProcContext);
