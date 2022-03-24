module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'react', 'import'],
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/no-anonymous-default-export': 'error',
    'import/no-dynamic-require': 'off',
    'no-empty-pattern': 'off',
    'no-empty': 'off',
    'no-constant-condition': 'off',
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
        'react/prop-types': ['off', {}],
        'react/require-default-props': 'off',
        'react/jsx-props-no-spreading': 'off',
      },
    },
  ],
};
