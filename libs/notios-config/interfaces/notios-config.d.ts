import {
  NotiosHelpAction,
  NotiosInspectProcAction,
  NotiosSelectScriptAction,
  NotiosTreeProcsAction,
} from '../src/action_definitions';
import { specialKeyNames } from '../src/special_key_names';

// TODO: dirty monkey patch for ink
type ExtraSpecialKeyName = 'home' | 'end';

export type SpecialKeyName = typeof specialKeyNames[number] | ExtraSpecialKeyName;

export type NotiosConfigKeymappingSpecial = {
  type: 'special';
  special: SpecialKeyName;
  shift?: boolean;
  ctrl?: boolean;
};
export type NotiosConfigKeymappingChar = {
  type: 'char';
  char:
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | 'a'
    | 'b'
    | 'c'
    | 'd'
    | 'e'
    | 'f'
    | 'g'
    | 'h'
    | 'i'
    | 'j'
    | 'k'
    | 'l'
    | 'm'
    | 'n'
    | 'l'
    | 'o'
    | 'p'
    | 'q'
    | 'r'
    | 's'
    | 't'
    | 'u'
    | 'v'
    | 'w'
    | 'x'
    | 'y'
    | 'z'
    | '!'
    | '@'
    | '#'
    | '$'
    | '%'
    | '^'
    | '&'
    | '*'
    | '('
    | ')'
    | '_'
    | '-'
    | '+'
    | '|'
    | '='
    | '\\'
    | '"'
    | "'"
    | '['
    | ']'
    | '/'
    | '.'
    | ','
    | '{'
    | '}'
    | '<'
    | '>'
    | '?'
    | ':'
    | ';'
    | '`'
    | '~';
  shift?: boolean;
  ctrl?: boolean;
  meta?: boolean;
};
export type NotiosConfigKeymappingSeq = {
  type: 'seq';
  seq: Array<NotiosConfigKeymappingSpecial | NotiosConfigKeymappingChar>;
  shift?: boolean;
  ctrl?: boolean;
  meta?: boolean;
};

export type NotiosConfigKeymapping = NotiosConfigKeymappingSpecial | NotiosConfigKeymappingChar;

export type NotiosConfigKeymappingRoot =
  | NotiosConfigKeymappingSpecial
  | NotiosConfigKeymappingChar
  | NotiosConfigKeymappingSeq;

export type NotiosConfigActionKeymapping = ReadonlyArray<NotiosConfigKeymappingRoot>;

export type NotiosConfigActionKeymappings<T extends string> = {
  [notiosAction in T]?: NotiosConfigActionKeymapping;
};

export type NotiosConfig = {
  keymappings: {
    'inspect-proc': NotiosConfigActionKeymappings<NotiosInspectProcAction>;
    'tree-procs': NotiosConfigActionKeymappings<NotiosTreeProcsAction>;
    'select-script': NotiosConfigActionKeymappings<NotiosSelectScriptAction>;
    help: NotiosConfigActionKeymappings<NotiosHelpAction>;
  };
  paragraphSize: number;
  wordSize: number;
  showTimestampByDefault: boolean;
  showLabelByDefault: boolean;
  showScriptCommandInSelectScript: boolean;
  showScriptCommandInTreeProcs: boolean;
};
