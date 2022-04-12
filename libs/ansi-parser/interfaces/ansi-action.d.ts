import { AnsiActionControll } from './ansi-controll-action';

export type AnsiAction =
  | AnsiActionNoop
  | AnsiActionUnknown
  | AnsiActionReset
  // | AnsiActionCursorVisibility
  | AnsiActionAuxPort
  | AnsiActionFgColor
  | AnsiActionBgColor
  | AnsiActionIntensity
  | AnsiActionItalic
  | AnsiActionUnderline
  | AnsiActionBlink
  | AnsiActionInvert
  | AnsiActionHide
  | AnsiActionStrike
  | AnsiActionFont
  | AnsiActionPropositonalSpacing
  | AnsiActionEmojiVariation
  | AnsiActionOverlined
  | AnsiActionScript
  | AnsiActionPrint
  | AnsiActionCuu
  | AnsiActionCud
  | AnsiActionCuf
  | AnsiActionCub
  | AnsiActionCnl
  | AnsiActionCpl
  | AnsiActionCha
  | AnsiActionCup
  | AnsiActionEd
  | AnsiActionEl
  | AnsiActionSu
  | AnsiActionSd
  | AnsiActionHvp
  | AnsiActionDsr
  | AnsiActionControll;

export type AnsiActionNoop = {
  readonly actionType: 'noop';
};
/**
 * Most implemenation simply ignoers unknown escapes.
 */
export type AnsiActionUnknown = {
  readonly actionType: 'unknown';
  readonly unknownBytes: Uint8Array;
};
export type AnsiActionReset = {
  readonly actionType: 'reset';
};
// export type AnsiActionCursorVisibility = {
//   readonly actionType: 'cursor_visibility';
//   readonly cursorVisibility: boolean;
// };
export type AnsiActionAuxPort = {
  readonly actionType: 'aux_port';
  readonly auxPort: boolean;
};
export type AnsiActionFgColor = {
  readonly actionType: 'fg_color';
  readonly fgColor: AnsiFgColor;
};
export type AnsiActionBgColor = {
  readonly actionType: 'bg_color';
  readonly bgColor: AnsiBgColor;
};
export type AnsiActionIntensity = {
  readonly actionType: 'intensity';
  readonly intensity: AnsiIntensity;
};
export type AnsiActionItalic = {
  readonly actionType: 'italic';
  readonly italic: boolean;
};
export type AnsiActionUnderline = {
  readonly actionType: 'underline';
  readonly underline: AnsiUnderline;
};
export type AnsiActionBlink = {
  readonly actionType: 'blink';
  readonly blink: AnsiBlink;
};
export type AnsiActionInvert = {
  readonly actionType: 'invert';
  readonly invert: boolean;
};
export type AnsiActionHide = {
  readonly actionType: 'hide';
  readonly hide: boolean;
};
export type AnsiActionStrike = {
  readonly actionType: 'strike';
  readonly strike: boolean;
};
export type AnsiActionFont = {
  readonly actionType: 'font';
  readonly font: AnsiFont;
};
export type AnsiActionPropositonalSpacing = {
  readonly actionType: 'propositional_spacing';
  readonly propositionalSpacing: boolean;
};
export type AnsiActionEmojiVariation = {
  readonly actionType: 'emoji_variation';
  readonly emojiVariation: AnsiEmojiVariation;
};
export type AnsiActionOverlined = {
  readonly actionType: 'overlined';
  readonly overlined: boolean;
};
/**
 * Implemented only in mintty.
 */
export type AnsiActionScript = {
  readonly actionType: 'script';
  readonly script: AnsiScript;
};
export type AnsiActionalternatScreen = {
  readonly actionType: 'alternat_screen';
  readonly alternatScreen: boolean;
};

export type AnsiActionPrint = {
  readonly actionType: 'print';
  readonly byte: number;
};
/**
 * Cursor Up
 */
export type AnsiActionCuu = {
  readonly actionType: 'cuu';
  /**
   * How many cells to move. Stringified non-negative integer. May be empty.
   */
  readonly cells: string;
};
/**
 * Cursor Down
 */
export type AnsiActionCud = {
  readonly actionType: 'cud';
  /**
   * How many cells to move. Stringified non-negative integer. May be empty.
   */
  readonly cells: string;
};
/**
 * Cursor Forward
 */
export type AnsiActionCuf = {
  readonly actionType: 'cuf';
  /**
   * How many cells to move. Stringified non-negative integer. May be empty.
   */
  readonly cells: string;
};
/**
 * Cursor Back
 */
export type AnsiActionCub = {
  readonly actionType: 'cub';
  /**
   * How many cells to move. Stringified non-negative integer. May be empty.
   */
  readonly cells: string;
};
/**
 * Cursor Next Line
 */
export type AnsiActionCnl = {
  readonly actionType: 'cnl';
  /**
   * How many cells to move. Stringified non-negative integer. May be empty.
   */
  readonly cells: string;
};
/**
 * Cursor Previous Line
 */
export type AnsiActionCpl = {
  readonly actionType: 'cpl';
  /**
   * How many cells to move. Stringified non-negative integer. May be empty.
   */
  readonly cells: string;
};
/**
 * Cursor Horizontal Absolute
 */
export type AnsiActionCha = {
  readonly actionType: 'cha';
  /**
   * Number of column. Stringified 1-based integer. May be empty.
   */
  readonly column: string;
};
/**
 * Cursor Position
 */
export type AnsiActionCup = {
  readonly actionType: 'cup';
  /**
   * Number of row. Stringified 1-based integer. May be empty.
   */
  readonly row: string;
  /**
   * Number of column. Stringified 1-based integer. May be empty or null.
   */
  readonly column: string | null;
};

export type AnsiActionEd = AnsiActionEd0 | AnsiActionEd1 | AnsiActionEd2 | AnsiActionEd3;
export type AnsiActionEd0 = {
  readonly actionType: 'ed';
  /**
   * clear from cursor to end of screen
   */
  readonly eraseInDisplayType: '0' | '';
};
export type AnsiActionEd1 = {
  readonly actionType: 'ed';
  /**
   * clear from cursor to beginning of the screen
   */
  readonly eraseInDisplayType: '1';
};
export type AnsiActionEd2 = {
  readonly actionType: 'ed';
  /**
   * clear entire screen
   */
  readonly eraseInDisplayType: '2';
};
export type AnsiActionEd3 = {
  readonly actionType: 'ed';
  /**
   * clear entire screen and delete all lines saved in the scrollback buffer
   */
  readonly eraseInDisplayType: '3';
};

export type AnsiActionEl = AnsiActionEl0 | AnsiActionEl1 | AnsiActionEl2;
export type AnsiActionEl0 = {
  readonly actionType: 'el';
  /**
   * clear from cursor to the end of the line
   */
  readonly eraseInLineType: '0' | '';
};
export type AnsiActionEl1 = {
  readonly actionType: 'el';
  /**
   * clear from cursor to beginning of the line
   */
  readonly eraseInLineType: '1';
};
export type AnsiActionEl2 = {
  readonly actionType: 'el';
  /**
   * clear entire line
   */
  readonly eraseInLineType: '2';
};

/**
 * Scroll Up
 */
export type AnsiActionSu = {
  readonly actionType: 'su';
  /**
   * How much scroll up. Stringified non-negative integer. May be empty.
   */
  readonly n: string;
};
/**
 * Scroll Down
 */
export type AnsiActionSd = {
  readonly actionType: 'sd';
  /**
   * How much scroll down. Stringified non-negative integer. May be empty.
   */
  readonly n: string;
};
/**
 * Horizontal Vertical Position
 */
export type AnsiActionHvp = {
  readonly actionType: 'hvp';
  /**
   * Horizontal value. Stringified non-negative integer. May be empty.
   */
  readonly horizontal: string;
  /**
   * Vertical value. Stringified non-negative integer. May be empty or null.
   */
  readonly vertical: string | null;
};
/**
 * Device Status Report
 */
export type AnsiActionDsr = {
  readonly actionType: 'dsr';
};
/**
 * Save Current Cursor Position
 */
export type AnsiActionScp = {
  readonly actionType: 'scp';
};
/**
 * Restore Saved Cursor Position
 */
export type AnsiActionRcp = {
  readonly actionType: 'rcp';
};

export type AnsiActionBracketedPasteMode = {
  readonly actionType: 'bracketed_paste_mode';
  bracketedPasteMode: boolean;
};

export type AnsiIntensity = 'normal' | 'bold' | 'dim';
export type AnsiBlink = 'off' | 'slow' | 'rapid';
export type AnsiEmojiVariation = 'default' | 'framed' | 'encircled';
export type AnsiScript = 'default' | 'superscript' | 'subscript';
export type AnsiFont = 'default' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'fraktur';
export type AnsiUnderline = 'none' | 'single' | 'double';

export type AnsiFgColor = AnsiColorDefault | AnsiColor4bit | AnsiColor8bit | AnsiColor24bit;
export type AnsiBgColor = AnsiColorDefault | AnsiColor4bit | AnsiColor8bit | AnsiColor24bit;

export type AnsiColorDefault = {
  readonly colorType: 'default';
};

export type ColorName = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';

export type AnsiColor4bit = AnsiColor4bitStandard | AnsiColor4bitHighIntensity;
export type AnsiColor4bitStandard =
  | AnsiColor4bitStandardBlack
  | AnsiColor4bitStandardRed
  | AnsiColor4bitStandardGreen
  | AnsiColor4bitStandardYellow
  | AnsiColor4bitStandardBlue
  | AnsiColor4bitStandardMagenta
  | AnsiColor4bitStandardCyan
  | AnsiColor4bitStandardWhite;
export type AnsiColor4bitStandardBlack = {
  readonly colorType: '4bit';
  readonly color4bitType: 'standard';
  readonly colorName: 'black';
};
export type AnsiColor4bitStandardRed = {
  readonly colorType: '4bit';
  readonly color4bitType: 'standard';
  readonly colorName: 'red';
};
export type AnsiColor4bitStandardGreen = {
  readonly colorType: '4bit';
  readonly color4bitType: 'standard';
  readonly colorName: 'green';
};
export type AnsiColor4bitStandardYellow = {
  readonly colorType: '4bit';
  readonly color4bitType: 'standard';
  readonly colorName: 'yellow';
};
export type AnsiColor4bitStandardBlue = {
  readonly colorType: '4bit';
  readonly color4bitType: 'standard';
  readonly colorName: 'blue';
};
export type AnsiColor4bitStandardMagenta = {
  readonly colorType: '4bit';
  readonly color4bitType: 'standard';
  readonly colorName: 'magenta';
};
export type AnsiColor4bitStandardCyan = {
  readonly colorType: '4bit';
  readonly color4bitType: 'standard';
  readonly colorName: 'cyan';
};
export type AnsiColor4bitStandardWhite = {
  readonly colorType: '4bit';
  readonly color4bitType: 'standard';
  readonly colorName: 'white';
};

export type AnsiColor4bitHighIntensity =
  | AnsiColor4bitHighIntensityBlack
  | AnsiColor4bitHighIntensityRed
  | AnsiColor4bitHighIntensityGreen
  | AnsiColor4bitHighIntensityYellow
  | AnsiColor4bitHighIntensityBlue
  | AnsiColor4bitHighIntensityMagenta
  | AnsiColor4bitHighIntensityCyan
  | AnsiColor4bitHighIntensityWhite;
export type AnsiColor4bitHighIntensityBlack = {
  readonly colorType: '4bit';
  readonly color4bitType: 'high_intensity';
  readonly colorName: 'black';
};
export type AnsiColor4bitHighIntensityRed = {
  readonly colorType: '4bit';
  readonly color4bitType: 'high_intensity';
  readonly colorName: 'red';
};
export type AnsiColor4bitHighIntensityGreen = {
  readonly colorType: '4bit';
  readonly color4bitType: 'high_intensity';
  readonly colorName: 'green';
};
export type AnsiColor4bitHighIntensityYellow = {
  readonly colorType: '4bit';
  readonly color4bitType: 'high_intensity';
  readonly colorName: 'yellow';
};
export type AnsiColor4bitHighIntensityBlue = {
  readonly colorType: '4bit';
  readonly color4bitType: 'high_intensity';
  readonly colorName: 'blue';
};
export type AnsiColor4bitHighIntensityMagenta = {
  readonly colorType: '4bit';
  readonly color4bitType: 'high_intensity';
  readonly colorName: 'magenta';
};
export type AnsiColor4bitHighIntensityCyan = {
  readonly colorType: '4bit';
  readonly color4bitType: 'high_intensity';
  readonly colorName: 'cyan';
};
export type AnsiColor4bitHighIntensityWhite = {
  readonly colorType: '4bit';
  readonly color4bitType: 'high_intensity';
  readonly colorName: 'white';
};

export type AnsiColor8bit = AnsiColor8bitStandard | AnsiColor8bitHighIntensity | AnsiColor8Rgb | AnsiColor8Grayscale;
export type AnsiColor8bitStandard =
  | AnsiColor8bitStandardBlack
  | AnsiColor8bitStandardRed
  | AnsiColor8bitStandardGreen
  | AnsiColor8bitStandardYellow
  | AnsiColor8bitStandardBlue
  | AnsiColor8bitStandardMagenta
  | AnsiColor8bitStandardCyan
  | AnsiColor8bitStandardWhite;
export type AnsiColor8bitStandardBlack = {
  readonly colorType: '8bit';
  readonly color8bitType: 'standard';
  readonly colorName: 'black';
};
export type AnsiColor8bitStandardRed = {
  readonly colorType: '8bit';
  readonly color8bitType: 'standard';
  readonly colorName: 'red';
};
export type AnsiColor8bitStandardGreen = {
  readonly colorType: '8bit';
  readonly color8bitType: 'standard';
  readonly colorName: 'green';
};
export type AnsiColor8bitStandardYellow = {
  readonly colorType: '8bit';
  readonly color8bitType: 'standard';
  readonly colorName: 'yellow';
};
export type AnsiColor8bitStandardBlue = {
  readonly colorType: '8bit';
  readonly color8bitType: 'standard';
  readonly colorName: 'blue';
};
export type AnsiColor8bitStandardMagenta = {
  readonly colorType: '8bit';
  readonly color8bitType: 'standard';
  readonly colorName: 'magenta';
};
export type AnsiColor8bitStandardCyan = {
  readonly colorType: '8bit';
  readonly color8bitType: 'standard';
  readonly colorName: 'cyan';
};
export type AnsiColor8bitStandardWhite = {
  readonly colorType: '8bit';
  readonly color8bitType: 'standard';
  readonly colorName: 'white';
};

export type AnsiColor8bitHighIntensity =
  | AnsiColor8bitHighIntensityBlack
  | AnsiColor8bitHighIntensityRed
  | AnsiColor8bitHighIntensityGreen
  | AnsiColor8bitHighIntensityYellow
  | AnsiColor8bitHighIntensityBlue
  | AnsiColor8bitHighIntensityMagenta
  | AnsiColor8bitHighIntensityCyan
  | AnsiColor8bitHighIntensityWhite;
export type AnsiColor8bitHighIntensityBlack = {
  readonly colorType: '8bit';
  readonly color8bitType: 'high_intensity';
  readonly colorName: 'black';
};
export type AnsiColor8bitHighIntensityRed = {
  readonly colorType: '8bit';
  readonly color8bitType: 'high_intensity';
  readonly colorName: 'red';
};
export type AnsiColor8bitHighIntensityGreen = {
  readonly colorType: '8bit';
  readonly color8bitType: 'high_intensity';
  readonly colorName: 'green';
};
export type AnsiColor8bitHighIntensityYellow = {
  readonly colorType: '8bit';
  readonly color8bitType: 'high_intensity';
  readonly colorName: 'yellow';
};
export type AnsiColor8bitHighIntensityBlue = {
  readonly colorType: '8bit';
  readonly color8bitType: 'high_intensity';
  readonly colorName: 'blue';
};
export type AnsiColor8bitHighIntensityMagenta = {
  readonly colorType: '8bit';
  readonly color8bitType: 'high_intensity';
  readonly colorName: 'magenta';
};
export type AnsiColor8bitHighIntensityCyan = {
  readonly colorType: '8bit';
  readonly color8bitType: 'high_intensity';
  readonly colorName: 'cyan';
};
export type AnsiColor8bitHighIntensityWhite = {
  readonly colorType: '8bit';
  readonly color8bitType: 'high_intensity';
  readonly colorName: 'white';
};

/**
 * RGB color. 6 x 6 x 6 = 216 colors.
 */
export type AnsiColor8Rgb = {
  readonly colorType: '8bit';
  readonly color8bitType: 'rgb';
  /**
   * from 0 to 5
   */
  readonly r: number;
  /**
   * from 0 to 5
   */
  readonly g: number;
  /**
   * from 0 to 5
   */
  readonly b: number;
};

/**
 * Grayscale color. From black to white in 24 steps.
 */
export type AnsiColor8Grayscale = {
  readonly colorType: '8bit';
  readonly color8bitType: 'grayscale';
  /**
   * From 0 to 23.
   * 0 for black and 23 for white.
   */
  readonly lightness: number;
};

export type AnsiColor24bit = {
  readonly colorType: '24bit';
  /**
   * 8bit value(from 0 to 255)
   */
  readonly r: number;
  /**
   * 8bit value(from 0 to 255)
   */
  readonly g: number;
  /**
   * 8bit value(from 0 to 255)
   */
  readonly b: number;
};
