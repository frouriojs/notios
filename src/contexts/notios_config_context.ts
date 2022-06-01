import React, { useContext } from 'react';
import { NotiosConfig } from '../../libs/notios-config/interfaces/notios-config';

export type NotiosConfigContextValue = {
  notiosConfig: NotiosConfig;
};

const createNotiosConfigContext = (): React.Context<NotiosConfigContextValue> => {
  return React.createContext<NotiosConfigContextValue>(undefined as any);
};

export const notiosConfigContext = createNotiosConfigContext();
export const useNotiosConfigContext = (): NotiosConfigContextValue => useContext(notiosConfigContext);
