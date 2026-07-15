const{test,expect,only} = require('@playwright/test');
const { text } = require('@playwright/test');

test('End To End Event Booking Flow' , async({page})=>
{

    //login to app
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.getByPlaceholder("you@email.com").type("Ravindra123@gmail.com");
    await page.getByLabel("password").type("Selenium1@3");
    await page.locator("#login-btn").click();
    await expect(await page.getByRole("link",{name:'Browse Events →'})).toBeVisible();

    //create event
    
    await page.getByRole("button",{name:'Admin'}).click();
    await page.getByRole("link",{name:'Manage Events'}).nth(0).click();
    const eventTitle = `Test Event ${Date.now()}`;
    await page.locator("#event-title-input").type(eventTitle);
    await page.locator("#admin-event-form textarea").type("test purpose");
    await page.getByLabel('City').type('Pune');
    await page.getByLabel('Venue').type('Pune');
    await page.getByLabel('Event Date & Time').fill('2027-07-07T11:08');
    await page.getByLabel('Price ($)').type('100');
    await page.getByLabel('Total Seats').type('50');
    await page.locator("#add-event-btn").click();
    //await page.locator("p[text()='Event created!']").waitFor();
    await expect (page.getByText('Event created!')).toBeVisible();

    //Find event on events page

    await expect(await page.locator("[data-testid='event-card']").filter({hasText:eventTitle})).toBeVisible();
    const seatsBeforeBooking =await page.locator("[data-testid='event-card']").filter({hasText:eventTitle}).locator();






});