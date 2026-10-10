import { defineConfig, devices } from '@playwright/test';


// Browser tests: each stylesheet is compiled from src/ and checked through
// computed styles in all three engines. `npm run test:browser`.
export default defineConfig({
    testDir: 'tst/browser',
    forbidOnly: !!process.env.CI,
    reporter: process.env.CI ? 'github' : 'list',
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    ],
});
