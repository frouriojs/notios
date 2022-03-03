import React, { useContext, useState } from 'react';

const initialPage = 'select-script';
export type Page = 'select-script' | 'tree-procs' | 'inspect-proc';
export type PageContextValue = {
  page: Page;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
};

export const usePageContextDefaultValue = (): PageContextValue => {
  const [page, setPage] = useState<Page>(initialPage);
  return { page, setPage };
};

const createPageContext = (): React.Context<PageContextValue> => {
  return React.createContext<PageContextValue>(undefined as any);
};

export const pageContext = createPageContext();
export const usePageContext = (): PageContextValue => useContext(pageContext);
