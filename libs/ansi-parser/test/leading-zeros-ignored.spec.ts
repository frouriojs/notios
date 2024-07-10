import { expect, test } from 'vitest';
import decodeAnsiBytes from '../src/decode-ansi-bytes.js';
import defaultAnsiParser from '../src/default-ansi-parser.js';

type SameCheckCase = {
  s: string;
  t: string;
};

const ESC = '\x1b';
const CSI = `${ESC}[`;

const cases: SameCheckCase[] = [
  {
    s: `${CSI}9A`,
    t: `${CSI}09A`,
  },
  {
    s: `${CSI}0A`,
    t: `${CSI}00A`,
  },
  {
    s: `${CSI}908;00760H`,
    t: `${CSI}0908;760H`,
  },
  {
    s: `${CSI}0;0H`,
    t: `${CSI}00;00H`,
  },
  {
    s: `${CSI}0;0f`,
    t: `${CSI}00;00f`,
  },
  {
    s: `${CSI};000H`,
    t: `${CSI};0H`,
  },
  {
    s: `${CSI};000f`,
    t: `${CSI};0f`,
  },
  {
    s: `${CSI}36m`,
    t: `${CSI}036m`,
  },
  {
    s: `${CSI}36m`,
    t: `${CSI}0036m`,
  },
  {
    s: `${CSI}36m`,
    t: `${CSI}0036m`,
  },
  {
    s: `${CSI}5i`,
    t: `${CSI}05i`,
  },
  {
    s: `${CSI}38;5;40m`,
    t: `${CSI}0038;005;0040m`,
  },
  {
    s: `${CSI}38;2;1;10;100m`,
    t: `${CSI}038;002;001;010;100m`,
  },
  {
    s: `${CSI}48;005;00200m`,
    t: `${CSI}48;5;200m`,
  },
  {
    s: `${CSI}48;2;10;010;100m`,
    t: `${CSI}48;02;010;10;100m`,
  },
];

test.each(cases)('Leading zeros ignored', ({ s, t }) => {
  const tbs = [...t].map((c) => c.charCodeAt(0));
  const sbs = [...s].map((c) => c.charCodeAt(0));
  const tas = decodeAnsiBytes(defaultAnsiParser(), Uint8Array.from(tbs))[1];
  const sas = decodeAnsiBytes(defaultAnsiParser(), Uint8Array.from(sbs))[1];
  expect(tas, `s=${JSON.stringify(s)};t=${JSON.stringify(t)}`).toEqual(sas);
});
