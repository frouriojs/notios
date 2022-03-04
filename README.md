# SCUI

[![Luma Style Guide](https://img.shields.io/badge/styled%20with-luma-%23c5ebeb?style=flat-square)](https://github.com/luma-dev/luma-style-guide#readme)

**WARNING**: Under development.

![scui_demo1](https://user-images.githubusercontent.com/29811106/156586923-e36b8eb9-41de-46fa-a6a6-760c0be42200.gif)

## Usage

### For `npm-run-all` users

Just uninstall `npm-run-all` and install `@luma-sandbox/scui`.

```sh
npm remove npm-run-all
npm install -D @luma-sandbox/scui
```

Binaries (`run-p`, `run-s` and `npm-run-all`) behavies perfectly the same as `npm-run-all` unless starting from `scui`.

As an other option, you can keep `npm-run-all` with using `srun-p`, `srun-s` and `snpm-run-all` binaries.

## Imcompatibility

- Flags other than `-s` and `-p` in `npm-run-app` are not supported when starting from `scui`.

## DONE

- [x] `run-s` replace
- [x] `run-p` replace
- [x] `npm-run-all` replace
- [x] restart in tree
- [x] detect package manager type

## TODO

- [ ] expand all
- [ ] stat process to view details from tree
  - when started
  - what npm client used
  - pid
- [ ] kill running process
- [ ] remove/hide done process from tree
- [ ] support `pnpm --filter` compat like `npm-run-filter`
- [ ] search
- [ ] scroll
- [ ] vertical scroll
- [ ] line wrap
- [ ] restart in inspect
- [ ] reload manifest
- [ ] keymapping support
- [ ] toggle timestamp
- [ ] show last update timestamp
- [ ] show more info in inspect
- [ ] clear log
  - [ ] clear all
  - [ ] clear all except last xxx lines
  - [ ] auto trim
