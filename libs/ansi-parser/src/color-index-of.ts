import { ColorName } from '../interfaces/ansi-action.js';

const colorIndexOf = (colorName: ColorName) => {
  switch (colorName) {
    case 'black':
      return 0;
    case 'red':
      return 1;
    case 'green':
      return 2;
    case 'yellow':
      return 3;
    case 'blue':
      return 4;
    case 'magenta':
      return 5;
    case 'cyan':
      return 6;
    case 'white':
      return 7;
  }
};

export default colorIndexOf;
