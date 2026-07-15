const{test,expect,only} = require('@playwright/test');
const { text } = require('@playwright/test');

test('goBackAndForward' , async({page})=>
{

    //Go Back and forward
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://www.google.com");
    await page.goBack();
    await page.goForward();
});

test('visibility check' , async({page})=>
{

    //check if element is visible
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();

    // check if element is hidden

    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

});

test('popup and mouse hover handling' , async({page})=>
{

    //Java script popup handling
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("#confirmbtn").click();
    await page.on('dialog',dialog=>dialog.accept());

    //Mouse hover

    await page.locator("#mousehover").hover();
    await page.pause();

});