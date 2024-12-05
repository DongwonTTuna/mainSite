module.exports = {
  env: {
    browser: true,
  },
  plugins: ['react', 'compat'],
  ignores: [
    'node_modules/*',
    '.node_modules/*',
    '**/node_modules/**',
    '**/build/**',
    '**/dist/**',
    '**/dist-types/**',
    'pnpm-lock.yaml',
    '**/*.js',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  extends: [
    'next/core-web-vitals',
    'next/typescript',
    'plugin:compat/recommended',
    "plugin:prettier/recommended"],

  rules: {
    /**
     *  prettier rulesに合うように、eslintのrulesを設定する
     *   printWidth: 120,
     *   tabWidth: 2,
     *   useTabs: false,
     *   semi: false,
     *   singleQuote: true,
     *   quoteProps: 'consistent',
     *   jsxSingleQuote: true,
     *   trailingComma: 'es5',
     *   bracketSpacing: true,
     *   bracketSameLine: false,
     *   arrowParens: 'always',
     *   proseWrap: 'preserve',
     *   htmlWhitespaceSensitivity: 'css',
     *   embeddedLanguageFormatting: 'off',
     *   parser: 'typescript',
     */

  }
}
