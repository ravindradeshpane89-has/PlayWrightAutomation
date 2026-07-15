const{test,expect,only} = require('@playwright/test');
const { text } = require('@playwright/test');

test('@web handlingFrames' , async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const frameLocator= page.frameLocator("#courses-iframe");
    await frameLocator.locator(".current a[href*='lifetime-access']:visible").click();
    const msgText = await frameLocator.locator(".text h2").textContent();
    console.log(await msgText.split(" ")[1]);
});