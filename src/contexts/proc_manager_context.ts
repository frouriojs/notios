import React, { useContext } from 'react';
import type { ProcManager } from '../utils/proc_manager.js';

export type ProcManagerContextValue = ProcManager;

const createProcManagerContext = (): React.Context<ProcManagerContextValue> => {
  return React.createContext<ProcManagerContextValue>(undefined as any);
};

export const procManagerContext = createProcManagerContext();
export const useProcManagerContext = (): ProcManagerContextValue => useContext(procManagerContext);
