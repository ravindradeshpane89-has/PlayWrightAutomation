// @ts-check
import { defineConfig, devices } from '@playwright/test';
const config = ({
  testDir: './tests',
  reporter: 'html',
  timeout: 30000,
  retries: 1,
  workers: 3,
  expect:{
  timeout:5000,
  },
  projects:
  [
     {
      name:'chrome',
      use: {
  
    browserName: 'chromium',
    screenshot: 'on',
    trace: 'on',
    headless: false,
    ignoreHttpsErrors:true,
    permissions:['geolocation'],
    video:'retain-on-failure'
    //...devices['Galaxy A55']
  }
},
  {
    name:'safari',
      use: {
  
    browserName: 'webkit',
    screenshot: 'off',
    trace: 'on',
    headless: true
  }
  } 
   
  ]
  
});
module.exports = config