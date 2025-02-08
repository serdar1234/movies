/* eslint-disable prettier/prettier */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  rules: {
    indent: ['error', 2],
    'prettier/prettier': 'error',
    'linebreak-style': [0, 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'import/no-unresolved': [
      'error',
      {
        caseSensitive: false,
        ignore: [
          '\\.(png|jpe?g|gif|svg|webp|bmp|tiff)$', // don't check image imports
        ],
      },
    ],
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'import/no-absolute-path': 0,
    'import/extensions': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
  },
  ignorePatterns: ['dist/', 'build/', 'coverage/', '.vscode/', 'vite.config.js', 'node_modules'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg', '.png'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      alias: {
        map: [
          ['@/', './src'],
          ['', './public'],
        ],
        extensions: ['.js', '.jsx', '.svg', '.png'],
      },
      vite: {},
    },
    react: {
      version: 'detect',
    },
  },
};
