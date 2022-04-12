import { expect, test } from 'vitest';
import decodeAnsiBytes from '../src/decode-ansi-bytes';
import defaultAnsiParser from '../src/default-ansi-parser';

type Case = {
  s: string;
};

const ESC = '\x1b';
const CSI = `${ESC}[`;

const cases: Case[] = [
  {
    s: `${CSI}X`,
  },
  {
    s: `${CSI}[`,
  },
  {
    s: `${CSI}]`,
  },
  {
    s: `${CSI}${CSI}`,
  },
  {
    s: `${CSI}11111m`,
  },
  {
    s: `${CSI};m`,
  },
  {
    s: `${CSI};;m`,
  },
  {
    s: `${CSI};;;m`,
  },
  {
    s: `${CSI};;;;m`,
  },
  {
    s: `${CSI};;;;;m`,
  },
  {
    s: `${CSI};;[`,
  },
  {
    s: `${CSI};;B`,
  },
  {
    s: `${CSI};;H`,
  },
  {
    s: `${CSI}38;2;256;0;0m`,
  },
  {
    s: `${CSI}38;2;0;256;0m`,
  },
  {
    s: `${CSI}38;2;0;0;256m`,
  },
  {
    s: `${CSI}38;2;1000;0;0m`,
  },
  {
    s: `${CSI}38;2;0;1000;0m`,
  },
  {
    s: `${CSI}38;2;0;0;1000m`,
  },
  {
    s: `${CSI}38;;0;0;0m`,
  },
  {
    s: `${CSI}38;;0m`,
  },
  {
    s: `${CSI}38;2;;;m`,
  },
  {
    s: `${CSI}38;2;;;;m`,
  },
];

test.each(cases)('Unknown(unimplemented/unsupported) sequences', ({ s }) => {
  const sbs = [...s].map((c) => c.charCodeAt(0));
  const sas = decodeAnsiBytes(defaultAnsiParser(), Uint8Array.from(sbs))[1];
  expect(sas, `s=${JSON.stringify(s)}`).toEqual([
    {
      actionType: 'unknown',
      unknownBytes: expect.anything(),
    },
  ]);
});
