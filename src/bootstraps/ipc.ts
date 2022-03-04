import nodeIpc from 'node-ipc';
import { IPC_CONFIG_NAME } from '../constants/ipc';
import type { IpcRequest } from '../interfaces/ipc_request';
import type { ProcManager } from '../utils/proc_manager';

export interface setupIpcParams {
  procManager: ProcManager;
}
export const setupIpc = ({ procManager }: setupIpcParams): void => {
  nodeIpc.config.id = `${IPC_CONFIG_NAME}-${procManager.rootNode.token}`;
  nodeIpc.config.logger = () => {};
  nodeIpc.serve(() => {
    nodeIpc.server.on(procManager.rootNode.token, (data: IpcRequest, socket) => {
      if (data.runGroups.length <= 0) return;
      const topNode = procManager.createNode({
        name: `[${data.cliName}] ${data.args.join(' ')}`,
        type: (() => {
          if (data.runGroups.length === 1) {
            return data.runGroups[0].parallel ? 'parallel' : 'serial';
          }
          return 'none';
        })(),
        status: 'waiting',
        parentToken: data.parentToken,
      });
      if (!topNode) return;
      for (const group of data.runGroups) {
        const groupNode = (() => {
          if (data.runGroups.length === 1) {
            return topNode;
          }
          return procManager.createNode({
            name: `${group.parallel ? '<parallel>' : '<serial>'} ${group.patterns.join(' ')}`,
            type: group.parallel ? 'parallel' : 'serial',
            status: 'waiting',
            parentToken: topNode.token,
          });
        })();
        if (!groupNode) return;
        let first = true;
        for (const task of group.runTasks) {
          procManager.createNode({
            name: task.name,
            status: !first && !group.parallel ? 'waiting' : 'running',
            type: 'none',
            own: {
              cwd: data.cwd,
              command: task.command,
              npmPath: data.npmPath ?? data.npmClient,
            },
            parentToken: groupNode.token,
          });
          first = false;
        }
      }
      const listener = () => {
        if (topNode.status === 'finished') {
          nodeIpc.server.emit(socket, 'exit', topNode.exitCode);
          topNode.removeUpdateListener(listener);
        }
      };
      topNode.addUpdateListener(listener);
    });
  });
  nodeIpc.server.start();
};
