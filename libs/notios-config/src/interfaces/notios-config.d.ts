// Config Interface Rule:
// - This should be compatible in long term.
//   Do not remove properties even if major bumped.
// - This is because to configure various versions of
//   notios with single config file.
// - The identical property should mean the identical
//   functionality all over the time.

// NOTE:
//   Creating the other property that means the same
//   function in different notios versions.
//   For example, renaming property name. Old property
//   MUST be remained because of avobe rule.

import {
  NotiosHelpAction,
  NotiosInspectProcAction,
  NotiosSelectScriptAction,
  NotiosTreeProcsAction,
} from '../action_definitions';
import { specialKeyNames } from '../special_key_names';

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
    | '~'
    | ' ';
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

declare const notiosConfigV1KeymappingSymbol: unique symbol;

declare const notiosConfigV1KeymappingCommonSymbol: unique symbol;
declare const notiosConfigV1KeymappingInspectProcSymbol: unique symbol;
declare const notiosConfigV1KeymappingTreeProcsSymbol: unique symbol;
declare const notiosConfigV1KeymappingSelectScriptSymbol: unique symbol;
declare const notiosConfigV1KeymappingHelpSymbol: unique symbol;

type NotiosConfigV1Keymapping = {
  [notiosConfigV1KeymappingSymbol]: unknown;
  common: Record<NotiosCommonAction | typeof notiosConfigV1KeymappingCommonSymbol, NotiosConfigActionKeymapping>;
  'inspect-proc': Record<
    NotiosInspectProcAction | typeof notiosConfigV1KeymappingInspectProcSymbol,
    NotiosConfigActionKeymapping
  >;
  'tree-procs': Record<
    NotiosTreeProcsAction | typeof notiosConfigV1KeymappingTreeProcsSymbol,
    NotiosConfigActionKeymapping
  >;
  'select-script': Record<
    NotiosSelectScriptAction | typeof notiosConfigV1KeymappingSelectScriptSymbol,
    NotiosConfigActionKeymapping
  >;
  help: Record<NotiosHelpAction | typeof notiosConfigV1KeymappingHelpSymbol, NotiosConfigActionKeymapping>;
};

declare const notiosConfigV1Symbol: unique symbol;
export type NotiosConfigV1 = {
  [notiosConfigV1Symbol]: unknown;
  keymappings: NotiosConfigV1Keymapping;
  paragraphSize: number;
  wordSize: number;
  showTimestampByDefault: boolean;
  showLabelByDefault: boolean;
  showScriptCommandInSelectScript: boolean;
  showScriptCommandInTreeProcs: boolean;
};

declare const notiosConfigSymbol: unique symbol;
export type NotiosConfig = {
  [notiosConfigSymbol]: unknown;
  v1: NotiosConfigV1;
};
