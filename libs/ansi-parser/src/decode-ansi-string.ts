import type { AnsiAction } from '../interfaces/ansi-action';
import type { AnsiParser } from '../interfaces/ansi-parser';
import decodeAnsiByte from './decode-ansi-byte';

const decodeAnsiString = (
  parser: AnsiParser,
  str: string,
): [newParser: AnsiParser, actions: readonly AnsiAction[]] => {
  let p = parser;
  const actions = [...str]
    .map((c) => {
      const code = c.charCodeAt(0);
      // Decoder treats codes later than 0xff speacially.
      // ASCII and Unicode shares codes not more than 0xff.
      const [newParser, action] = decodeAnsiByte(p, code);
      p = newParser;
      return action;
    })
    .filter((a) => a.actionType !== 'noop');
  return [p, actions];
};

export default decodeAnsiString;
