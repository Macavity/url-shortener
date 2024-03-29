module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  extends: ['plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'node_modules/', 'dist/', 'cypress/'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  overrides: [
    {
      files: ['*.ts'],
      plugins: ['@typescript-eslint/eslint-plugin'],

      extends: ['plugin:@typescript-eslint/recommended'],

      parserOptions: {
        project: ['./tsconfig.lint.json'], // Specify it only for TypeScript files
        tsconfigRootDir: __dirname,
      },
    },
  ],
};
