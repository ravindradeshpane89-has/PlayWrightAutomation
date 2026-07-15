const { test, expect, only } = require('@playwright/test');

test('visual test', async({page}) =>{

 await page.goto("https://www.spicejet.com/");
 await expect(await page.screenshot()).toMatchSnapshot('landing.png');
})