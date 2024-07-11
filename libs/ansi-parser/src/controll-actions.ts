import type {
  AnsiActionControll00,
  AnsiActionControll01,
  AnsiActionControll02,
  AnsiActionControll03,
  AnsiActionControll04,
  AnsiActionControll05,
  AnsiActionControll06,
  AnsiActionControll07,
  AnsiActionControll08,
  AnsiActionControll09,
  AnsiActionControll0a,
  AnsiActionControll0b,
  AnsiActionControll0c,
  AnsiActionControll0d,
  AnsiActionControll0e,
  AnsiActionControll0f,
  AnsiActionControll10,
  AnsiActionControll11,
  AnsiActionControll12,
  AnsiActionControll13,
  AnsiActionControll14,
  AnsiActionControll15,
  AnsiActionControll16,
  AnsiActionControll17,
  AnsiActionControll18,
  AnsiActionControll19,
  AnsiActionControll1a,
  AnsiActionControll1b,
  AnsiActionControll1c,
  AnsiActionControll1d,
  AnsiActionControll1e,
  AnsiActionControll1f,
} from '../interfaces/ansi-controll-action';

/**
 * Action for controll character NUL(0x00).
 */
export const ansiActionControll00 = (): AnsiActionControll00 => ({
  actionType: 'controll',
  char: '\x00',
  byte: 0,
  symbol: 'NUL',
});
/**
 * Action for controll character SOH(0x01).
 */
export const ansiActionControll01 = (): AnsiActionControll01 => ({
  actionType: 'controll',
  char: '\x01',
  byte: 1,
  symbol: 'SOH',
});
/**
 * Action for controll character STX(0x02).
 */
export const ansiActionControll02 = (): AnsiActionControll02 => ({
  actionType: 'controll',
  char: '\x02',
  byte: 2,
  symbol: 'STX',
});
/**
 * Action for controll character ETX(0x03).
 */
export const ansiActionControll03 = (): AnsiActionControll03 => ({
  actionType: 'controll',
  char: '\x03',
  byte: 3,
  symbol: 'ETX',
});
/**
 * Action for controll character EOT(0x04).
 */
export const ansiActionControll04 = (): AnsiActionControll04 => ({
  actionType: 'controll',
  char: '\x04',
  byte: 4,
  symbol: 'EOT',
});
/**
 * Action for controll character ENQ(0x05).
 */
export const ansiActionControll05 = (): AnsiActionControll05 => ({
  actionType: 'controll',
  char: '\x05',
  byte: 5,
  symbol: 'ENQ',
});
/**
 * Action for controll character ACK(0x06).
 */
export const ansiActionControll06 = (): AnsiActionControll06 => ({
  actionType: 'controll',
  char: '\x06',
  byte: 6,
  symbol: 'ACK',
});
/**
 * Action for controll character BEL(0x07).
 */
export const ansiActionControll07 = (): AnsiActionControll07 => ({
  actionType: 'controll',
  char: '\x07',
  byte: 7,
  symbol: 'BEL',
});
/**
 * Action for controll character BS(0x08).
 */
export const ansiActionControll08 = (): AnsiActionControll08 => ({
  actionType: 'controll',
  char: '\x08',
  byte: 8,
  symbol: 'BS',
});
/**
 * Action for controll character HT(0x09).
 */
export const ansiActionControll09 = (): AnsiActionControll09 => ({
  actionType: 'controll',
  char: '\x09',
  byte: 9,
  symbol: 'HT',
});
/**
 * Action for controll character LF(0x0a).
 */
export const ansiActionControll0a = (): AnsiActionControll0a => ({
  actionType: 'controll',
  char: '\x0a',
  byte: 10,
  symbol: 'LF',
});
/**
 * Action for controll character VT(0x0b).
 */
export const ansiActionControll0b = (): AnsiActionControll0b => ({
  actionType: 'controll',
  char: '\x0b',
  byte: 11,
  symbol: 'VT',
});
/**
 * Action for controll character FF(0x0c).
 */
export const ansiActionControll0c = (): AnsiActionControll0c => ({
  actionType: 'controll',
  char: '\x0c',
  byte: 12,
  symbol: 'FF',
});
/**
 * Action for controll character CR(0x0d).
 */
export const ansiActionControll0d = (): AnsiActionControll0d => ({
  actionType: 'controll',
  char: '\x0d',
  byte: 13,
  symbol: 'CR',
});
/**
 * Action for controll character SO(0x0e).
 */
export const ansiActionControll0e = (): AnsiActionControll0e => ({
  actionType: 'controll',
  char: '\x0e',
  byte: 14,
  symbol: 'SO',
});
/**
 * Action for controll character SI(0x0f).
 */
export const ansiActionControll0f = (): AnsiActionControll0f => ({
  actionType: 'controll',
  char: '\x0f',
  byte: 15,
  symbol: 'SI',
});
/**
 * Action for controll character DLE(0x10).
 */
export const ansiActionControll10 = (): AnsiActionControll10 => ({
  actionType: 'controll',
  char: '\x10',
  byte: 16,
  symbol: 'DLE',
});
/**
 * Action for controll character DC1(0x11).
 */
export const ansiActionControll11 = (): AnsiActionControll11 => ({
  actionType: 'controll',
  char: '\x11',
  byte: 17,
  symbol: 'DC1',
});
/**
 * Action for controll character DC2(0x12).
 */
export const ansiActionControll12 = (): AnsiActionControll12 => ({
  actionType: 'controll',
  char: '\x12',
  byte: 18,
  symbol: 'DC2',
});
/**
 * Action for controll character DC3(0x13).
 */
export const ansiActionControll13 = (): AnsiActionControll13 => ({
  actionType: 'controll',
  char: '\x13',
  byte: 19,
  symbol: 'DC3',
});
/**
 * Action for controll character DC4(0x14).
 */
export const ansiActionControll14 = (): AnsiActionControll14 => ({
  actionType: 'controll',
  char: '\x14',
  byte: 20,
  symbol: 'DC4',
});
/**
 * Action for controll character NAK(0x15).
 */
export const ansiActionControll15 = (): AnsiActionControll15 => ({
  actionType: 'controll',
  char: '\x15',
  byte: 21,
  symbol: 'NAK',
});
/**
 * Action for controll character SYN(0x16).
 */
export const ansiActionControll16 = (): AnsiActionControll16 => ({
  actionType: 'controll',
  char: '\x16',
  byte: 22,
  symbol: 'SYN',
});
/**
 * Action for controll character ETB(0x17).
 */
export const ansiActionControll17 = (): AnsiActionControll17 => ({
  actionType: 'controll',
  char: '\x17',
  byte: 23,
  symbol: 'ETB',
});
/**
 * Action for controll character CAN(0x18).
 */
export const ansiActionControll18 = (): AnsiActionControll18 => ({
  actionType: 'controll',
  char: '\x18',
  byte: 24,
  symbol: 'CAN',
});
/**
 * Action for controll character EM(0x19).
 */
export const ansiActionControll19 = (): AnsiActionControll19 => ({
  actionType: 'controll',
  char: '\x19',
  byte: 25,
  symbol: 'EM',
});
/**
 * Action for controll character SUB(0x1a).
 */
export const ansiActionControll1a = (): AnsiActionControll1a => ({
  actionType: 'controll',
  char: '\x1a',
  byte: 26,
  symbol: 'SUB',
});
/**
 * Action for controll character ESC(0x1b).
 */
export const ansiActionControll1b = (): AnsiActionControll1b => ({
  actionType: 'controll',
  char: '\x1b',
  byte: 27,
  symbol: 'ESC',
});
/**
 * Action for controll character FS(0x1c).
 */
export const ansiActionControll1c = (): AnsiActionControll1c => ({
  actionType: 'controll',
  char: '\x1c',
  byte: 28,
  symbol: 'FS',
});
/**
 * Action for controll character GS(0x1d).
 */
export const ansiActionControll1d = (): AnsiActionControll1d => ({
  actionType: 'controll',
  char: '\x1d',
  byte: 29,
  symbol: 'GS',
});
/**
 * Action for controll character RS(0x1e).
 */
export const ansiActionControll1e = (): AnsiActionControll1e => ({
  actionType: 'controll',
  char: '\x1e',
  byte: 30,
  symbol: 'RS',
});
/**
 * Action for controll character US(0x1f).
 */
export const ansiActionControll1f = (): AnsiActionControll1f => ({
  actionType: 'controll',
  char: '\x1f',
  byte: 31,
  symbol: 'US',
});
export const ansiActionControllList = (): [
  AnsiActionControll00,
  AnsiActionControll01,
  AnsiActionControll02,
  AnsiActionControll03,
  AnsiActionControll04,
  AnsiActionControll05,
  AnsiActionControll06,
  AnsiActionControll07,
  AnsiActionControll08,
  AnsiActionControll09,
  AnsiActionControll0a,
  AnsiActionControll0b,
  AnsiActionControll0c,
  AnsiActionControll0d,
  AnsiActionControll0e,
  AnsiActionControll0f,
  AnsiActionControll10,
  AnsiActionControll11,
  AnsiActionControll12,
  AnsiActionControll13,
  AnsiActionControll14,
  AnsiActionControll15,
  AnsiActionControll16,
  AnsiActionControll17,
  AnsiActionControll18,
  AnsiActionControll19,
  AnsiActionControll1a,
  AnsiActionControll1b,
  AnsiActionControll1c,
  AnsiActionControll1d,
  AnsiActionControll1e,
  AnsiActionControll1f,
] => [
  ansiActionControll00(),
  ansiActionControll01(),
  ansiActionControll02(),
  ansiActionControll03(),
  ansiActionControll04(),
  ansiActionControll05(),
  ansiActionControll06(),
  ansiActionControll07(),
  ansiActionControll08(),
  ansiActionControll09(),
  ansiActionControll0a(),
  ansiActionControll0b(),
  ansiActionControll0c(),
  ansiActionControll0d(),
  ansiActionControll0e(),
  ansiActionControll0f(),
  ansiActionControll10(),
  ansiActionControll11(),
  ansiActionControll12(),
  ansiActionControll13(),
  ansiActionControll14(),
  ansiActionControll15(),
  ansiActionControll16(),
  ansiActionControll17(),
  ansiActionControll18(),
  ansiActionControll19(),
  ansiActionControll1a(),
  ansiActionControll1b(),
  ansiActionControll1c(),
  ansiActionControll1d(),
  ansiActionControll1e(),
  ansiActionControll1f(),
];
