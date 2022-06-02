export interface Action {
  description: string;
}

const defineAction = (action: Action) => {
  return action;
};

const commonActions = {
  exit: defineAction({
    description: 'Exit notios app.',
  }),
} as const;

const helpActions = {
  back: defineAction({
    description: 'Close help page.',
  }),
  'scroll-down-line': defineAction({
    description: 'Scroll down by single line.',
  }),
  'scroll-up-line': defineAction({
    description: 'Scroll up by single line.',
  }),
  'scroll-down-paragraph': defineAction({
    description: 'Scroll down by paragraph size which can be configured(deafult=5).',
  }),
  'scroll-up-paragraph': defineAction({
    description: 'Scroll up by paragraph size which can be configured(deafult=5).',
  }),
  'scroll-down-page': defineAction({
    description: 'Scroll down by number of lines of visually shown page.',
  }),
  'scroll-up-page': defineAction({
    description: 'Scroll up by number of lines of visually shown page.',
  }),
  'scroll-down-half-page': defineAction({
    description: 'Scroll down by half number of lines of visually shown page.',
  }),
  'scroll-up-half-page': defineAction({
    description: 'Scroll down by half number of lines of visually shown page.',
  }),
  'scroll-to-bottom': defineAction({
    description: 'Scroll down to the bottom(latest) of messages.',
  }),
  'scroll-to-top': defineAction({ description: 'Scroll down to the top(oldest) of messages.' }),
} as const;

const inspectProcActions = {
  back: defineAction({
    description: 'Back to tree-procs page.',
  }),
  'scroll-down-line': defineAction({
    description: 'Scroll down by single line.',
  }),
  'scroll-up-line': defineAction({
    description: 'Scroll up by single line.',
  }),
  'scroll-down-paragraph': defineAction({
    description: 'Scroll down by paragraph size which can be configured(deafult=5).',
  }),
  'scroll-up-paragraph': defineAction({
    description: 'Scroll up by paragraph size which can be configured(deafult=5).',
  }),
  'scroll-down-page': defineAction({
    description: 'Scroll down by number of lines of visually shown page.',
  }),
  'scroll-up-page': defineAction({
    description: 'Scroll up by number of lines of visually shown page.',
  }),
  'scroll-down-half-page': defineAction({
    description: 'Scroll down by half number of lines of visually shown page.',
  }),
  'scroll-up-half-page': defineAction({
    description: 'Scroll down by half number of lines of visually shown page.',
  }),
  'scroll-to-bottom': defineAction({
    description: 'Scroll down to the bottom(latest) of messages.',
  }),
  'scroll-to-top': defineAction({ description: 'Scroll down to the top(oldest) of messages.' }),
  'scroll-to-leftmost': defineAction({
    description: 'Scroll to the beggining of lines.',
  }),
  'scroll-right-char': defineAction({
    description: 'Scroll right by single char.',
  }),
  'scroll-left-char': defineAction({
    description: 'Scroll left by single char.',
  }),
  'scroll-right-word': defineAction({
    description: 'Scroll right by word size which can be configured(deafult=5).',
  }),
  'scroll-left-word': defineAction({
    description: 'Scroll left by word size which can be configured(deafult=5).',
  }),
  'toggle-timestamp': defineAction({
    description: 'Toggle timestamp view.',
  }),
  'toggle-lable': defineAction({
    description: 'Toggle label view. Note that <out>/<err> messages does not have label.',
  }),
} as const;

const treeProcsActions = {
  'cursor-prev': defineAction({
    description: 'Cursor prev.',
  }),
  'cursor-next': defineAction({
    description: 'Cursor next.',
  }),
  'select-script': defineAction({
    description: 'Go to select-script page.',
  }),
  expand: defineAction({
    description: 'Expand process node under the cursor.',
  }),
  collapse: defineAction({
    description: 'Collapse process node under the cursor.',
  }),
  restart: defineAction({
    description: 'Restart process node under the cursor if possible.',
  }),
  'restart-recrusive': defineAction({
    description: 'Restart processes of all node of subtree of node under the cursor.',
  }),
  kill: defineAction({
    description: 'Kill process node under the cursor if possible.',
  }),
  'kill-recrusive': defineAction({
    description: 'Kill processes of all node of subtree of node under the cursor.',
  }),
  inspect: defineAction({
    description: 'Inspect process node under the cursor.',
  }),
} as const;

const selectScriptActions = {
  back: defineAction({
    description: 'Back to tree-procs page.',
  }),
  'cursor-prev': defineAction({
    description: 'Cursor prev.',
  }),
  'cursor-next': defineAction({
    description: 'Cursor next.',
  }),
  'start-and-back': defineAction({
    description: 'Start script under the cursor and back to tree-procs.',
  }),
  start: defineAction({
    description: 'Just start script under the cursor.',
  }),
} as const;

export const pageActions = {
  common: commonActions,
  'inspect-proc': inspectProcActions,
  'tree-procs': treeProcsActions,
  'select-script': selectScriptActions,
  help: helpActions,
} as const;

export const actionablePages = ['common', 'inspect-proc', 'tree-procs', 'select-script', 'help'] as const;

// This is not the same as Page.
export type ActionablePage = keyof typeof pageActions;

export type NotiosCommonAction = keyof typeof commonActions;
export type NotiosInspectProcAction = keyof typeof inspectProcActions;
export type NotiosTreeProcsAction = keyof typeof treeProcsActions;
export type NotiosSelectScriptAction = keyof typeof selectScriptActions;
export type NotiosHelpAction = keyof typeof helpActions;
