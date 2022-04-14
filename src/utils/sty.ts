import type {
  AnsiAction,
  AnsiActionBgColor,
  AnsiActionBlink,
  AnsiActionEmojiVariation,
  AnsiActionFgColor,
  AnsiActionFont,
  AnsiActionHide,
  AnsiActionIntensity,
  AnsiActionInvert,
  AnsiActionItalic,
  AnsiActionOverlined,
  AnsiActionPropositonalSpacing,
  AnsiActionScript,
  AnsiActionStrike,
  AnsiActionUnderline,
} from 'ansi-parser/interfaces/ansi-action';
import { encodeAnsiAction } from 'ansi-parser/src';

export type StyContext = Partial<
  Omit<AnsiActionFgColor, 'actionType'> &
    Omit<AnsiActionBgColor, 'actionType'> &
    Omit<AnsiActionIntensity, 'actionType'> &
    Omit<AnsiActionItalic, 'actionType'> &
    Omit<AnsiActionUnderline, 'actionType'> &
    Omit<AnsiActionBlink, 'actionType'> &
    Omit<AnsiActionInvert, 'actionType'> &
    Omit<AnsiActionHide, 'actionType'> &
    Omit<AnsiActionStrike, 'actionType'> &
    Omit<AnsiActionFont, 'actionType'> &
    Omit<AnsiActionPropositonalSpacing, 'actionType'> &
    Omit<AnsiActionEmojiVariation, 'actionType'> &
    Omit<AnsiActionOverlined, 'actionType'> &
    Omit<AnsiActionScript, 'actionType'>
>;

export interface StyLine {
  context: StyContext;
}

export const defaultStyContext = (): StyContext => {
  return {};
};

export const applyActionToSty = (sty: StyContext, action: AnsiAction): StyContext => {
  switch (action.actionType) {
    case 'reset':
      return {};
    case 'fg_color':
      return {
        ...sty,
        fgColor: action.fgColor,
      };
    case 'bg_color':
      return {
        ...sty,
        bgColor: action.bgColor,
      };
    case 'intensity':
      return {
        ...sty,
        intensity: action.intensity,
      };
    case 'italic':
      return {
        ...sty,
        italic: action.italic,
      };
    case 'underline':
      return {
        ...sty,
        underline: action.underline,
      };
    case 'blink':
      return {
        ...sty,
        blink: action.blink,
      };
    case 'invert':
      return {
        ...sty,
        invert: action.invert,
      };
    case 'hide':
      return {
        ...sty,
        hide: action.hide,
      };
    case 'strike':
      return {
        ...sty,
        strike: action.strike,
      };
    case 'font':
      return {
        ...sty,
        font: action.font,
      };
    case 'propositional_spacing':
      return {
        ...sty,
        propositionalSpacing: action.propositionalSpacing,
      };
    case 'emoji_variation':
      return {
        ...sty,
        emojiVariation: action.emojiVariation,
      };
    case 'overlined':
      return {
        ...sty,
        overlined: action.overlined,
      };
    case 'script':
      return {
        ...sty,
        script: action.script,
      };
    default:
      return sty;
  }
};

export const applyActionsToSty = (sty: StyContext, actions: readonly AnsiAction[]): StyContext => {
  let rsty = sty;
  actions.forEach((action) => {
    rsty = applyActionToSty(sty, action);
  });
  return rsty;
};

export const restoreSty = (sty: StyContext): Uint8Array => {
  const bytes: number[] = [
    ...encodeAnsiAction({
      actionType: 'reset',
    }),
  ];
  if (sty.fgColor !== undefined) {
    bytes.push(
      ...encodeAnsiAction({
        actionType: 'fg_color',
        fgColor: sty.fgColor,
      }),
    );
  }
  if (sty.bgColor !== undefined) {
    bytes.push(
      ...encodeAnsiAction({
        actionType: 'bg_color',
        bgColor: sty.bgColor,
      }),
    );
  }
  if (sty.intensity !== undefined) {
    bytes.push(
      ...encodeAnsiAction({
        actionType: 'intensity',
        intensity: sty.intensity,
      }),
    );
  }
  if (sty.italic !== undefined) {
    bytes.push(
      ...encodeAnsiAction({
        actionType: 'italic',
        italic: sty.italic,
      }),
    );
  }
  if (sty.underline !== undefined) {
    bytes.push(
      ...encodeAnsiAction({
        actionType: 'underline',
        underline: sty.underline,
      }),
    );
  }
  if (sty.blink !== undefined) {
    bytes.push(
      ...encodeAnsiAction({
        actionType: 'blink',
        blink: sty.blink,
      }),
    );
  }
  if (sty.invert !== undefined) {
    bytes.push(
      ...encodeAnsiAction({
        actionType: 'invert',
        invert: sty.invert,
      }),
    );
  }
  if (sty.hide !== undefined) {
    bytes.push(
      ...encodeAnsiAction({
        actionType: 'hide',
        hide: sty.hide,
      }),
    );
  }
  if (sty.strike !== undefined) {
    bytes.push(
      ...encodeAnsiAction({
        actionType: 'strike',
        strike: sty.strike,
      }),
    );
  }
  if (sty.propositionalSpacing !== undefined) {
    bytes.push(
      ...encodeAnsiAction({
        actionType: 'propositional_spacing',
        propositionalSpacing: sty.propositionalSpacing,
      }),
    );
  }
  if (sty.emojiVariation !== undefined) {
    bytes.push(
      ...encodeAnsiAction({
        actionType: 'emoji_variation',
        emojiVariation: sty.emojiVariation,
      }),
    );
  }
  if (sty.overlined !== undefined) {
    bytes.push(
      ...encodeAnsiAction({
        actionType: 'overlined',
        overlined: sty.overlined,
      }),
    );
  }
  if (sty.script !== undefined) {
    bytes.push(
      ...encodeAnsiAction({
        actionType: 'script',
        script: sty.script,
      }),
    );
  }
  return Uint8Array.from(bytes);
};
