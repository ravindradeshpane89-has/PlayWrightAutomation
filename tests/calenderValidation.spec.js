const{test,expect,only} = require('@playwright/test');
const { text } = require('@playwright/test');

test('calender validation' , async({page})=>
{

    const day ="17";
    const month ="5";
    const year ="2027";
    const selectedDate = [month,day,year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    await page.locator(".react-date-picker").nth(0).click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
    await page.locator("//abbr[text()='"+day+"']").click();

    //validate date selected

    const dateFields = await page.locator(".react-date-picker__inputGroup__input");
    for(let i =0;i<selectedDate.length;i++){
    await expect(await dateFields.nth(i).getAttribute('value')).toEqual(selectedDate[i]);
    }



});