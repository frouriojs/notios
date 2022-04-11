import type { AnsiAction } from '../interfaces/ansi-action';
import type { AnsiParser } from '../interfaces/ansi-parser';
import { ansiActionControllList } from './controll-actions';
import decodeAnsiColor8bit from './decode-ansi-color-8bit';
import { defaultAnsiParser } from './default-ansi-parser';

// export const defaultAnsiSty = (): AnsiStyleTerminal => {
//   return {
//     cursorVisibility: null,
//     auxPort: null,
//     fgColor: null,
//     bgColor: null,
//     intensity: null,
//     italic: null,
//     underlined: null,
//     blink: null,
//     invert: null,
//     hide: null,
//     strike: null,
//     font: null,
//     doublyUnderlined: null,
//     frame: null,
//     encircled: null,
//     overlined: null,
//     superscript: null,
//     subscript: null,
//     alternatScreen: null,
//   };
// };

const lessThan256 = (n: string) => {
  if (n.length < 3) return true;
  if (n.length > 3) return false;
  return n < '256';
};

const decodeNumberByte = (byte: number): number | null => {
  // 0: 0x30
  // 9: 0x39
  if (0x30 <= byte && byte <= 0x39) return byte - 0x30;
  return null;
};

const decodeIntegerBytes = (bytes: readonly number[]): string => {
  let i = 0;
  while (i < bytes.length && bytes[i] === 0x30) i += 1;
  if (bytes.length >= 1 && bytes.length <= i) return '0';
  bytes = bytes.slice(i);
  return bytes.map((b) => `${b - 0x30}`).join('');
};

const decodeAnsiByte = (parser: AnsiParser, byte: number): readonly [newParser: AnsiParser, action: AnsiAction] => {
  const bytes = Array.from(parser.waitingBytes);
  bytes.push(byte);
  const rbytes = Array.from(parser.waitingBytes);
  const lastByte = bytes[bytes.length - 1];
  if (byte <= 0xff) rbytes.push(byte);
  // ESC
  if (bytes[0] !== 0x1b) {
    if (bytes[0] < 0x20) {
      return [defaultAnsiParser(), ansiActionControllList()[bytes[0]]];
    }
    return [
      defaultAnsiParser(),
      {
        actionType: 'print',
        byte: bytes[0],
      },
    ];
  }
  if (bytes.length <= 1) {
    return [
      {
        waitingBytes: Uint8Array.from(rbytes),
      },
      {
        actionType: 'noop',
      },
    ];
  }
  // CSI
  if (bytes[1] !== 0x5b) {
    // TODO: Escape sequences other than CSI is not implemented.
    if (0x30 <= lastByte && lastByte <= 0x7e) {
      return [
        defaultAnsiParser(),
        {
          actionType: 'unknown',
          unknownBytes: Uint8Array.from(rbytes),
        },
      ];
    }
    return [
      {
        waitingBytes: Uint8Array.from(rbytes),
      },
      {
        actionType: 'noop',
      },
    ];
  }
  // Check whether waiting to be dropped.
  // {
  //   let t = 2;
  //   while (bytes.length > t + 1 && (decodeNumberByte(bytes[t]) !== null || bytes[t] === 0x3b)) t += 1;
  //   if (t + 1 < bytes.length) {
  //     const lastByte = bytes[bytes.length - 1];
  //     if (0x40 <= lastByte && lastByte <= 0x7e) {
  //       return [
  //         defaultAnsiParser(),
  //         {
  //           actionType: 'unknown',
  //           unknownBytes: Uint8Array.from(rbytes),
  //         },
  //       ];
  //     }
  //     return [
  //       {
  //         waitingBytes: Uint8Array.from(rbytes),
  //       },
  //       {
  //         actionType: 'noop',
  //       },
  //     ];
  //   }
  // }

  let p = 2;
  while (bytes.length > p && decodeNumberByte(bytes[p]) !== null) p += 1;
  // [2, p)
  const n = decodeIntegerBytes(bytes.slice(2, p));
  if (bytes.length <= p) {
    if (3 <= bytes.length && 0x40 <= lastByte && lastByte <= 0x7e) {
      return [
        defaultAnsiParser(),
        {
          actionType: 'unknown',
          unknownBytes: Uint8Array.from(rbytes),
        },
      ];
    }
    return [
      {
        waitingBytes: Uint8Array.from(rbytes),
      },
      {
        actionType: 'noop',
      },
    ];
  }
  switch (bytes[p]) {
    case 0x41: // A
      return [
        defaultAnsiParser(),
        {
          actionType: 'cuu',
          cells: n,
        },
      ];
    case 0x42: // B
      return [
        defaultAnsiParser(),
        {
          actionType: 'cud',
          cells: n,
        },
      ];
    case 0x43: // C
      return [
        defaultAnsiParser(),
        {
          actionType: 'cuf',
          cells: n,
        },
      ];
    case 0x44: // D
      return [
        defaultAnsiParser(),
        {
          actionType: 'cub',
          cells: n,
        },
      ];
    case 0x45: // E
      return [
        defaultAnsiParser(),
        {
          actionType: 'cnl',
          cells: n,
        },
      ];
    case 0x46: // F
      return [
        defaultAnsiParser(),
        {
          actionType: 'cpl',
          cells: n,
        },
      ];
    case 0x47: // G
      return [
        defaultAnsiParser(),
        {
          actionType: 'cha',
          column: n,
        },
      ];
    case 0x48: // H
      return [
        defaultAnsiParser(),
        {
          actionType: 'cup',
          row: n,
          column: null,
        },
      ];
    case 0x4a: // J
      switch (n) {
        case '':
        case '0':
        case '1':
        case '2':
        case '3':
          return [
            defaultAnsiParser(),
            {
              actionType: 'ed',
              eraseInDisplayType: n,
            },
          ];
        default:
          return [
            defaultAnsiParser(),
            {
              actionType: 'unknown',
              unknownBytes: Uint8Array.from(rbytes),
            },
          ];
      }
    case 0x4b: // K
      switch (n) {
        case '':
        case '0':
        case '1':
        case '2':
          return [
            defaultAnsiParser(),
            {
              actionType: 'el',
              eraseInLineType: n,
            },
          ];
        default:
          return [
            defaultAnsiParser(),
            {
              actionType: 'unknown',
              unknownBytes: Uint8Array.from(rbytes),
            },
          ];
      }
    case 0x53: // S
      return [
        defaultAnsiParser(),
        {
          actionType: 'su',
          n,
        },
      ];
    case 0x54: // T
      return [
        defaultAnsiParser(),
        {
          actionType: 'sd',
          n,
        },
      ];
    case 0x69: // i
      switch (n) {
        case '4':
          return [
            defaultAnsiParser(),
            {
              actionType: 'aux_port',
              auxPort: false,
            },
          ];
        case '5':
          return [
            defaultAnsiParser(),
            {
              actionType: 'aux_port',
              auxPort: true,
            },
          ];
        default:
          return [
            defaultAnsiParser(),
            {
              actionType: 'unknown',
              unknownBytes: Uint8Array.from(rbytes),
            },
          ];
      }
    case 0x66: // f
      return [
        defaultAnsiParser(),
        {
          actionType: 'hvp',
          horizontal: n,
          vertical: null,
        },
      ];
    case 0x6d: // m
      switch (n) {
        case '':
        case '0':
          return [
            defaultAnsiParser(),
            {
              actionType: 'reset',
            },
          ];
        case '1':
          return [
            defaultAnsiParser(),
            {
              actionType: 'intensity',
              intensity: 'bold',
            },
          ];
        case '2':
          return [
            defaultAnsiParser(),
            {
              actionType: 'intensity',
              intensity: 'dim',
            },
          ];
        case '3':
          return [
            defaultAnsiParser(),
            {
              actionType: 'italic',
              italic: true,
            },
          ];
        case '4':
          return [
            defaultAnsiParser(),
            {
              actionType: 'underline',
              underline: 'single',
            },
          ];
        case '5':
          return [
            defaultAnsiParser(),
            {
              actionType: 'blink',
              blink: 'slow',
            },
          ];
        case '6':
          return [
            defaultAnsiParser(),
            {
              actionType: 'blink',
              blink: 'rapid',
            },
          ];
        case '7':
          return [
            defaultAnsiParser(),
            {
              actionType: 'invert',
              invert: true,
            },
          ];
        case '8':
          return [
            defaultAnsiParser(),
            {
              actionType: 'hide',
              hide: true,
            },
          ];
        case '9':
          return [
            defaultAnsiParser(),
            {
              actionType: 'strike',
              strike: true,
            },
          ];
        case '10':
          return [
            defaultAnsiParser(),
            {
              actionType: 'font',
              font: 'default',
            },
          ];
        case '11':
          return [
            defaultAnsiParser(),
            {
              actionType: 'font',
              font: 1,
            },
          ];
        case '12':
          return [
            defaultAnsiParser(),
            {
              actionType: 'font',
              font: 2,
            },
          ];
        case '13':
          return [
            defaultAnsiParser(),
            {
              actionType: 'font',
              font: 3,
            },
          ];
        case '14':
          return [
            defaultAnsiParser(),
            {
              actionType: 'font',
              font: 4,
            },
          ];
        case '15':
          return [
            defaultAnsiParser(),
            {
              actionType: 'font',
              font: 5,
            },
          ];
        case '16':
          return [
            defaultAnsiParser(),
            {
              actionType: 'font',
              font: 6,
            },
          ];
        case '17':
          return [
            defaultAnsiParser(),
            {
              actionType: 'font',
              font: 7,
            },
          ];
        case '18':
          return [
            defaultAnsiParser(),
            {
              actionType: 'font',
              font: 8,
            },
          ];
        case '19':
          return [
            defaultAnsiParser(),
            {
              actionType: 'font',
              font: 9,
            },
          ];
        case '20':
          return [
            defaultAnsiParser(),
            {
              actionType: 'font',
              font: 'fraktur',
            },
          ];
        case '21':
          return [
            defaultAnsiParser(),
            {
              actionType: 'underline',
              underline: 'double',
            },
          ];
        case '22':
          return [
            defaultAnsiParser(),
            {
              actionType: 'intensity',
              intensity: 'normal',
            },
          ];
        case '23':
          return [
            defaultAnsiParser(),
            {
              actionType: 'italic',
              italic: false,
            },
          ];
        case '24':
          return [
            defaultAnsiParser(),
            {
              actionType: 'underline',
              underline: 'none',
            },
          ];
        case '25':
          return [
            defaultAnsiParser(),
            {
              actionType: 'blink',
              blink: 'off',
            },
          ];
        case '26':
          return [
            defaultAnsiParser(),
            {
              actionType: 'propositional_spacing',
              propositionalSpacing: true,
            },
          ];
        case '27':
          return [
            defaultAnsiParser(),
            {
              actionType: 'invert',
              invert: false,
            },
          ];
        case '28':
          return [
            defaultAnsiParser(),
            {
              actionType: 'hide',
              hide: false,
            },
          ];
        case '29':
          return [
            defaultAnsiParser(),
            {
              actionType: 'strike',
              strike: false,
            },
          ];
        case '30':
          return [
            defaultAnsiParser(),
            {
              actionType: 'fg_color',
              fgColor: {
                colorType: '4bit',
                color4bitType: 'standard',
                colorName: 'black',
              },
            },
          ];
        case '31':
          return [
            defaultAnsiParser(),
            {
              actionType: 'fg_color',
              fgColor: {
                colorType: '4bit',
                color4bitType: 'standard',
                colorName: 'red',
              },
            },
          ];
        case '32':
          return [
            defaultAnsiParser(),
            {
              actionType: 'fg_color',
              fgColor: {
                colorType: '4bit',
                color4bitType: 'standard',
                colorName: 'green',
              },
            },
          ];
        case '33':
          return [
            defaultAnsiParser(),
            {
              actionType: 'fg_color',
              fgColor: {
                colorType: '4bit',
                color4bitType: 'standard',
                colorName: 'yellow',
              },
            },
          ];
        case '34':
          return [
            defaultAnsiParser(),
            {
              actionType: 'fg_color',
              fgColor: {
                colorType: '4bit',
                color4bitType: 'standard',
                colorName: 'blue',
              },
            },
          ];
        case '35':
          return [
            defaultAnsiParser(),
            {
              actionType: 'fg_color',
              fgColor: {
                colorType: '4bit',
                color4bitType: 'standard',
                colorName: 'magenta',
              },
            },
          ];
        case '36':
          return [
            defaultAnsiParser(),
            {
              actionType: 'fg_color',
              fgColor: {
                colorType: '4bit',
                color4bitType: 'standard',
                colorName: 'cyan',
              },
            },
          ];
        case '37':
          return [
            defaultAnsiParser(),
            {
              actionType: 'fg_color',
              fgColor: {
                colorType: '4bit',
                color4bitType: 'standard',
                colorName: 'white',
              },
            },
          ];
        case '38':
          break;
        case '39':
          return [
            defaultAnsiParser(),
            {
              actionType: 'fg_color',
              fgColor: {
                colorType: 'default',
              },
            },
          ];
        case '40':
          return [
            defaultAnsiParser(),
            {
              actionType: 'bg_color',
              bgColor: {
                colorType: '4bit',
                color4bitType: 'standard',
                colorName: 'black',
              },
            },
          ];
        case '41':
          return [
            defaultAnsiParser(),
            {
              actionType: 'bg_color',
              bgColor: {
                colorType: '4bit',
                color4bitType: 'standard',
                colorName: 'red',
              },
            },
          ];
        case '42':
          return [
            defaultAnsiParser(),
            {
              actionType: 'bg_color',
              bgColor: {
                colorType: '4bit',
                color4bitType: 'standard',
                colorName: 'green',
              },
            },
          ];
        case '43':
          return [
            defaultAnsiParser(),
            {
              actionType: 'bg_color',
              bgColor: {
                colorType: '4bit',
                color4bitType: 'standard',
                colorName: 'yellow',
              },
            },
          ];
        case '44':
          return [
            defaultAnsiParser(),
            {
              actionType: 'bg_color',
              bgColor: {
                colorType: '4bit',
                color4bitType: 'standard',
                colorName: 'blue',
              },
            },
          ];
        case '45':
          return [
            defaultAnsiParser(),
            {
              actionType: 'bg_color',
              bgColor: {
                colorType: '4bit',
                color4bitType: 'standard',
                colorName: 'magenta',
              },
            },
          ];
        case '46':
          return [
            defaultAnsiParser(),
            {
              actionType: 'bg_color',
              bgColor: {
                colorType: '4bit',
                color4bitType: 'standard',
                colorName: 'cyan',
              },
            },
          ];
        case '47':
          return [
            defaultAnsiParser(),
            {
              actionType: 'bg_color',
              bgColor: {
                colorType: '4bit',
                color4bitType: 'standard',
                colorName: 'white',
              },
            },
          ];
        case '48':
          break;
        case '49':
          return [
            defaultAnsiParser(),
            {
              actionType: 'bg_color',
              bgColor: {
                colorType: 'default',
              },
            },
          ];
        case '50':
          return [
            defaultAnsiParser(),
            {
              actionType: 'propositional_spacing',
              propositionalSpacing: false,
            },
          ];
        case '51':
          return [
            defaultAnsiParser(),
            {
              actionType: 'emoji_variation',
              emojiVariation: 'framed',
            },
          ];
        case '52':
          return [
            defaultAnsiParser(),
            {
              actionType: 'emoji_variation',
              emojiVariation: 'encircled',
            },
          ];
        case '53':
          return [
            defaultAnsiParser(),
            {
              actionType: 'overlined',
              overlined: true,
            },
          ];
        case '54':
          return [
            defaultAnsiParser(),
            {
              actionType: 'emoji_variation',
              emojiVariation: 'default',
            },
          ];
        case '55':
          return [
            defaultAnsiParser(),
            {
              actionType: 'overlined',
              overlined: false,
            },
          ];
        case '73':
          return [
            defaultAnsiParser(),
            {
              actionType: 'script',
              script: 'superscript',
            },
          ];
        case '74':
          return [
            defaultAnsiParser(),
            {
              actionType: 'script',
              script: 'subscript',
            },
          ];
        case '75':
          return [
            defaultAnsiParser(),
            {
              actionType: 'script',
              script: 'default',
            },
          ];
        case '90':
          return [
            defaultAnsiParser(),
            {
              actionType: 'fg_color',
              fgColor: {
                colorType: '4bit',
                color4bitType: 'high_intensity',
                colorName: 'black',
              },
            },
          ];
        case '91':
          return [
            defaultAnsiParser(),
            {
              actionType: 'fg_color',
              fgColor: {
                colorType: '4bit',
                color4bitType: 'high_intensity',
                colorName: 'red',
              },
            },
          ];
        case '92':
          return [
            defaultAnsiParser(),
            {
              actionType: 'fg_color',
              fgColor: {
                colorType: '4bit',
                color4bitType: 'high_intensity',
                colorName: 'green',
              },
            },
          ];
        case '93':
          return [
            defaultAnsiParser(),
            {
              actionType: 'fg_color',
              fgColor: {
                colorType: '4bit',
                color4bitType: 'high_intensity',
                colorName: 'yellow',
              },
            },
          ];
        case '94':
          return [
            defaultAnsiParser(),
            {
              actionType: 'fg_color',
              fgColor: {
                colorType: '4bit',
                color4bitType: 'high_intensity',
                colorName: 'blue',
              },
            },
          ];
        case '95':
          return [
            defaultAnsiParser(),
            {
              actionType: 'fg_color',
              fgColor: {
                colorType: '4bit',
                color4bitType: 'high_intensity',
                colorName: 'magenta',
              },
            },
          ];
        case '96':
          return [
            defaultAnsiParser(),
            {
              actionType: 'fg_color',
              fgColor: {
                colorType: '4bit',
                color4bitType: 'high_intensity',
                colorName: 'cyan',
              },
            },
          ];
        case '97':
          return [
            defaultAnsiParser(),
            {
              actionType: 'fg_color',
              fgColor: {
                colorType: '4bit',
                color4bitType: 'high_intensity',
                colorName: 'white',
              },
            },
          ];
        case '100':
          return [
            defaultAnsiParser(),
            {
              actionType: 'bg_color',
              bgColor: {
                colorType: '4bit',
                color4bitType: 'high_intensity',
                colorName: 'black',
              },
            },
          ];
        case '101':
          return [
            defaultAnsiParser(),
            {
              actionType: 'bg_color',
              bgColor: {
                colorType: '4bit',
                color4bitType: 'high_intensity',
                colorName: 'red',
              },
            },
          ];
        case '102':
          return [
            defaultAnsiParser(),
            {
              actionType: 'bg_color',
              bgColor: {
                colorType: '4bit',
                color4bitType: 'high_intensity',
                colorName: 'green',
              },
            },
          ];
        case '103':
          return [
            defaultAnsiParser(),
            {
              actionType: 'bg_color',
              bgColor: {
                colorType: '4bit',
                color4bitType: 'high_intensity',
                colorName: 'yellow',
              },
            },
          ];
        case '104':
          return [
            defaultAnsiParser(),
            {
              actionType: 'bg_color',
              bgColor: {
                colorType: '4bit',
                color4bitType: 'high_intensity',
                colorName: 'blue',
              },
            },
          ];
        case '105':
          return [
            defaultAnsiParser(),
            {
              actionType: 'bg_color',
              bgColor: {
                colorType: '4bit',
                color4bitType: 'high_intensity',
                colorName: 'magenta',
              },
            },
          ];
        case '106':
          return [
            defaultAnsiParser(),
            {
              actionType: 'bg_color',
              bgColor: {
                colorType: '4bit',
                color4bitType: 'high_intensity',
                colorName: 'cyan',
              },
            },
          ];
        case '107':
          return [
            defaultAnsiParser(),
            {
              actionType: 'bg_color',
              bgColor: {
                colorType: '4bit',
                color4bitType: 'high_intensity',
                colorName: 'white',
              },
            },
          ];
      }
      break;
    case 0x6e: // n
      switch (n) {
        case '6':
          return [
            defaultAnsiParser(),
            {
              actionType: 'dsr',
            },
          ];
        default:
          return [
            defaultAnsiParser(),
            {
              actionType: 'unknown',
              unknownBytes: Uint8Array.from(rbytes),
            },
          ];
      }
  }
  if (bytes.length <= p) {
    if (0x40 <= lastByte && lastByte <= 0x7e) {
      return [
        defaultAnsiParser(),
        {
          actionType: 'unknown',
          unknownBytes: Uint8Array.from(rbytes),
        },
      ];
    }
    return [
      {
        waitingBytes: Uint8Array.from(rbytes),
      },
      {
        actionType: 'noop',
      },
    ];
  }
  // ;
  if (bytes[p] !== 0x3b) {
    if (0x40 <= lastByte && lastByte <= 0x7e) {
      return [
        defaultAnsiParser(),
        {
          actionType: 'unknown',
          unknownBytes: Uint8Array.from(rbytes),
        },
      ];
    }
    return [
      {
        waitingBytes: Uint8Array.from(rbytes),
      },
      {
        actionType: 'noop',
      },
    ];
  }
  p += 1;
  const pm0 = p;
  while (bytes.length > p && decodeNumberByte(bytes[p]) !== null) p += 1;
  const m = decodeIntegerBytes(bytes.slice(pm0, p));
  if (bytes.length <= p) {
    if (0x40 <= lastByte && lastByte <= 0x7e) {
      return [
        defaultAnsiParser(),
        {
          actionType: 'unknown',
          unknownBytes: Uint8Array.from(rbytes),
        },
      ];
    }
    return [
      {
        waitingBytes: Uint8Array.from(rbytes),
      },
      {
        actionType: 'noop',
      },
    ];
  }
  switch (bytes[p]) {
    case 0x48: // H
      return [
        defaultAnsiParser(),
        {
          actionType: 'cup',
          row: n,
          column: m,
        },
      ];
    case 0x66: // f
      return [
        defaultAnsiParser(),
        {
          actionType: 'hvp',
          horizontal: n,
          vertical: m,
        },
      ];
  }
  if (bytes.length <= p) {
    if (0x40 <= lastByte && lastByte <= 0x7e) {
      return [
        defaultAnsiParser(),
        {
          actionType: 'unknown',
          unknownBytes: Uint8Array.from(rbytes),
        },
      ];
    }
    return [
      {
        waitingBytes: Uint8Array.from(rbytes),
      },
      {
        actionType: 'noop',
      },
    ];
  }
  // ;
  if (bytes[p] !== 0x3b) {
    if (0x40 <= lastByte && lastByte <= 0x7e) {
      return [
        defaultAnsiParser(),
        {
          actionType: 'unknown',
          unknownBytes: Uint8Array.from(rbytes),
        },
      ];
    }
    return [
      {
        waitingBytes: Uint8Array.from(rbytes),
      },
      {
        actionType: 'noop',
      },
    ];
  }
  p += 1;
  const pr0 = p;
  while (bytes.length > p && decodeNumberByte(bytes[p]) !== null) p += 1;
  const r = decodeIntegerBytes(bytes.slice(pr0, p));
  if (bytes.length <= p) {
    if (0x40 <= lastByte && lastByte <= 0x7e) {
      return [
        defaultAnsiParser(),
        {
          actionType: 'unknown',
          unknownBytes: Uint8Array.from(rbytes),
        },
      ];
    }
    return [
      {
        waitingBytes: Uint8Array.from(rbytes),
      },
      {
        actionType: 'noop',
      },
    ];
  }
  // m
  if (bytes[p] === 0x6d) {
    if ((n !== '38' && n !== '48') || m !== '5' || r === '' || !lessThan256(r)) {
      return [
        defaultAnsiParser(),
        {
          actionType: 'unknown',
          unknownBytes: Uint8Array.from(rbytes),
        },
      ];
    }
    const rn = Number.parseInt(r, 10);
    if (n === '38') {
      return [
        defaultAnsiParser(),
        {
          actionType: 'fg_color',
          fgColor: decodeAnsiColor8bit(rn),
        },
      ];
    } else {
      return [
        defaultAnsiParser(),
        {
          actionType: 'bg_color',
          bgColor: decodeAnsiColor8bit(rn),
        },
      ];
    }
  }
  if (bytes.length <= p) {
    if (0x40 <= lastByte && lastByte <= 0x7e) {
      return [
        defaultAnsiParser(),
        {
          actionType: 'unknown',
          unknownBytes: Uint8Array.from(rbytes),
        },
      ];
    }
    return [
      {
        waitingBytes: Uint8Array.from(rbytes),
      },
      {
        actionType: 'noop',
      },
    ];
  }
  // ;
  if (bytes[p] !== 0x3b) {
    if (0x40 <= lastByte && lastByte <= 0x7e) {
      return [
        defaultAnsiParser(),
        {
          actionType: 'unknown',
          unknownBytes: Uint8Array.from(rbytes),
        },
      ];
    }
    return [
      {
        waitingBytes: Uint8Array.from(rbytes),
      },
      {
        actionType: 'noop',
      },
    ];
  }
  p += 1;
  const pg0 = p;
  while (bytes.length > p && decodeNumberByte(bytes[p]) !== null) p += 1;
  const g = decodeIntegerBytes(bytes.slice(pg0, p));
  if (bytes.length <= p) {
    if (0x40 <= lastByte && lastByte <= 0x7e) {
      return [
        defaultAnsiParser(),
        {
          actionType: 'unknown',
          unknownBytes: Uint8Array.from(rbytes),
        },
      ];
    }
    return [
      {
        waitingBytes: Uint8Array.from(rbytes),
      },
      {
        actionType: 'noop',
      },
    ];
  }
  if (bytes.length <= p) {
    return [
      {
        waitingBytes: Uint8Array.from(rbytes),
      },
      {
        actionType: 'noop',
      },
    ];
  }
  // ;
  if (bytes[p] !== 0x3b) {
    if (0x40 <= lastByte && lastByte <= 0x7e) {
      return [
        defaultAnsiParser(),
        {
          actionType: 'unknown',
          unknownBytes: Uint8Array.from(rbytes),
        },
      ];
    }
    return [
      {
        waitingBytes: Uint8Array.from(rbytes),
      },
      {
        actionType: 'noop',
      },
    ];
  }
  p += 1;
  const pb0 = p;
  while (bytes.length > p && decodeNumberByte(bytes[p]) !== null) p += 1;
  const b = decodeIntegerBytes(bytes.slice(pb0, p));
  if (bytes.length <= p) {
    return [
      {
        waitingBytes: Uint8Array.from(rbytes),
      },
      {
        actionType: 'noop',
      },
    ];
  }
  // m
  if (bytes[p] === 0x6d) {
    if (
      (n !== '38' && n !== '48') ||
      m !== '2' ||
      r === '' ||
      g === '' ||
      b === '' ||
      !lessThan256(r) ||
      !lessThan256(g) ||
      !lessThan256(b)
    ) {
      return [
        defaultAnsiParser(),
        {
          actionType: 'unknown',
          unknownBytes: Uint8Array.from(rbytes),
        },
      ];
    }
    if (n === '38') {
      return [
        defaultAnsiParser(),
        {
          actionType: 'fg_color',
          fgColor: {
            colorType: '24bit',
            r: Number.parseInt(r, 10),
            g: Number.parseInt(g, 10),
            b: Number.parseInt(b, 10),
          },
        },
      ];
    } else {
      return [
        defaultAnsiParser(),
        {
          actionType: 'bg_color',
          bgColor: {
            colorType: '24bit',
            r: Number.parseInt(r, 10),
            g: Number.parseInt(g, 10),
            b: Number.parseInt(b, 10),
          },
        },
      ];
    }
  }
  // Here, waiting to be dropped.
  if (0x40 <= lastByte && lastByte <= 0x7e) {
    return [
      defaultAnsiParser(),
      {
        actionType: 'unknown',
        unknownBytes: Uint8Array.from(rbytes),
      },
    ];
  }
  return [
    {
      waitingBytes: Uint8Array.from(rbytes),
    },
    {
      actionType: 'noop',
    },
  ];
};

export default decodeAnsiByte;
