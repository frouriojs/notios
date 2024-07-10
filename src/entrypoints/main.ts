import sourceMapSupport from 'source-map-support';
import { setupArgs } from '../bootstraps/args.js';
import initiateProcManager from '../bootstraps/initiate_proc_manager.js';
import { setupIpc } from '../bootstraps/ipc.js';
import { setupNotiosConfig } from '../bootstraps/notios_config.js';
import { exitNotios, setupTerminal } from '../bootstraps/terminal.js';
import { setupUi } from '../bootstraps/ui.js';
import { catchWithHint } from '../utils/error.js';

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
