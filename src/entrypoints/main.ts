import { setupArgs } from '../bootstraps/args';
import { setupIpc } from '../bootstraps/ipc';
import { setupUi } from '../bootstraps/ui';
import { catchWithHint } from '../utils/error';
import { createProcManager } from '../utils/proc_manager';

catchWithHint(() => {
  const procManager = createProcManager();
  setupIpc({ procManager });
  const uiOptions = setupArgs();
  setupUi({ procManager, uiOptions });
});
