export const hintSymbol = Symbol('error hint');

export const tryWithHint = <T>(f: () => T, hint: string): T => {
  try {
    return f();
  } catch (e: unknown) {
    throw Object.assign(e, {
      [hintSymbol]: hint,
    });
  }
};

export const catchWithHint = (f: () => void) => {
  try {
    f();
  } catch (e: unknown) {
    if (e instanceof Error && hintSymbol in e) {
      const hint = (e as any)[hintSymbol];
      // eslint-disable-next-line no-console
      console.error(hint);
    } else {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    process.exit(1);
  }
};
