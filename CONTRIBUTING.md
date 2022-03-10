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

## Create PR

### Changeset

Before creating PR, please create changeset log.

1. Run `pnpm changeset`
2. Select `notios`
3. Select necessary version bump.
4. Write summary of your changes.
5. Push if necessary.

It's ok whenever to run this.
