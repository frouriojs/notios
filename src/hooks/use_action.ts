import { useInput } from 'ink';
import { useMemo, useState } from 'react';
import { NotiosConfig } from '../../libs/notios-config/interfaces/notios-config';
import { ActionablePage, pageActions } from '../../libs/notios-config/src/action_definitions';
import { constructKeymapping, matchKeymapping } from '../utils/keymapping';

type ActionImpl = () => void;

export type UseActionParams<T extends ActionablePage> = {
  page: T;
  actionMaps: Record<keyof typeof pageActions[T] | 'help', ActionImpl>;
  notiosConfig: NotiosConfig;
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
