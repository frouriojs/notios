<br />
<img src="https://raw.githubusercontent.com/frouriojs/notios/main/docs/assets/images/ogp.svg" width="1280" alt="notios" />

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
  <img src="https://raw.githubusercontent.com/frouriojs/notios/main/docs/assets/images/demo.gif" width="1280" alt="notios demo" />
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

## Configuration

Notios can be configured with user level config file. Please `npx notios --help` to check default config file location or explicitly specify the location by `--config` flag.

Project level configuration is not recommended.

For linux users, `~/.config/notios/notios.config.cjs` is the default location of configuration.

```bash
mkdir -p ~/.config/notios
cd ~/.config/notios
npm init -y
npm i @notios/config@latest
```

Then edit `~/.config/notios/notios.config.cjs` like following.

```js
// @ts-check
const { defineNotiosConfig } = require('@notios/config');

module.exports = defineNotiosConfig((defaultConfig) => ({
  ...defaultConfig,
  v1: {
    ...defaultConfig.v1,

    // your configurations...

    // Example for the configuration to show timestamp by default.
    showTimestampByDefault: true,

    // Following is just an example for keymapping.

    keymappings: {
      ...defaultConfig.v1.keymappings,
      "tree-procs": {
        ...defaultConfig.v1.keymappings["tree-procs"],

        // My original safe kill keymapping [CTRL-X then CTRL-X]
        kill: [
          {
            type: "seq",
            seq: [
              {
                type: "char",
                char: "x",
                ctrl: true,
              },
              {
                type: "char",
                char: "x",
                ctrl: true,
              },
            ],
          }
        ],

        // Add my own keymapping [CTRL-R] for restart over the default keymapping
        restart: [
          ...defaultConfig.v1.keymappings["tree-procs"].restart,
          {
            type: "char",
            char: "r",
            ctrl: true,
          }
        ],
      },

      // Common keymappings should be avoided confliction with any other keymappings
      common: {
        ...defaultConfig.v1.keymappings.common,

        // Change exit mapping from [CTRL-C] to [CTRL-Q]
        exit: [
          {
            type: "char",
            char: "q",
            ctrl: true,
          }
        ],
      },
    },
  },
}));
```

Utility `defineNotiosConfig` enables you use completion and not necessary. Directive `// @ts-check` enables you write configuration type-safely.

Notios never fallbacks to any value of configuration to default values. You should use `defaultConfig` to explicitly specify what and how you want to fallback.
Spreading in any nesting level like `...defaultConfig.v1,` is necessary to make your configuration working properly for various notios versions.

Until the detailed documatation is ready, please refer to the [default configuration](https://github.com/frouriojs/notios/blob/main/src/constants/default_config.ts).

