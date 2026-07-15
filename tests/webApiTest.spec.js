const{test,expect,only,request} = require('@playwright/test');
const { text } = require('@playwright/test');
const{ApiUtils} = require('./Utils/ApiUtils');

const requestPayload = {userEmail:"Rav.desh@resp.com",userPassword:"Learning1@3"};
let response;
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};

test.beforeAll(async ()=>{

    // api for login in
const apiContext = await request.newContext();
const apiUtils = new ApiUtils(apiContext,requestPayload);
response = await apiUtils.createOrder(orderPayload);

})


test('clientLogin' , async({page})=>
{

    await page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
    },response.token);

await page.goto("https://rahulshettyacademy.com/client/");
const itemsName = page.locator(".container .row b");
const inputEmail ="Rav.desh@resp.com";
await page.waitForLoadState('networkidle');
await itemsName.last().waitFor();

// validate orderId displayed on order history page.
await page.getByRole("button",{name:'  ORDERS'}).click();
const orderDetails = page.locator("table tbody tr");
const orderIds = orderDetails.locator("th");
const countOfOrders = await orderIds.count();
const viewButton = orderDetails.locator("button:has-text('View')");
for(let i =0;i<countOfOrders;i++){

    await expect(orderIds.nth(i)).toHaveText(response.orderId);
    await viewButton.nth(i).click();
    break;

}

// validate order id on order summary page

const id = page.locator(".col-text");
await expect(id).toHaveText(response.orderId);
});