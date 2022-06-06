import sourceMapSupport from 'source-map-support';
import { setupArgs } from '../bootstraps/args';
import initiateProcManager from '../bootstraps/initiate_proc_manager';
import { setupIpc } from '../bootstraps/ipc';
import { setupNotiosConfig } from '../bootstraps/notios_config';
import { exitNotios, setupTerminal } from '../bootstraps/terminal';
import { setupUi } from '../bootstraps/ui';
import { catchWithHint } from '../utils/error';

sourceMapSupport.install();

catchWithHint(() => {
  const uiOptions = setupArgs();
  const notiosConfig = setupNotiosConfig({ uiOptions });
  const procManager = initiateProcManager({ uiOptions, notiosConfig });

  // For situatinos like killed by kill command,
  // but this does not work properly.
  // CTRL-C (default) is controlled in the other place.
  process.once('SIGINT', () => {
    procManager.killAllNode(procManager.rootNode);
    exitNotios();
  });

  setupIpc({ procManager });
  setupTerminal();
  setupUi({ procManager, uiOptions, notiosConfig });
});
