import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['apps/*/src/**/*.test.ts', 'packages/*/src/**/*.test.ts'],
    exclude: ['node_modules', '.next', 'dist'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['apps/*/src/**/*.ts', 'packages/*/src/**/*.ts'],
      exclude: ['**/*.test.ts', '**/*.d.ts', '**/index.ts'],
    },
    testTimeout: 10000,
  },
});
