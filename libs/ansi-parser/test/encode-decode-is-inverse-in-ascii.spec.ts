import { describe, expect, test } from 'vitest';
import decodeAnsiBytes from '../src/decode-ansi-bytes.js';
import defaultAnsiParser from '../src/default-ansi-parser.js';
import encodeAnsiBytes from '../src/encode-ansi-action.js';

type SimpleCase = {
  s: string;
};

const ESC = '\x1b';
const CSI = `${ESC}[`;

const simpleCases: SimpleCase[] = [
  {
    s: '',
  },
  {
    s: 'abc',
  },
  {
    s: '0',
  },
  {
    s: '[',
  },
  {
    s: 'e[m',
  },
  {
    s: 'a',
  },
  {
    s: '*!()\x00a3\x03\x07\x3e\x9e\x7f\x7e\x3be\x03\xffgi2\xf3\xfe\xee',
  },
  {
    s: CSI,
  },
  {
    s: ESC,
  },
  {
    s: `${CSI}H`,
  },
  {
    s: `${CSI}0H`,
  },
  {
    s: `${CSI};H`,
  },
  {
    s: `a${CSI}32mbc`,
  },
  {
    s: `a${CSI}30m${CSI}48mbc`,
  },
  {
    s: `a${CSI}39mxyz${CSI}49mbc`,
  },
  {
    s: `a${CSI}38m${CSI}0mbc`,
  },
  {
    s: `a${CSI}01234567890mfoo${CSI}xbc`,
  },
  {
    s: `a${ESC}abc${CSI}foeahb${CSI}0123456${ESC}${ESC}78${CSI}${CSI}90mfoo${CSI}9248pc`,
  },
];

const nums0 = Array(301)
  .fill(0)
  .map((_e, i) => i);

describe('decode and encode behaves like as inverse function for ascii strings', () => {
  test.each(simpleCases)('simple cases', ({ s }) => {
    const bytes = [...s].map((c) => c.charCodeAt(0));
    const [newParser, actions0] = decodeAnsiBytes(defaultAnsiParser(), Uint8Array.from(bytes));
    const got: number[] = [];
    actions0.forEach((action) => got.push(...encodeAnsiBytes(action)));
    got.push(...newParser.waitingBytes);
    expect(got, `s=${JSON.stringify(s)}`).toEqual(bytes);
    const [, actions1] = decodeAnsiBytes(defaultAnsiParser(), Uint8Array.from(bytes));
    expect(actions1, `s=${JSON.stringify(s)}`).toEqual(actions0);
  });

  test.each(nums0)('0-300 numbers for SGR', (n) => {
    const bytes = [...`${CSI}${n}m`].map((c) => c.charCodeAt(0));
    const [newParser, actions0] = decodeAnsiBytes(defaultAnsiParser(), Uint8Array.from(bytes));
    const got: number[] = [];
    actions0.forEach((action) => got.push(...encodeAnsiBytes(action)));
    got.push(...newParser.waitingBytes);
    expect(got, `n=${n}`).toEqual(bytes);
    const [, actions1] = decodeAnsiBytes(defaultAnsiParser(), Uint8Array.from(bytes));
    expect(actions1, `n=${n}`).toEqual(actions0);
  });
});
