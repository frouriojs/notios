// TODO(test): test is needed

import { Key } from 'ink';
import {
  NotiosConfigActionKeymapping,
  NotiosConfigActionKeymappings,
  NotiosConfigKeymapping,
  NotiosConfigKeymappingRoot,
} from '../../libs/notios-config/src/interfaces/notios-config';
import { specialKeyNames } from '../../libs/notios-config/src/special_key_names';

type KeymappingNode = {
  children: Map<string, KeymappingNode>;
  action?: string;
};

const keymappingToString = (keymapping: NotiosConfigKeymapping) => {
  switch (keymapping.type) {
    case 'char':
      return (
        keymapping.char + (keymapping.ctrl ? 'c' : '-') + (keymapping.meta ? 'm' : '-') + (keymapping.shift ? 's' : '-')
      );
    case 'special':
      return keymapping.special + ';' + (keymapping.ctrl ? 'c' : '-') + (keymapping.shift ? 's' : '-');
  }
};

export const keymappingToRepr = (keymapping: NotiosConfigKeymapping) => {
  switch (keymapping.type) {
    case 'char':
      return (
        (keymapping.ctrl ? 'C-' : '') + (keymapping.meta ? 'M-' : '') + (keymapping.shift ? 'S-' : '') + keymapping.char
      );
    case 'special':
      return (keymapping.ctrl ? 'C-' : '') + (keymapping.shift ? 'S-' : '') + keymapping.special;
  }
};

const toSeq = (keymappingRoot: NotiosConfigKeymappingRoot) => {
  const seq = keymappingRoot.type === 'seq' ? keymappingRoot.seq : [keymappingRoot];
  return seq;
};

export const constructKeymapping = (actionKeymappings: NotiosConfigActionKeymappings<string>) => {
  const trie: KeymappingNode = { children: new Map() };

  const sortedSeqEntries = (() => {
    const entries = Object.entries(actionKeymappings).filter(
      (entry): entry is [string, NotiosConfigActionKeymapping] => {
        return entry[1] != null;
      },
    );
    const pairs = entries.flatMap(([action, actionKeymapping]) =>
      actionKeymapping.map((keymapping) => [action, toSeq(keymapping)] as const),
    );
    const sorted = pairs.sort(([, seqA], [, seqB]) => {
      return seqA.length - seqB.length;
    });
    return sorted;
  })();
  for (const [action, seq] of sortedSeqEntries) {
    if (seq.length === 0) {
      throw new Error(`Keymap for action "${action}" is zero-length sequential, which is not allowed.`);
    }
    let cur = trie;
    for (const one of seq) {
      const key = keymappingToString(one);
      const child = cur.children.get(key);
      if (child == null) {
        const newChild: KeymappingNode = { children: new Map() };
        cur.children.set(key, newChild);
        cur = newChild;
      } else {
        cur = child;
      }
      if (cur.action != null) {
        throw new Error(
          `Keymap for action "${action}" [${seq
            .map((e) => keymappingToRepr(e))
            .join(' ')}] including keymap for action "${cur.action}".`,
        );
      }
    }
    cur.action = action;
  }
  return trie;
};

export const matchKeymapping = (
  trie: KeymappingNode,
  input: string,
  key: Key,
): [next: KeymappingNode | undefined, matched: string | undefined] => {
  const sub = {
    ctrl: key.ctrl,
    meta: key.meta,
    shift: key.shift,
  } as const;

  const k = (() => {
    {
      // TODO: dirty monkey patch for ink
      const sub2 = {
        ctrl: input.startsWith('[1;5') || input.startsWith('[1;6'),
        shift: input.startsWith('[1;2') || input.startsWith('[1;6'),
      };
      if (input === '[1~') {
        // home
        return keymappingToString({
          ...sub2,
          type: 'special',
          special: 'home',
        });
      }
      if (input === '[4~') {
        // end
        return keymappingToString({
          ...sub2,
          type: 'special',
          special: 'end',
        });
      }
      if (sub2.ctrl || sub2.shift) {
        if (input.endsWith('H')) {
          // home
          return keymappingToString({
            ...sub2,
            type: 'special',
            special: 'home',
          });
        }
        if (input.endsWith('F')) {
          // end
          return keymappingToString({
            ...sub2,
            type: 'special',
            special: 'end',
          });
        }
        if (input.endsWith('D')) {
          // left
          return keymappingToString({
            ...sub2,
            type: 'special',
            special: 'leftArrow',
          });
        }
        if (input.endsWith('B')) {
          // down
          return keymappingToString({
            ...sub2,
            type: 'special',
            special: 'downArrow',
          });
        }
        if (input.endsWith('C')) {
          // right
          return keymappingToString({
            ...sub2,
            type: 'special',
            special: 'rightArrow',
          });
        }
        if (input.endsWith('A')) {
          // up
          return keymappingToString({
            ...sub2,
            type: 'special',
            special: 'upArrow',
          });
        }
      }
    }

    for (const specialKeyName of specialKeyNames) {
      if (key[specialKeyName]) {
        return keymappingToString({
          ...sub,
          type: 'special',
          special: specialKeyName,
        });
      }
    }

    return keymappingToString({
      ...sub,
      type: 'char',
      char: input.toLowerCase() as any,
    });
  })();

  const next = trie.children.get(k);
  if (next == null) {
    return [undefined, undefined];
  } else {
    if (next.action != null) {
      return [undefined, next.action];
    } else {
      return [next, undefined];
    }
  }
};
