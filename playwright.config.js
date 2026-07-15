// @ts-check
import { defineConfig, devices } from '@playwright/test';
const config = ({
  testDir: './tests',
  testMatch:'**/*.spec.js',
  reporter: 'html',
  timeout: 30000,
  expect:{
  timeout:5000,
  retries: 1,
  },
  use: {
  
    browserName: 'chromium',
    screenshot: 'on',
    trace: 'on',
    headless: false
  },
});
module.exports = config