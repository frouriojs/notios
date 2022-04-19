<br />
<img src="/docs/assets/images/ogp.svg" width="1280" alt="notios" />

<div align="center">
  <a href="https://www.npmjs.com/package/notios">
    <img src="https://img.shields.io/npm/v/notios" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/notios">
    <img src="https://img.shields.io/npm/dm/notios" alt="npm download" />
  </a>
  <a href="https://github.com/frouriojs/notios/actions?query=workflow%3A%22Test+Build+and+Publish%22">
    <img src="https://github.com/frouriojs/notios/workflows/Test%20Build%20and%20Publish/badge.svg?branch=main" alt="Node.js CI" />
  </a>
  <a href="https://lgtm.com/projects/g/frouriojs/notios/context:javascript">
    <img src="https://img.shields.io/lgtm/grade/javascript/g/frouriojs/notios.svg" alt="Language grade: JavaScript" />
  </a>
</div>

<br />

# Notios

<div align="center">
  <img src="/docs/assets/images/demo.gif" width="1280" alt="notios demo" />
</div>

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

## Incompatibility

- Flags other than `-s` and `-p` in `npm-run-app` are not supported when starting from `notios`.
- Supplying flags over patterns like `run-s 'build:* -- --watch'`.

## Fix npm-run-all version

Notios will check existence of `@notios/npm-run-all`.

```sh
npm i -D @notios/npm-run-all@npm:npm-run-all@${version}

# example for ^3
npm i -D @notios/npm-run-all@npm:npm-run-all@^3
```

Note that you should replace `run-p`, `run-s` and `npm-run-all` with `n-` prefixed ones.
