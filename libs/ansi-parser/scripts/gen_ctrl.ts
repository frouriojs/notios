import fs from 'fs';
import path from 'path';

const suffix = 'ansiActionControll';
const typeSuffix = 'AnsiActionControll';

const ctrlSymbols = [
  'NUL',
  'SOH',
  'STX',
  'ETX',
  'EOT',
  'ENQ',
  'ACK',
  'BEL',
  'BS',
  'HT',
  'LF',
  'VT',
  'FF',
  'CR',
  'SO',
  'SI',
  'DLE',
  'DC1',
  'DC2',
  'DC3',
  'DC4',
  'NAK',
  'SYN',
  'ETB',
  'CAN',
  'EM',
  'SUB',
  'ESC',
  'FS',
  'GS',
  'RS',
  'US',
];

const importTypes =
  'import type {\n' +
  ctrlSymbols
    .map((_v, i) => {
      const i2 = `0${i.toString(16)}`.slice(-2);
      return `  ${typeSuffix}${i2},`;
    })
    .join('\n') +
  '\n} from "../interfaces/ansi-controll-action";\n';

const declCtrlChar = ctrlSymbols
  .map((s, i) => {
    const i2 = `0${i.toString(16)}`.slice(-2);
    const c = `
/**
 * Action for controll character ${s}(0x${i2}).
 */
export const ${suffix}${i2} = (): ${typeSuffix}${i2} => ({
  actionType: 'controll',
  char: '\\x${i2}',
  byte: ${i},
  symbol: '${s}',
});
  `.trim();
    return c;
  })
  .join('\n');

const declCtrlCharType = ctrlSymbols
  .map((s, i) => {
    const i2 = `0${i.toString(16)}`.slice(-2);
    const c = `
/**
 * Action for controll character ${s}(0x${i2}).
 */
export type ${typeSuffix}${i2} = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\\x${i2}';
  byte: ${i};
  symbol: '${s}';
};
  `.trim();
    return c;
  })
  .join('\n');

const declList =
  'export const ansiActionControllList = (): [\n' +
  ctrlSymbols
    .map((_v, i) => {
      const i2 = `0${i.toString(16)}`.slice(-2);
      return `  ${typeSuffix}${i2},`;
    })
    .join('\n') +
  '\n] => [\n' +
  ctrlSymbols
    .map((_v, i) => {
      const i2 = `0${i.toString(16)}`.slice(-2);
      return `  ${suffix}${i2}(),`;
    })
    .join('\n') +
  '\n];';

const declUnionType =
  'export type AnsiActionControll =\n' +
  ctrlSymbols
    .map((_v, i) => {
      const i2 = `0${i.toString(16)}`.slice(-2);
      return `  | ${typeSuffix}${i2}`;
    })
    .join('\n') +
  ';\n';

const scr = [importTypes, declCtrlChar, declList].join('\n') + '\n';
const typ = [declCtrlCharType, declUnionType].join('\n') + '\n';

fs.writeFileSync(path.resolve(__dirname, '../src/controll-actions.ts'), scr);
fs.writeFileSync(path.resolve(__dirname, '../interfaces/ansi-controll-action.d.ts'), typ);

console.log('Done. You should run lint:fix.');
