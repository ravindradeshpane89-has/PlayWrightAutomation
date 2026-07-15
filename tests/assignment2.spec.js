const { test, expect, only,request} = require('@playwright/test');
const { text } = require('@playwright/test');
const { WebUtils } = require('./Utils/WebUtils');
const email = "Ravindra123@gmail.com";
const password = "Selenium1@3";

const SIX_EVENTS_RESPONSE = {data: [{ id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },{ id: 2, title: 'Rock Night Live', category: 'Concert', eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },{ id: 3, title: 'IPL Finals', category: 'Sports', eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },{ id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },{ id: 5, title: 'Lollapalooza India', category: 'Festival', eventDate: '2025-06-20T12:00:00.000Z', venue: 'Mahalaxmi Racecourse', city: 'Mumbai', price: '3000', totalSeats: 5000, availableSeats: 2000, imageUrl: null, isStatic: false },{ id: 6, title: 'AI & ML Expo', category: 'Conference', eventDate: '2025-06-25T10:00:00.000Z', venue: 'Bangalore International Exhibition Centre', city: 'Bangalore', price: '750', totalSeats: 300, availableSeats: 180, imageUrl: null, isStatic: false },],pagination: { page: 1, totalPages: 1, total: 6, limit: 12 },};

const FOUR_EVENTS_RESPONSE = {data: [{ id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },{ id: 2, title: 'Rock Night Live', category: 'Concert', eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },{ id: 3, title: 'IPL Finals', category: 'Sports', eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },{ id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },],pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },};

test('Test 1', async ({ page }) => {
    await page.route("**/api/events**",

        async route => {

            const jsonResponse = await JSON.stringify(SIX_EVENTS_RESPONSE);
            //const responseCode = await page.request.fetch("**/api/events**");
             route.fulfill(
                {
                    body:jsonResponse,
                    status: 200,
                    contentType: 'application/json'

                });

        });

        //login and go to events
    const webUtils = new WebUtils(email, password);
    await webUtils.loginAndGoToEvents(page);
    
    //Verify cards loaded from mock
    const cards = await page.locator("[data-testid='event-card']");
    await expect(await cards.first()).toBeVisible();
    await expect(await cards.count()).toEqual(6);
    await page.pause();
   
    //Verify banner is visible

    const banter = page.locator("//span[contains(text(),'Your sandbox holds up to ')]");

    await expect(banter).toBeVisible();

    // verify text contains 9 bookings

    await expect(await banter.locator("//strong").first()).toHaveText("9 bookings");




});

test('Test 2', async ({ page }) => {
    await page.route("**/api/events**",

        async route => {

            const jsonResponse = await JSON.stringify(FOUR_EVENTS_RESPONSE);
            //const responseCode = await page.request.fetch("**/api/events**");
             route.fulfill(
                {
                    body:jsonResponse,
                    status: 200,
                    contentType: 'application/json'

                });

        });

        //login and go to events
    const webUtils = new WebUtils(email, password);
    await webUtils.loginAndGoToEvents(page);
    
    //Verify cards loaded from mock
    const cards = await page.locator("[data-testid='event-card']");
    await expect(await cards.first()).toBeVisible();
    await expect(await cards.count()).toEqual(4);
    await page.pause();
   
    //Verify banner is NOT visible

    const banter = page.locator("//span[contains(text(),'Your sandbox holds up to ')]");

    await expect(banter).toBeHidden();


});