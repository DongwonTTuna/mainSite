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
    'plugin:prettier/recommended'
  ]
}
