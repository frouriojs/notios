import React, { useContext } from 'react';
import { NotiosConfigV1 } from '../../libs/notios-config/src/interfaces/notios-config';

export type NotiosConfigContextValue = {
  notiosConfig: NotiosConfigV1;
};

const createNotiosConfigContext = (): React.Context<NotiosConfigContextValue> => {
  return React.createContext<NotiosConfigContextValue>(undefined as any);
};

export const notiosConfigContext = createNotiosConfigContext();
export const useNotiosConfigContext = (): NotiosConfigContextValue => useContext(notiosConfigContext);
