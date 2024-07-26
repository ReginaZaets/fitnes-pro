module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier', // Отключает правила, конфликтующие с Prettier
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'prettier'
  ],
  rules: {
    'indent': ['error', 2], // Используем отступы в 2 пробела
    'quotes': ['error', 'double'],  // Используем двойные кавычки
    'semi': ['error', 'always'], // Всегда требует точку с запятой в конце строки
    'prettier/prettier': ['error', { 'semi': true, 'singleQuote': false }], // Устанавливает правило для Prettier в ESLint
  },
};