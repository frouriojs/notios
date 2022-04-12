export type AnsiParser = {
  readonly waitingBytes: Uint8Array;
};

// export type AnsiStyleTerminal = {
//   readonly cursorVisibility: boolean | null;
//   readonly auxPort: boolean | null;
//   readonly fgColor: AnsiFgColor | null;
//   readonly bgColor: AnsiBgColor | null;
//   readonly intensity: AnsiIntensity | null;
//   readonly italic: boolean | null;
//   readonly underlined: boolean | null;
//   readonly blink: AnsiBlink | null;
//   readonly invert: boolean | null;
//   readonly hide: boolean | null;
//   readonly strike: boolean | null;
//   readonly font: AnsiFont | null;
//   readonly doublyUnderlined: boolean | null;
//   readonly frame: boolean | null;
//   readonly encircled: boolean | null;
//   readonly overlined: boolean | null;
//   readonly superscript: boolean | null;
//   readonly subscript: boolean | null;
//   readonly alternatScreen: boolean | null;
// } | null;
