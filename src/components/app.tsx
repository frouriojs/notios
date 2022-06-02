import type { FC } from 'react';
import React, { useEffect, useMemo } from 'react';
import { NotiosConfigV1 } from '../../libs/notios-config/src/interfaces/notios-config';
import { inspectContext, useInspectContextDefaultValue } from '../contexts/inspect_context';
import { notiosConfigContext, NotiosConfigContextValue } from '../contexts/notios_config_context';
import { pageContext, usePageContextDefaultValue } from '../contexts/page_context';
import { procManagerContext } from '../contexts/proc_manager_context';
import { termShapeContext, useTermShapeContextDefaultValue } from '../contexts/term_shape_context';
import { treeProcContext, useTreeProcContextDefaultValue } from '../contexts/tree_proc_context';
import { uiOptionsContext } from '../contexts/ui_options_context';
import type { UiOptions } from '../interfaces/ui_options';
import InspectProc from '../pages/inspect_proc';
import SelectScript from '../pages/select_script';
import TreeProcs from '../pages/tree_procs';
import type { ProcManager } from '../utils/proc_manager';
import GlobalWrapper from './global_wrapper';

export interface AppProps {
  uiOptions: UiOptions;
  procManager: ProcManager;
  notiosConfig: NotiosConfigV1;
}
const App: FC<AppProps> = ({ uiOptions, procManager, notiosConfig }) => {
  const notiosConfigContextValue: NotiosConfigContextValue = {
    notiosConfig,
  };
  const termShapeContextValue = useTermShapeContextDefaultValue();
  const treeProcContextValue = useTreeProcContextDefaultValue();
  const inspectContextValue = useInspectContextDefaultValue();
  const pageContextValue = usePageContextDefaultValue();
  const { page, setPage } = pageContextValue;

  useEffect(() => {
    if (procManager.rootNode.children.length > 0) {
      setPage('tree-procs');
    }
  }, [procManager.rootNode.children.length, setPage]);

  const activePage = useMemo(() => {
    switch (page) {
      case 'tree-procs':
        return <TreeProcs />;
      case 'inspect-proc':
        return <InspectProc />;
      case 'select-script':
        return <SelectScript />;
    }
  }, [page]);

  return (
    <notiosConfigContext.Provider value={notiosConfigContextValue}>
      <termShapeContext.Provider value={termShapeContextValue}>
        <treeProcContext.Provider value={treeProcContextValue}>
          <inspectContext.Provider value={inspectContextValue}>
            <procManagerContext.Provider value={procManager}>
              <uiOptionsContext.Provider value={uiOptions}>
                <pageContext.Provider value={pageContextValue}>
                  <GlobalWrapper>{activePage}</GlobalWrapper>
                </pageContext.Provider>
              </uiOptionsContext.Provider>
            </procManagerContext.Provider>
          </inspectContext.Provider>
        </treeProcContext.Provider>
      </termShapeContext.Provider>
    </notiosConfigContext.Provider>
  );
};

export default App;
