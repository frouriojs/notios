import type { AnsiAction } from '../interfaces/ansi-action.js';
import type { AnsiParser } from '../interfaces/ansi-parser.js';
import decodeAnsiByte from './decode-ansi-byte.js';

const decodeAnsiBytes = (
  parser: AnsiParser,
  bytes: Uint8Array,
): [newParser: AnsiParser, actions: readonly AnsiAction[]] => {
  let p = parser;
  const actions = [...bytes]
    .map((byte) => {
      const [newParser, action] = decodeAnsiByte(p, byte);
      p = newParser;
      return action;
    })
    .filter((a) => a.actionType !== 'noop');
  return [p, actions];
};

export default decodeAnsiBytes;
