import { useInput } from 'ink';
import { useMemo, useState } from 'react';
import { ActionablePage, pageActions } from '../../libs/notios-config/src/action_definitions';
import { NotiosConfigV1 } from '../../libs/notios-config/src/interfaces/notios-config';
import { constructKeymapping, matchKeymapping } from '../utils/keymapping';

export const dump = (obj: unknown) => {
  const fs = require('fs');
  const util = require('util');
  const path = require('path');
  const { homedir } = require('os');
  const debugLogFile = path.resolve(homedir(), 'notios-debug.log');

  fs.appendFileSync(debugLogFile, `${new Date().toLocaleTimeString()}: ${util.inspect(obj)}\n`);
};

type ActionImpl = () => void;

export type UseActionParams<T extends ActionablePage> = {
  page: T;
  actionMaps: Record<keyof typeof pageActions[T] | 'help', ActionImpl>;
  notiosConfig: NotiosConfigV1;
  disabled?: boolean;
};
const useAction = <T extends ActionablePage>({ page, actionMaps, notiosConfig, disabled }: UseActionParams<T>) => {
  const trie = useMemo(() => {
    return constructKeymapping({
      ...notiosConfig.keymappings[page],
      help: [
        {
          type: 'char',
          char: '?',
        },
      ],
    });
  }, [page, actionMaps, notiosConfig]);
  const [cur, setCur] = useState(trie);

  useInput((input, key) => {
    dump({ input, key });
    if (disabled) return;
    const [next, matched] = matchKeymapping(cur, input, key);

    if (next != null) {
      setCur(next);
    } else {
      setCur(trie);
    }

    if (matched != null) {
      ((actionMaps as any)[matched] as ActionImpl)();
    }
  });
};

export default useAction;
