import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [],
  resolve: {
    tsconfigPaths: true
  },
  test: {
    environment: 'node',
    include: ['test/**/*.node.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      enabled: true,
      include: ['lib/**/*'],
      exclude: ['lib/layout.shared.tsx', 'lib/storybook-bridge/**'],
      reporter: ['text', 'json', 'html'],
      thresholds: {
        autoUpdate: false,
        perFile: true,
        'lib/**.{ts,tsx}': {
          statements: 100,
          functions: 100,
          branches: 100,
          lines: 100
        }
      }
    }
  }
});
