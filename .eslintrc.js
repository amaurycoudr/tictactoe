module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['airbnb/base', 'airbnb-typescript/base', 'prettier'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
