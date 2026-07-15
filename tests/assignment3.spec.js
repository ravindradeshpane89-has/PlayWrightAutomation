const { test, expect, only, request } = require('@playwright/test');
const { text } = require('@playwright/test');
const { ApiUtilsForAssignment3 } = require('./Utils/ApiUtilsForAssignment3');

const gmailId = "Ravindra123@gmail.com";
const gmailPassword = "Selenium1@3";
const yahooEmailId = "Ravi123@yahoo.com";
const yahooPassword = "Learning1@3";
const loginRequestPayload = {email: yahooEmailId,password: yahooPassword};
let yahooBookingId;

test.beforeAll('Test 1', async () => {

    const apiContext = await request.newContext();
    const apiUtils = new ApiUtilsForAssignment3(apiContext,loginRequestPayload);
    // get Token
    await apiUtils.getToken();
    // get event based on token
    await apiUtils.getEvent();
    // create booking and reterive booking id
    yahooBookingId = await apiUtils.createBooking(yahooEmailId);

})

test ('Assignment 3', async({page})=>{

// login to UI using gmail id 

    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.getByPlaceholder("you@email.com").type(gmailId);
    await page.getByLabel("password").type(gmailPassword);
    await page.locator("#login-btn").click();
    await page.waitForLoadState('networkidle');

    // navigate to bookings using yahoobooking id

    await page.goto("https://eventhub.rahulshettyacademy.com/bookings/"+yahooBookingId);
    await page.waitForLoadState('networkidle');

    // validate Access Denied text is visible

    await expect(page.getByRole('heading', { name: 'Access Denied' })).toBeVisible();
    await expect(page.getByText('You are not authorized to')).toBeVisible();


})