import sourceMapSupport from 'source-map-support';
import { setupArgs } from '../bootstraps/args';
import initiateProcManager from '../bootstraps/initiate_proc_manager';
import { setupIpc } from '../bootstraps/ipc';
import { setupUi } from '../bootstraps/ui';
import { catchWithHint } from '../utils/error';

sourceMapSupport.install();

catchWithHint(() => {
  const uiOptions = setupArgs();
  const procManager = initiateProcManager({ uiOptions });
  setupIpc({ procManager });
  setupUi({ procManager, uiOptions });
});
