const configureBase = require('@luma-dev/eslint-config-base/configure');

const config = { __dirname };

/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['@luma-dev/base/js-dev'],
  overrides: [
    ...configureBase(config),
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'import/no-unresolved': 'off',
      },
    },
  ],
};
