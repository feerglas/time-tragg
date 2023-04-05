module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:solid/recommended'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['solid'],
  rules: {
    'import/prefer-default-export': 'off',
    'lines-around-comment': 'error',
    'padded-blocks': 'off',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
      {
        blankLine: 'always',
        prev: [
          'const',
          'let',
        ],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: [
          'const',
          'let',
        ],
        next: [
          'const',
          'let',
        ],
      },
    ],
  },
};
