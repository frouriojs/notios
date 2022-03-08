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

```sh
# Show help.
npx notios --help

# Start UI.
npx notios

# Or specify script name.
npx notios dev
```

## Imcompatibility

- Flags other than `-s` and `-p` in `npm-run-app` are not supported when starting from `notios`.

## Fix npm-run-all version

Notios will check existence of `@notios/npm-run-all`.

```sh
npm i -D @notios/npm-run-all@npm:npm-run-all@${version}

# example for ^3
npm i -D @notios/npm-run-all@npm:npm-run-all@^3
```

Note that you should replace `run-p`, `run-s` and `npm-run-all` with `n-` prefixed ones.
