import js from '@eslint/js';
import gitignore from 'eslint-config-flat-gitignore';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { files: ['**/*.(ts,js,tsx)'] },
  gitignore(),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
    },
    plugins: {
      react: reactPlugin,
      import: importPlugin,
    },
    settings: {
      react: {
        version: 'detect',
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
  },
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
  prettierConfig,
);
