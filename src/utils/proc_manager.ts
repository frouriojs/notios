import type childProcess from 'child_process';
import cp from 'cross-spawn';
import tty from 'tty';
import { envVarNames } from '../constants/ipc';

export type ProcStatus = 'waiting' | 'running' | 'finished';

export interface ProcOwn {
  readonly command: string;
  readonly cwd: string;
  readonly npmPath: string;
}

export interface ProcOwnInternal {
  command: string;
  cwd: string;
  npmPath: string;
  $raw?: childProcess.ChildProcessWithoutNullStreams;
}

export type ProcNodeType = 'none' | 'serial' | 'parallel';

export interface ProcNode {
  readonly name: string;
  readonly type: ProcNodeType;
  readonly parent?: ProcNode;
  readonly own?: ProcOwn;
  readonly exitCode?: number | null;
  readonly children: readonly ProcNode[];
  readonly token: string;
  readonly status: ProcStatus;
  readonly log: string;
  readonly addUpdateListener: AddUpdateListener;
  readonly removeUpdateListener: RemoveUpdateListener;
}

export interface ProcNodeInternal {
  name: string;
  type: ProcNodeType;
  parent?: ProcNodeInternal;
  own?: ProcOwnInternal;
  children: ProcNodeInternal[];
  token: string;
  status: ProcStatus;
  exitCode?: number | null;
  log: string;
  npmPath?: string;
  addUpdateListener: AddUpdateListener;
  removeUpdateListener: RemoveUpdateListener;
  $notifyUpdate: (newLog: string) => void;
}
export type ProcNodeInternalInitial = Omit<
  ProcNodeInternal,
  'token' | 'addUpdateListener' | 'removeUpdateListener' | '$notifyUpdate'
>;
export type FindNodeByToken = (token?: string | undefined) => ProcNode | undefined;
export type FindNodeByTokenInternal = (token?: string | undefined) => ProcNodeInternal | undefined;

export type CreateNodeParams = Omit<
  ProcNode,
  'parent' | 'children' | 'token' | 'addUpdateListener' | 'removeUpdateListener' | 'log'
> & { parentToken?: string | undefined };

export type CreateNode = (createNodeParams: CreateNodeParams) => ProcNode | null;
export type RestartNode = (node?: ProcNode | null | undefined) => void;
export type UpdateListener = () => void;
export type AddUpdateListener = (updateListener: UpdateListener) => void;
export type RemoveUpdateListener = (updateListener: UpdateListener) => void;

export interface ProcManager {
  readonly createNode: CreateNode;
  readonly restartNode: RestartNode;
  readonly rootNode: ProcNode;
  readonly addUpdateListener: AddUpdateListener;
  readonly removeUpdateListener: RemoveUpdateListener;
  readonly findNodeByToken: FindNodeByToken;
}

export interface CreateProcManagerParams {
  forceNoColor: boolean;
}
export const createProcManager = ({ forceNoColor }: CreateProcManagerParams): ProcManager => {
  const $updateListenerSet = new Set<UpdateListener>();
  // Call when tree structure changed.
  const $notifyUpdate = (): void => {
    [...$updateListenerSet].forEach((listener) => {
      listener();
    });
  };

  const $tokenToNodeMap = new Map<string, ProcNodeInternal>();
  const $checkSerial = (node: ProcNodeInternalInitial) => {
    if (node.status === 'running' && node.type === 'serial' && node.children.length > 0) {
      if (node.children[0].status === 'waiting') {
        $startRunning(node.children[0]);
      } else {
        for (let i = 0; i + 1 < node.children.length; i += 1) {
          if (node.children[i].status === 'finished' && node.children[i + 1].status === 'waiting') {
            $startRunning(node.children[i + 1]);
          }
        }
      }
    }
  };

  const $createNode = (nodeInitial: ProcNodeInternalInitial): ProcNodeInternal => {
    const $updateListenerSet = new Set<UpdateListener>();
    const addUpdateListener: AddUpdateListener = (listener) => {
      $updateListenerSet.add(listener);
    };
    const removeUpdateListener: RemoveUpdateListener = (listener) => {
      $updateListenerSet.delete(listener);
    };
    const token = (() => {
      while (true) {
        const tmpToken = Math.random().toString().slice(2, 14);
        if ($tokenToNodeMap.has(tmpToken)) continue;
        return tmpToken;
      }
    })();
    const node: ProcNodeInternal = {
      ...nodeInitial,
      addUpdateListener,
      removeUpdateListener,
      token,
      $notifyUpdate: (newLog: string): void => {
        [...$updateListenerSet].forEach((listener) => {
          listener();
        });
        if (node.children.length > 0) {
          node.status = (() => {
            const statuses = node.children.map((child) => child.status);
            const allFinished = Math.max(...statuses.map((s) => (s === 'finished' ? 0 : 1))) === 0;
            const allWaiting = Math.max(...statuses.map((s) => (s === 'waiting' ? 0 : 1))) === 0;
            if (allFinished) return 'finished';
            if (allWaiting) return 'waiting';
            return 'running';
          })();
          node.exitCode = node.children.reduce((accum, n) => accum || n.exitCode, null as null | number | undefined);
        }
        node.log += newLog;
        $checkSerial(node);

        node.parent?.$notifyUpdate(newLog);
      },
    };
    $tokenToNodeMap.set(token, node);
    return node;
  };

  const rootNode = $createNode({
    name: '<root>',
    status: 'waiting',
    type: 'none',
    log: '',
    children: [],
  });

  const findNodeByToken: FindNodeByTokenInternal = (token) => {
    if (typeof token === 'string') {
      return $tokenToNodeMap.get(token);
    }
    return rootNode;
  };

  const $startRunning = (node: ProcNodeInternal) => {
    node.status = 'running';
    if (!node.own) {
      $checkSerial(node);
      return;
    }
    const nodeStdout = $createNode({
      name: '<out>',
      status: 'running',
      type: 'none',
      log: '',
      children: [],
    });
    const nodeStderr = $createNode({
      name: '<err>',
      status: 'running',
      type: 'none',
      log: '',
      children: [],
    });
    node.children = [nodeStdout, nodeStderr, ...node.children];
    nodeStdout.parent = node;
    nodeStderr.parent = node;
    $notifyUpdate();

    const isColorSupported =
      !('NO_COLOR' in process.env || forceNoColor) &&
      ('FORCE_COLOR' in process.env ||
        process.platform === 'win32' ||
        (tty.isatty(1) && process.env.TERM !== 'dumb') ||
        'CI' in process.env);

    const p = cp.spawn(node.own.npmPath, ['run', node.name], {
      stdio: ['pipe', 'pipe', 'pipe'],
      cwd: node.own.cwd,
      env: {
        ...process.env,
        ...(isColorSupported
          ? {
              npm_config_color: 'always',
              NO_COLOR: undefined,
              FORCE_COLOR: 'true',
              CARGO_TERM_COLOR: 'always',
            }
          : {
              npm_config_color: 'false',
              NO_COLOR: 'true',
              FORCE_COLOR: '0',
              CARGO_TERM_COLOR: 'none',
            }),
        [envVarNames.rootToken]: rootNode.token,
        [envVarNames.parentToken]: node.token,
      },
    });
    node.own.$raw = p;

    node.$notifyUpdate('');

    p.stdout.on('data', (buf) => {
      nodeStdout.$notifyUpdate(buf.toString());
    });
    p.stderr.on('data', (buf) => {
      nodeStderr.$notifyUpdate(buf.toString());
    });
    p.on('exit', (exitCode) => {
      nodeStdout.status = 'finished';
      nodeStderr.status = 'finished';
      nodeStdout.exitCode = exitCode;
      nodeStderr.exitCode = exitCode;
      nodeStdout.$notifyUpdate('');
      nodeStderr.$notifyUpdate('');
    });
  };

  const createNode: CreateNode = ({ parentToken, ...params }) => {
    // Just ignore if spawn request is from older world.
    const parentNode: ProcNodeInternal | undefined = findNodeByToken(parentToken);
    if (parentNode == null) return null;

    const node = $createNode({
      ...params,
      log: '',
      children: [],
    });

    parentNode.children.push(node);
    node.parent = parentNode;

    if (params.own && params.status === 'running') {
      $startRunning(node);
    }
    return node;
  };
  const addUpdateListener: AddUpdateListener = (listener) => {
    $updateListenerSet.add(listener);
  };
  const removeUpdateListener: RemoveUpdateListener = (listener) => {
    $updateListenerSet.delete(listener);
  };

  const restartNode: RestartNode = (node) => {
    if (!node) return;
    const inode: ProcNodeInternal = node as any;
    if (!inode.own) return;
    if (inode.status !== 'finished') return;
    inode.children = [];
    inode.log += '\n\nRestarting...\n';
    $startRunning(inode);
  };

  return {
    createNode,
    restartNode,
    rootNode,
    addUpdateListener,
    removeUpdateListener,
    findNodeByToken,
  };
};
