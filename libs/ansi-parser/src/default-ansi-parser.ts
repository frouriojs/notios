import { AnsiParser } from '../interfaces/ansi-parser';

export const defaultAnsiParser = (): AnsiParser => {
  return {
    waitingBytes: Uint8Array.from([]),
  };
};

export default defaultAnsiParser;
