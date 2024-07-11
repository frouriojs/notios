import { AnsiColor8bit } from '../interfaces/ansi-action';

const decodeAnsiColor8bit = (n: number): AnsiColor8bit => {
  if (n < 16) {
    switch (n) {
      case 0:
        return {
          colorType: '8bit',
          color8bitType: 'standard',
          colorName: 'black',
        };
      case 1:
        return {
          colorType: '8bit',
          color8bitType: 'standard',
          colorName: 'red',
        };
      case 2:
        return {
          colorType: '8bit',
          color8bitType: 'standard',
          colorName: 'green',
        };
      case 3:
        return {
          colorType: '8bit',
          color8bitType: 'standard',
          colorName: 'yellow',
        };
      case 4:
        return {
          colorType: '8bit',
          color8bitType: 'standard',
          colorName: 'blue',
        };
      case 5:
        return {
          colorType: '8bit',
          color8bitType: 'standard',
          colorName: 'magenta',
        };
      case 6:
        return {
          colorType: '8bit',
          color8bitType: 'standard',
          colorName: 'cyan',
        };
      case 7:
        return {
          colorType: '8bit',
          color8bitType: 'standard',
          colorName: 'white',
        };
      case 8:
        return {
          colorType: '8bit',
          color8bitType: 'high_intensity',
          colorName: 'black',
        };
      case 9:
        return {
          colorType: '8bit',
          color8bitType: 'high_intensity',
          colorName: 'red',
        };
      case 10:
        return {
          colorType: '8bit',
          color8bitType: 'high_intensity',
          colorName: 'green',
        };
      case 11:
        return {
          colorType: '8bit',
          color8bitType: 'high_intensity',
          colorName: 'yellow',
        };
      case 12:
        return {
          colorType: '8bit',
          color8bitType: 'high_intensity',
          colorName: 'blue',
        };
      case 13:
        return {
          colorType: '8bit',
          color8bitType: 'high_intensity',
          colorName: 'magenta',
        };
      case 14:
        return {
          colorType: '8bit',
          color8bitType: 'high_intensity',
          colorName: 'cyan',
        };
      case 15:
      default:
        return {
          colorType: '8bit',
          color8bitType: 'high_intensity',
          colorName: 'white',
        };
    }
  } else if (n < 232) {
    const b = (n - 16) % 6;
    const g = Math.floor((n - 16) / 6) % 6;
    const r = Math.floor((n - 16) / 36);
    return {
      colorType: '8bit',
      color8bitType: 'rgb',
      r,
      g,
      b,
    };
  } else {
    return {
      colorType: '8bit',
      color8bitType: 'grayscale',
      lightness: n - 232,
    };
  }
};

export default decodeAnsiColor8bit;
