import defineNotiosConfig from './define_notios_config';

// NOTE: Cannot distinguish Tab from C-Tab. Same for S-Tab.
// NOTE: Cannot distinguish <Special Keys> from M-<Special Keys>.

const enterCommon = [
  // general
  {
    type: 'special',
    special: 'return',
  },
  // terminal
  {
    type: 'char',
    char: 'm',
    ctrl: true,
  },
] as const;

const prevCommon = [
  // general
  {
    type: 'special',
    special: 'upArrow',
  },
  {
    type: 'special',
    special: 'tab',
    shift: true,
  },
  {
    type: 'special',
    special: 'tab',
    ctrl: true,
    shift: true,
  },
  {
    type: 'char',
    char: 'i',
    ctrl: true,
    shift: true,
  },
  // vim/less
  {
    type: 'char',
    char: 'k',
  },
  // emacs
  {
    type: 'char',
    char: 'n',
    ctrl: true,
  },
] as const;

const nextCommon = [
  // general
  {
    type: 'special',
    special: 'downArrow',
  },
  {
    type: 'special',
    special: 'tab',
  },
  {
    type: 'special',
    special: 'tab',
    ctrl: true,
  },
  {
    type: 'char',
    char: 'i',
    ctrl: true,
  },
  // vim/less
  {
    type: 'char',
    char: 'j',
  },
  // emacs
  {
    type: 'char',
    char: 'p',
    ctrl: true,
  },
] as const;

const leftCommon = [
  // general
  {
    type: 'special',
    special: 'leftArrow',
  },
  // vim/less
  {
    type: 'char',
    char: 'h',
  },
  // emacs
  {
    type: 'char',
    ctrl: true,
    char: 'b',
  },
] as const;

const rightCommon = [
  // general
  {
    type: 'special',
    special: 'rightArrow',
  },
  // vim/less
  {
    type: 'char',
    char: 'l',
  },
  // emacs
  {
    type: 'char',
    ctrl: true,
    char: 'f',
  },
] as const;

// Take care that in some environment 'delete' should be used for 'backspace'.
const backCommon = [
  // general
  {
    type: 'special',
    special: 'backspace',
  },
  {
    type: 'special',
    special: 'delete',
  },
  // terminal
  {
    type: 'char',
    char: 'h',
    ctrl: true,
  },
  // less
  {
    type: 'char',
    char: 'q',
  },
  // vim
  {
    type: 'char',
    char: 'o',
    ctrl: true,
  },
  // emacs
] as const;

const scrollDownLineCommon = [
  // general
  {
    type: 'special',
    special: 'downArrow',
  },
  // vim/less
  {
    type: 'char',
    char: 'j',
  },
  {
    type: 'char',
    ctrl: true,
    char: 'e',
  },
  // emacs
  {
    type: 'char',
    ctrl: true,
    char: 'n',
  },
] as const;

const scrollUpLineCommon = [
  // general
  {
    type: 'special',
    special: 'upArrow',
  },
  // vim/less
  {
    type: 'char',
    char: 'k',
  },
  {
    type: 'char',
    ctrl: true,
    char: 'y',
  },
  // emacs
  {
    type: 'char',
    ctrl: true,
    char: 'p',
  },
] as const;

const scrollDownParagraphCommon = [
  // general
  {
    type: 'special',
    special: 'downArrow',
    ctrl: true,
  },
  // vim/less
  // emacs
] as const;

const scrollUpParagraphCommon = [
  // general
  {
    type: 'special',
    special: 'upArrow',
    ctrl: true,
  },
  // vim/less
  // emacs
] as const;

const scrollDownPageCommon = [] as const;

const scrollUpPageCommon = [] as const;

const scrollDownHalfPageCommon = [
  // general
  {
    type: 'special',
    special: 'pageDown',
  },
  // vim/less
  {
    type: 'char',
    char: 'd',
  },
  // emacs
] as const;

const scrollUpHalfPageCommon = [
  // general
  {
    type: 'special',
    special: 'pageUp',
  },
  // vim/less
  {
    type: 'char',
    char: 'u',
  },
  // emacs
] as const;

const scrollToBottomCommon = [
  // general
  {
    type: 'special',
    special: 'end',
    ctrl: true,
  },
  // vim/less
  {
    type: 'char',
    char: 'g',
    shift: true,
  },
  // emacs
] as const;

const scrollToTopCommon = [
  // general
  {
    type: 'special',
    special: 'home',
    ctrl: true,
  },
  // vim/less
  {
    type: 'char',
    char: 'g',
  },
  // emacs
] as const;

const defaultConfig = {
  keymappings: {
    help: {
      back: backCommon,
      'scroll-down-line': scrollDownLineCommon,
      'scroll-up-line': scrollUpLineCommon,
      'scroll-down-paragraph': scrollDownParagraphCommon,
      'scroll-up-paragraph': scrollUpParagraphCommon,
      'scroll-down-page': scrollDownPageCommon,
      'scroll-up-page': scrollUpPageCommon,
      'scroll-down-half-page': scrollDownHalfPageCommon,
      'scroll-up-half-page': scrollUpHalfPageCommon,
      'scroll-to-bottom': scrollToBottomCommon,
      'scroll-to-top': scrollToTopCommon,
    },
    'tree-procs': {
      'cursor-prev': prevCommon,
      'cursor-next': nextCommon,
      'select-script': [
        {
          type: 'char',
          char: 'n',
        },
      ],
      expand: rightCommon,
      collapse: leftCommon,
      restart: [
        {
          type: 'char',
          char: 'r',
        },
      ],
      kill: [
        {
          type: 'char',
          char: 'x',
        },
      ],
      inspect: enterCommon,
    },
    'select-script': {
      back: backCommon,
      'cursor-prev': prevCommon,
      'cursor-next': nextCommon,
      'start-and-back': [...enterCommon, ...rightCommon],
      start: [],
    },
    'inspect-proc': {
      back: backCommon,
      'scroll-down-line': scrollDownLineCommon,
      'scroll-up-line': scrollUpLineCommon,
      'scroll-down-paragraph': scrollDownParagraphCommon,
      'scroll-up-paragraph': scrollUpParagraphCommon,
      'scroll-down-page': scrollDownPageCommon,
      'scroll-up-page': scrollUpPageCommon,
      'scroll-down-half-page': scrollDownHalfPageCommon,
      'scroll-up-half-page': scrollUpHalfPageCommon,
      'scroll-to-bottom': scrollToBottomCommon,
      'scroll-to-top': scrollToTopCommon,
      'scroll-to-leftmost': [
        // general
        {
          type: 'special',
          special: 'home',
        },
        // vim/less
        {
          type: 'char',
          char: '^',
        },
        {
          type: 'char',
          char: '0',
        },
        // emacs
      ],
      'scroll-right-char': rightCommon,
      'scroll-left-char': leftCommon,
      'scroll-right-word': [
        // general
        {
          type: 'special',
          special: 'rightArrow',
          ctrl: true,
        },
        // vim/less
        {
          type: 'char',
          char: 'e',
        },
        // emacs
        {
          type: 'char',
          meta: true,
          char: 'f',
        },
      ],
      'scroll-left-word': [
        // general
        {
          type: 'special',
          special: 'leftArrow',
          ctrl: true,
        },
        // vim/less
        {
          type: 'char',
          char: 'b',
        },
        // emacs
        {
          type: 'char',
          meta: true,
          char: 'b',
        },
      ],
      'toggle-timestamp': [
        {
          type: 'char',
          char: 't',
        },
      ],
      'toggle-lable': [
        {
          type: 'char',
          char: 'v',
        },
      ],
    },
  },
  paragraphSize: 5,
  wordSize: 5,
  showTimestampByDefault: false,
  showLabelByDefault: true,
  showScriptCommandInSelectScript: true,
  showScriptCommandInTreeProcs: true,
} as const;

// typecheck
() => {
  defineNotiosConfig(defaultConfig);
};

export default defaultConfig;
