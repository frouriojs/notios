# Notios

[![Luma Style Guide](https://img.shields.io/badge/styled%20with-luma-%23c5ebeb?style=flat-square)](https://github.com/luma-dev/luma-style-guide#readme)

**WARNING**: Under development.

![](https://user-images.githubusercontent.com/29811106/156586923-e36b8eb9-41de-46fa-a6a6-760c0be42200.gif)

## Setup

### For `npm-run-all` users

Just uninstall `npm-run-all` and install `notios`.

```sh
npm remove npm-run-all
npm install -D notios
```

Binaries (`n-run-p`, `n-run-s` and `n-npm-run-all`) behavies perfectly the same as `npm-run-all` unless starting from `notios`.

As an other option, you can keep `npm-run-all` with using `n-run-p`, `n-run-s` and `n-npm-run-all` binaries.

## Usage

```
# Show help.
npx notios --help

# Start UI.
npx notios

# Or specify script name.
npx notios dev
```

## Imcompatibility

- Flags other than `-s` and `-p` in `npm-run-app` are not supported when starting from `notios`.

## DONE

- [x] `run-s` replace
- [x] `run-p` replace
- [x] `npm-run-all` replace
- [x] restart in tree
- [x] detect package manager type
- [x] run script soon by CLI
- [x] color management

## TODO

- [ ] scroll
- [ ] kill running process
- [ ] expand all
- [ ] stat process to view details from tree
  - when started
  - what npm client used
  - pid
- [ ] remove/hide done process from tree
- [ ] support `pnpm --filter` compat like `npm-run-filter`
- [ ] search
- [ ] horizontal scroll
- [ ] line wrap
- [ ] restart in inspect
- [ ] reload manifest
- [ ] keymapping support
- [ ] toggle timestamp
- [ ] toggle label in merged log
- [ ] show last update timestamp
- [ ] show more info in inspect
- [ ] clear log
  - [ ] clear all
  - [ ] clear all except last xxx lines
  - [ ] auto trim
- [ ] log history management
- [ ] write logs to file from tree
- [ ] previous logs
  - toggle? (show/hide)

- Real cases test
  - [ ] next dev
  - [ ] nuxt dev
  - [ ] vite dev
  - [ ] react-scripts
  - [ ] remix
  - [ ] jest (--watch)
  - [ ] vitest (--watch)
  - [ ] ava (--watch)
  - [ ] mocha (--watch)
