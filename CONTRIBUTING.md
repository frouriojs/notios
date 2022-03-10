Thank you for your contribution.

## Initialize

```
pnpm i
```

## Development cycle

```
pnpm exec ts-node -T ./src/entrypoints/main.ts --manifest ./examples/foo/package.json
```

```
cd examples/foo
pnpm exec notios
```

You can set `NOTIOS_DO_NOT_ALTERNATE=1` to prevent alternating terminal.

```
NOTIOS_DO_NOT_ALTERNATE=1 pnpm exec notios
```

### dump

It's very difficult to `console.log` debug.
You can use following debug function.

```js
export const dump = (obj: unknown) => {
  const fs = require('fs');
  const util = require('util');
  const path = require('path');
  const { homedir } = require('os');
  const debugLogFile = path.resolve(homedir(), 'notios-debug.log');

  fs.appendFileSync(debugLogFile, `${new Date().toLocaleTimeString()}: ${util.inspect(obj)}\n`);
};
```

Please do not commit this function.

Following snippet is also useful.

`echo > ~/notios-debug.log; pnpm exec notios`

## Create PR

### Changeset

Before creating PR, please create changeset log.

1. Run `pnpm changeset`
2. Select `notios`
3. Select necessary version bump.
4. Write summary of your changes.
5. Push if necessary.

It's ok whenever to run this.
