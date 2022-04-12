/**
 * Action for controll character NUL(0x00).
 */
export type AnsiActionControll00 = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x00';
  byte: 0;
  symbol: 'NUL';
};
/**
 * Action for controll character SOH(0x01).
 */
export type AnsiActionControll01 = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x01';
  byte: 1;
  symbol: 'SOH';
};
/**
 * Action for controll character STX(0x02).
 */
export type AnsiActionControll02 = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x02';
  byte: 2;
  symbol: 'STX';
};
/**
 * Action for controll character ETX(0x03).
 */
export type AnsiActionControll03 = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x03';
  byte: 3;
  symbol: 'ETX';
};
/**
 * Action for controll character EOT(0x04).
 */
export type AnsiActionControll04 = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x04';
  byte: 4;
  symbol: 'EOT';
};
/**
 * Action for controll character ENQ(0x05).
 */
export type AnsiActionControll05 = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x05';
  byte: 5;
  symbol: 'ENQ';
};
/**
 * Action for controll character ACK(0x06).
 */
export type AnsiActionControll06 = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x06';
  byte: 6;
  symbol: 'ACK';
};
/**
 * Action for controll character BEL(0x07).
 */
export type AnsiActionControll07 = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x07';
  byte: 7;
  symbol: 'BEL';
};
/**
 * Action for controll character BS(0x08).
 */
export type AnsiActionControll08 = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x08';
  byte: 8;
  symbol: 'BS';
};
/**
 * Action for controll character HT(0x09).
 */
export type AnsiActionControll09 = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x09';
  byte: 9;
  symbol: 'HT';
};
/**
 * Action for controll character LF(0x0a).
 */
export type AnsiActionControll0a = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x0a';
  byte: 10;
  symbol: 'LF';
};
/**
 * Action for controll character VT(0x0b).
 */
export type AnsiActionControll0b = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x0b';
  byte: 11;
  symbol: 'VT';
};
/**
 * Action for controll character FF(0x0c).
 */
export type AnsiActionControll0c = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x0c';
  byte: 12;
  symbol: 'FF';
};
/**
 * Action for controll character CR(0x0d).
 */
export type AnsiActionControll0d = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x0d';
  byte: 13;
  symbol: 'CR';
};
/**
 * Action for controll character SO(0x0e).
 */
export type AnsiActionControll0e = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x0e';
  byte: 14;
  symbol: 'SO';
};
/**
 * Action for controll character SI(0x0f).
 */
export type AnsiActionControll0f = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x0f';
  byte: 15;
  symbol: 'SI';
};
/**
 * Action for controll character DLE(0x10).
 */
export type AnsiActionControll10 = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x10';
  byte: 16;
  symbol: 'DLE';
};
/**
 * Action for controll character DC1(0x11).
 */
export type AnsiActionControll11 = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x11';
  byte: 17;
  symbol: 'DC1';
};
/**
 * Action for controll character DC2(0x12).
 */
export type AnsiActionControll12 = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x12';
  byte: 18;
  symbol: 'DC2';
};
/**
 * Action for controll character DC3(0x13).
 */
export type AnsiActionControll13 = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x13';
  byte: 19;
  symbol: 'DC3';
};
/**
 * Action for controll character DC4(0x14).
 */
export type AnsiActionControll14 = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x14';
  byte: 20;
  symbol: 'DC4';
};
/**
 * Action for controll character NAK(0x15).
 */
export type AnsiActionControll15 = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x15';
  byte: 21;
  symbol: 'NAK';
};
/**
 * Action for controll character SYN(0x16).
 */
export type AnsiActionControll16 = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x16';
  byte: 22;
  symbol: 'SYN';
};
/**
 * Action for controll character ETB(0x17).
 */
export type AnsiActionControll17 = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x17';
  byte: 23;
  symbol: 'ETB';
};
/**
 * Action for controll character CAN(0x18).
 */
export type AnsiActionControll18 = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x18';
  byte: 24;
  symbol: 'CAN';
};
/**
 * Action for controll character EM(0x19).
 */
export type AnsiActionControll19 = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x19';
  byte: 25;
  symbol: 'EM';
};
/**
 * Action for controll character SUB(0x1a).
 */
export type AnsiActionControll1a = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x1a';
  byte: 26;
  symbol: 'SUB';
};
/**
 * Action for controll character ESC(0x1b).
 */
export type AnsiActionControll1b = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x1b';
  byte: 27;
  symbol: 'ESC';
};
/**
 * Action for controll character FS(0x1c).
 */
export type AnsiActionControll1c = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x1c';
  byte: 28;
  symbol: 'FS';
};
/**
 * Action for controll character GS(0x1d).
 */
export type AnsiActionControll1d = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x1d';
  byte: 29;
  symbol: 'GS';
};
/**
 * Action for controll character RS(0x1e).
 */
export type AnsiActionControll1e = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x1e';
  byte: 30;
  symbol: 'RS';
};
/**
 * Action for controll character US(0x1f).
 */
export type AnsiActionControll1f = {
  /**
   * @see {@link https://en.wikipedia.org/wiki/C0_and_C1_control_codes}
   */
  actionType: 'controll';
  char: '\x1f';
  byte: 31;
  symbol: 'US';
};
export type AnsiActionControll =
  | AnsiActionControll00
  | AnsiActionControll01
  | AnsiActionControll02
  | AnsiActionControll03
  | AnsiActionControll04
  | AnsiActionControll05
  | AnsiActionControll06
  | AnsiActionControll07
  | AnsiActionControll08
  | AnsiActionControll09
  | AnsiActionControll0a
  | AnsiActionControll0b
  | AnsiActionControll0c
  | AnsiActionControll0d
  | AnsiActionControll0e
  | AnsiActionControll0f
  | AnsiActionControll10
  | AnsiActionControll11
  | AnsiActionControll12
  | AnsiActionControll13
  | AnsiActionControll14
  | AnsiActionControll15
  | AnsiActionControll16
  | AnsiActionControll17
  | AnsiActionControll18
  | AnsiActionControll19
  | AnsiActionControll1a
  | AnsiActionControll1b
  | AnsiActionControll1c
  | AnsiActionControll1d
  | AnsiActionControll1e
  | AnsiActionControll1f;
