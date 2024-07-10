import type { FC } from 'react';
import React, { useEffect, useMemo } from 'react';
import { NotiosConfigV1 } from '../../libs/notios-config/src/interfaces/notios-config.js';
import { inspectContext, useInspectContextDefaultValue } from '../contexts/inspect_context.js';
import { notiosConfigContext, NotiosConfigContextValue } from '../contexts/notios_config_context.js';
import { pageContext, usePageContextDefaultValue } from '../contexts/page_context.js';
import { procManagerContext } from '../contexts/proc_manager_context.js';
import { termShapeContext, useTermShapeContextDefaultValue } from '../contexts/term_shape_context.js';
import { treeProcContext, useTreeProcContextDefaultValue } from '../contexts/tree_proc_context.js';
import { uiOptionsContext } from '../contexts/ui_options_context.js';
import useAction from '../hooks/use_action.js';
import type { UiOptions } from '../interfaces/ui_options.js';
import InspectProc from '../pages/inspect_proc.js';
import SelectScript from '../pages/select_script.js';
import TreeProcs from '../pages/tree_procs.js';
import type { ProcManager } from '../utils/proc_manager.js';
import GlobalWrapper from './global_wrapper.js';

export interface AppProps {
  uiOptions: UiOptions;
  procManager: ProcManager;
  notiosConfig: NotiosConfigV1;
  onExit?: () => void;
}
const App: FC<AppProps> = ({ uiOptions, procManager, notiosConfig, onExit }) => {
  const notiosConfigContextValue: NotiosConfigContextValue = {
    notiosConfig,
  };
  const termShapeContextValue = useTermShapeContextDefaultValue();
  const treeProcContextValue = useTreeProcContextDefaultValue();
  const inspectContextValue = useInspectContextDefaultValue();
  const pageContextValue = usePageContextDefaultValue();
  const { page, setPage } = pageContextValue;

  useAction({
    page: 'common',
    actionMaps: {
      help: () => {},
      exit: () => {
        onExit?.();
      },
    },
    notiosConfig,
  });

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
