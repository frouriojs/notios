import { expect, test } from 'vitest';
import { AnsiAction } from '../interfaces/ansi-action';
import decodeAnsiBytes from '../src/decode-ansi-bytes';
import defaultAnsiParser from '../src/default-ansi-parser';

type Case = {
  s: string;
  action: AnsiAction;
};

const ESC = '\x1b';
const CSI = `${ESC}[`;

const cases: Case[] = [
  {
    s: `${CSI}3A`,
    action: {
      actionType: 'cuu',
      cells: '3',
    },
  },
  {
    s: `${CSI}B`,
    action: {
      actionType: 'cud',
      cells: '',
    },
  },
  {
    s: `${CSI}0C`,
    action: {
      actionType: 'cuf',
      cells: '0',
    },
  },
  {
    s: `${CSI}1938D`,
    action: {
      actionType: 'cub',
      cells: '1938',
    },
  },
  {
    s: `${CSI}H`,
    action: {
      actionType: 'cup',
      row: '',
      column: null,
    },
  },
  {
    s: `${CSI};H`,
    action: {
      actionType: 'cup',
      row: '',
      column: '',
    },
  },
  {
    s: `${CSI}123;0456H`,
    action: {
      actionType: 'cup',
      row: '123',
      column: '456',
    },
  },
  {
    s: `${CSI}30m`,
    action: {
      actionType: 'fg_color',
      fgColor: {
        colorType: '4bit',
        color4bitType: 'standard',
        colorName: 'black',
      },
    },
  },
  {
    s: `${CSI}38;2;255;254;253m`,
    action: {
      actionType: 'fg_color',
      fgColor: {
        colorType: '24bit',
        r: 255,
        g: 254,
        b: 253,
      },
    },
  },
  {
    s: `${CSI}48;2;0;0;000m`,
    action: {
      actionType: 'bg_color',
      bgColor: {
        colorType: '24bit',
        r: 0,
        g: 0,
        b: 0,
      },
    },
  },
  {
    s: `${CSI}39m`,
    action: {
      actionType: 'fg_color',
      fgColor: {
        colorType: 'default',
      },
    },
  },
  {
    s: `${CSI}49m`,
    action: {
      actionType: 'bg_color',
      bgColor: {
        colorType: 'default',
      },
    },
  },
  {
    s: `${CSI}38;5;0m`,
    action: {
      actionType: 'fg_color',
      fgColor: {
        colorType: '8bit',
        color8bitType: 'standard',
        colorName: 'black',
      },
    },
  },
  {
    s: `${CSI}38;5;8m`,
    action: {
      actionType: 'fg_color',
      fgColor: {
        colorType: '8bit',
        color8bitType: 'high_intensity',
        colorName: 'black',
      },
    },
  },
  {
    s: `${CSI}38;5;16m`,
    action: {
      actionType: 'fg_color',
      fgColor: {
        colorType: '8bit',
        color8bitType: 'rgb',
        r: 0,
        g: 0,
        b: 0,
      },
    },
  },
  {
    s: `${CSI}38;5;231m`,
    action: {
      actionType: 'fg_color',
      fgColor: {
        colorType: '8bit',
        color8bitType: 'rgb',
        r: 5,
        g: 5,
        b: 5,
      },
    },
  },
  {
    s: `${CSI}38;5;232m`,
    action: {
      actionType: 'fg_color',
      fgColor: {
        colorType: '8bit',
        color8bitType: 'grayscale',
        lightness: 0,
      },
    },
  },
  {
    s: `${CSI}38;5;255m`,
    action: {
      actionType: 'fg_color',
      fgColor: {
        colorType: '8bit',
        color8bitType: 'grayscale',
        lightness: 23,
      },
    },
  },
];

test.each(cases)('Known(implemented/supported) sequences', ({ s, action }) => {
  const sbs = [...s].map((c) => c.charCodeAt(0));
  const sas = decodeAnsiBytes(defaultAnsiParser(), Uint8Array.from(sbs))[1];
  expect(sas, `s=${JSON.stringify(s)}`).toEqual([action]);
});
