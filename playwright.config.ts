import {defineConfig, devices} from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration.
 * @see https://github.com/bennycode/lambot-1/blob/85a85ac2833a5f798c3debc216d85cdda6348a17/src/webapp/playwright.config.ts
 */
export default defineConfig({
  testDir: './e2e-tests',
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },
  ],
});
