import React, { useContext } from 'react';
import type { UiOptions } from '../interfaces/ui_options';

export type UiOptionsContextValue = UiOptions;

const createUiOptionsContext = (): React.Context<UiOptionsContextValue> => {
  return React.createContext<UiOptionsContextValue>(undefined as any);
};

export const uiOptionsContext = createUiOptionsContext();
export const useUiOptionsContext = (): UiOptionsContextValue => useContext(uiOptionsContext);
