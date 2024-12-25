module.exports = {
  ignorePatterns: [
    'node_modules/*',
    '.node_modules/*',
    '**/node_modules/**',
    '**/build/**',
    '**/dist/**',
    '**/dist-types/**',
    'pnpm-lock.yaml',
    '**/*.js'
  ],
  env: {
    browser: true
  },
  plugins: ['react', 'compat'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    project: './tsconfig.json'
  },
  extends: [
    'next/core-web-vitals',
    'next/typescript',
    'plugin:compat/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  rules: {
    'max-len': ['error', { code: 120 }],
    'indent': ['error', 2, { SwitchCase: 1 }],
    'no-tabs': 'error',
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'quote-props': ['error', 'consistent'],
    'jsx-quotes': ['error', 'prefer-single'],
    'comma-dangle': ['error', 'only-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'object-curly-newline': ['error', { multiline: true, consistent: true }],
    'arrow-parens': ['error', 'always'],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line'
      }
    ]
  }
}
