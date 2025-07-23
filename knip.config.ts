import type { KnipConfig } from 'knip';

export default {
  // Entry files - these are the starting points for Knip's analysis
  entry: [
    // Qwik entry files for different modes
    'src/entry.ssr.tsx',
    'src/entry.preview.tsx',
    'src/entry.dev.tsx',
    'src/root.tsx',
    
    // Qwik City routes (including i18n routes)
    'src/routes/**/index.tsx',
    'src/routes/**/*.tsx',
    'src/routes/**/layout.tsx',
    'src/routes/plugin.ts',
    
    // Test files (if any exist)
    'src/**/*.spec.ts',
    
    // E2E tests
    'src/__tests__/e2e/**/*.spec.ts'
  ],
  
  // Project files to analyze
  project: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}',
    '!src/__tests__/**'
  ],
  
  // Files and patterns to ignore
  ignore: [
    // Qwik generated files
    'src/entry.*.js',
    'server/**',
    '.netlify/**',
    '.vercel/**',
    'dist/**',
    'lib/**',
    'build/**',
    'tmp/**',
    
    // Type definitions
    '**/*.d.ts',
    
    // CSS files (not analyzed by Knip)
    '**/*.css',
    
    // Generated files
    'node_modules/**',
    'coverage/**',
    'playwright-report/**',
    'test-results/**'
  ],
  
  // Dependencies to ignore (Qwik uses these internally)
  ignoreDependencies: [
    // Qwik virtual modules (not actual packages)
    '@qwik-city-plan',
    '@qwik-client-manifest'
  ],
  
  // Ignore specific exports
  ignoreExportsUsedInFile: true,
  
  // Plugin configurations
  vite: {
    config: ['vite.config.ts', 'adapters/*/vite.config.ts']
  },
  
  playwright: {
    config: ['playwright.config.ts'],
    entry: ['src/__tests__/e2e/**/*.spec.ts']
  },
  
  eslint: {
    config: ['eslint.config.js']
  },
  
  prettier: {
    config: ['.prettierrc', 'prettier.config.js']
  },
  
  typescript: {
    config: ['tsconfig.json', 'tsconfig.*.json']
  },
  
  vitest: {
    config: ['vite.config.ts'],
    entry: ['src/**/*.{test,spec}.{ts,tsx}']
  },
  
  // Rules configuration
  rules: {
    binaries: 'error',
    classMembers: 'error',
    dependencies: 'error',
    devDependencies: 'error',
    duplicates: 'error',
    enumMembers: 'error',
    exports: 'error',
    files: 'error',
    nsExports: 'error',
    nsTypes: 'error',
    types: 'error',
    unlisted: 'error',
    unresolved: 'error'
  },
  
  // Tags to ignore in exports (for JSDoc/TSDoc)
  // Ignore exports marked with @internal or @ignore
  tags: ['-internal', '-ignore']
} satisfies KnipConfig;