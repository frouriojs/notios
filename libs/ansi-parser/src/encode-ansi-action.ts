import { AnsiAction } from '../interfaces/ansi-action.js';
import colorIndexOf from './color-index-of.js';

const encodeInteger = (s: string): Uint8Array => {
  return Uint8Array.from([...s].map((c) => c.charCodeAt(0)));
};

const encodeAnsiAction = (action: AnsiAction): Uint8Array => {
  const CSI = [0x1b, 0x5b];
  switch (action.actionType) {
    case 'noop':
      return Uint8Array.from([]);
    case 'unknown':
      return action.unknownBytes;
    case 'print':
      return Uint8Array.from([action.byte]);
    case 'cuu':
      return Uint8Array.from([...CSI, ...encodeInteger(action.cells), 0x41]);
    case 'cud':
      return Uint8Array.from([...CSI, ...encodeInteger(action.cells), 0x42]);
    case 'cuf':
      return Uint8Array.from([...CSI, ...encodeInteger(action.cells), 0x43]);
    case 'cub':
      return Uint8Array.from([...CSI, ...encodeInteger(action.cells), 0x44]);
    case 'cnl':
      return Uint8Array.from([...CSI, ...encodeInteger(action.cells), 0x45]);
    case 'cpl':
      return Uint8Array.from([...CSI, ...encodeInteger(action.cells), 0x46]);
    case 'cha':
      return Uint8Array.from([...CSI, ...encodeInteger(action.column), 0x47]);
    case 'cup':
      if (action.column === null) {
        return Uint8Array.from([...CSI, ...encodeInteger(action.row), 0x48]);
      } else {
        return Uint8Array.from([...CSI, ...encodeInteger(action.row), 0x3b, ...encodeInteger(action.column), 0x48]);
      }
    case 'ed':
      return Uint8Array.from([...CSI, ...encodeInteger(action.eraseInDisplayType), 0x4a]);
    case 'el':
      return Uint8Array.from([...CSI, ...encodeInteger(action.eraseInLineType), 0x4b]);
    case 'su':
      return Uint8Array.from([...CSI, ...encodeInteger(action.n), 0x53]);
    case 'sd':
      return Uint8Array.from([...CSI, ...encodeInteger(action.n), 0x54]);
    case 'aux_port':
      return Uint8Array.from([...CSI, action.auxPort ? 0x35 : 0x34, 0x69]);
    case 'hvp':
      if (action.vertical === null) {
        return Uint8Array.from([...CSI, ...encodeInteger(action.horizontal), 0x66]);
      } else {
        return Uint8Array.from([
          ...CSI,
          ...encodeInteger(action.horizontal),
          0x3b,
          ...encodeInteger(action.vertical),
          0x66,
        ]);
      }
    case 'dsr':
      return Uint8Array.from([...CSI, 0x36, 0x6e]);
    // <CSI>
    case 'reset':
      return Uint8Array.from([...CSI, 0x30, 0x6d]);
    case 'intensity':
      switch (action.intensity) {
        case 'bold':
          return Uint8Array.from([...CSI, 0x31, 0x6d]);
        case 'dim':
          return Uint8Array.from([...CSI, 0x32, 0x6d]);
        default:
          return Uint8Array.from([...CSI, 0x32, 0x32, 0x6d]);
      }
    case 'italic':
      if (action.italic) {
        return Uint8Array.from([...CSI, 0x33, 0x6d]);
      } else {
        return Uint8Array.from([...CSI, 0x32, 0x33, 0x6d]);
      }
    case 'underline':
      switch (action.underline) {
        case 'single':
          return Uint8Array.from([...CSI, 0x34, 0x6d]);
        case 'double':
          return Uint8Array.from([...CSI, 0x32, 0x31, 0x6d]);
        default:
          return Uint8Array.from([...CSI, 0x32, 0x34, 0x6d]);
      }
    case 'blink':
      switch (action.blink) {
        case 'slow':
          return Uint8Array.from([...CSI, 0x35, 0x6d]);
        case 'rapid':
          return Uint8Array.from([...CSI, 0x36, 0x6d]);
        default:
          return Uint8Array.from([...CSI, 0x32, 0x35, 0x6d]);
      }
    case 'invert':
      if (action.invert) {
        return Uint8Array.from([...CSI, 0x37, 0x6d]);
      } else {
        return Uint8Array.from([...CSI, 0x32, 0x37, 0x6d]);
      }
    case 'hide':
      if (action.hide) {
        return Uint8Array.from([...CSI, 0x38, 0x6d]);
      } else {
        return Uint8Array.from([...CSI, 0x32, 0x38, 0x6d]);
      }
    case 'strike':
      if (action.strike) {
        return Uint8Array.from([...CSI, 0x39, 0x6d]);
      } else {
        return Uint8Array.from([...CSI, 0x32, 0x39, 0x6d]);
      }
    case 'font':
      switch (action.font) {
        case 'default':
          return Uint8Array.from([...CSI, 0x31, 0x30, 0x6d]);
        default:
          return Uint8Array.from([...CSI, 0x31, 0x30 + action.font, 0x6d]);
        case 'fraktur':
          return Uint8Array.from([...CSI, 0x32, 0x30, 0x6d]);
      }
    case 'propositional_spacing':
      if (action.propositionalSpacing) {
        return Uint8Array.from([...CSI, 0x32, 0x36, 0x6d]);
      } else {
        return Uint8Array.from([...CSI, 0x35, 0x30, 0x6d]);
      }
    case 'fg_color':
      switch (action.fgColor.colorType) {
        case '4bit':
          switch (action.fgColor.color4bitType) {
            case 'standard':
              return Uint8Array.from([...CSI, 0x33, 0x30 + colorIndexOf(action.fgColor.colorName), 0x6d]);
            case 'high_intensity':
            default:
              return Uint8Array.from([...CSI, 0x39, 0x30 + colorIndexOf(action.fgColor.colorName), 0x6d]);
          }
        case '8bit':
          switch (action.fgColor.color8bitType) {
            case 'standard': {
              return Uint8Array.from([
                ...CSI,
                0x33,
                0x38,
                0x3b,
                0x35,
                0x3b,
                ...encodeInteger(colorIndexOf(action.fgColor.colorName).toString()),
                0x6d,
              ]);
            }
            case 'high_intensity':
              return Uint8Array.from([
                ...CSI,
                0x33,
                0x38,
                0x3b,
                0x35,
                0x3b,
                ...encodeInteger((8 + colorIndexOf(action.fgColor.colorName)).toString()),
                0x6d,
              ]);
            case 'rgb': {
              const n = 16 + action.fgColor.r * 36 + action.fgColor.g * 6 + action.fgColor.b;
              return Uint8Array.from([...CSI, 0x33, 0x38, 0x3b, 0x35, 0x3b, ...encodeInteger(n.toString()), 0x6d]);
            }
            case 'grayscale':
            default:
              return Uint8Array.from([
                ...CSI,
                0x33,
                0x38,
                0x3b,
                0x35,
                0x3b,
                ...encodeInteger((232 + action.fgColor.lightness).toString()),
                0x6d,
              ]);
          }
        case '24bit':
          return Uint8Array.from([
            ...CSI,
            0x33,
            0x38,
            0x3b,
            0x32,
            0x3b,
            ...encodeInteger(action.fgColor.r.toString()),
            0x3b,
            ...encodeInteger(action.fgColor.g.toString()),
            0x3b,
            ...encodeInteger(action.fgColor.b.toString()),
            0x6d,
          ]);
        default:
          return Uint8Array.from([...CSI, 0x33, 0x39, 0x6d]);
      }
    case 'bg_color':
      switch (action.bgColor.colorType) {
        case '4bit':
          switch (action.bgColor.color4bitType) {
            case 'standard':
              return Uint8Array.from([...CSI, 0x34, 0x30 + colorIndexOf(action.bgColor.colorName), 0x6d]);
            case 'high_intensity':
            default:
              return Uint8Array.from([...CSI, 0x31, 0x30, 0x30 + colorIndexOf(action.bgColor.colorName), 0x6d]);
          }
        case '8bit':
          switch (action.bgColor.color8bitType) {
            case 'standard': {
              return Uint8Array.from([
                ...CSI,
                0x34,
                0x38,
                0x3b,
                0x35,
                0x3b,
                ...encodeInteger(colorIndexOf(action.bgColor.colorName).toString()),
                0x6d,
              ]);
            }
            case 'high_intensity':
              return Uint8Array.from([
                ...CSI,
                0x34,
                0x38,
                0x3b,
                0x35,
                0x3b,
                ...encodeInteger((8 + colorIndexOf(action.bgColor.colorName)).toString()),
                0x6d,
              ]);
            case 'rgb': {
              const n = 16 + action.bgColor.r * 36 + action.bgColor.g * 6 + action.bgColor.b;
              return Uint8Array.from([...CSI, 0x34, 0x38, 0x3b, 0x35, 0x3b, ...encodeInteger(n.toString()), 0x6d]);
            }
            case 'grayscale':
            default:
              return Uint8Array.from([
                ...CSI,
                0x34,
                0x38,
                0x3b,
                0x35,
                0x3b,
                ...encodeInteger((232 + action.bgColor.lightness).toString()),
                0x6d,
              ]);
          }
        case '24bit':
          return Uint8Array.from([
            ...CSI,
            0x34,
            0x38,
            0x3b,
            0x32,
            0x3b,
            ...encodeInteger(action.bgColor.r.toString()),
            0x3b,
            ...encodeInteger(action.bgColor.g.toString()),
            0x3b,
            ...encodeInteger(action.bgColor.b.toString()),
            0x6d,
          ]);
        default:
          return Uint8Array.from([...CSI, 0x34, 0x39, 0x6d]);
      }
    case 'emoji_variation':
      switch (action.emojiVariation) {
        case 'framed':
          return Uint8Array.from([...CSI, 0x35, 0x31, 0x6d]);
        case 'encircled':
          return Uint8Array.from([...CSI, 0x35, 0x32, 0x6d]);
        default:
          return Uint8Array.from([...CSI, 0x35, 0x34, 0x6d]);
      }
    case 'overlined':
      if (action.overlined) {
        return Uint8Array.from([...CSI, 0x35, 0x33, 0x6d]);
      } else {
        return Uint8Array.from([...CSI, 0x35, 0x35, 0x6d]);
      }
    case 'script':
      switch (action.script) {
        case 'superscript':
          return Uint8Array.from([...CSI, 0x37, 0x33, 0x6d]);
        case 'subscript':
          return Uint8Array.from([...CSI, 0x37, 0x34, 0x6d]);
        default:
          return Uint8Array.from([...CSI, 0x37, 0x35, 0x6d]);
      }
    case 'controll':
      return Uint8Array.from([action.byte]);
    // </CSI>
  }
};

export default encodeAnsiAction;
