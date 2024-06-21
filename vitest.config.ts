import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: ['src/demo'],
      include: ['**/*.{ts,tsx}', '!**/*.d.ts', '!**/cli.ts', '!**/index.ts', '!**/start*.ts'],
      provider: 'v8',
      reporter: ['html', 'lcov', 'text'],
    },
    environment: 'node',
    globals: true,
  },
});
