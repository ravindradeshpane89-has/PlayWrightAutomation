const{test,expect,only,request} = require('@playwright/test');
const { text } = require('@playwright/test');
const{ApiUtils} = require('./Utils/ApiUtils');

const requestPayload = {userEmail:"Rav.desh@resp.com",userPassword:"Learning1@3"};
let response;
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
const fakeResponse = {data:[],message:"No Orders"};

test.beforeAll(async ()=>{

    // api for login in
const apiContext = await request.newContext();
const apiUtils = new ApiUtils(apiContext,requestPayload);
response = await apiUtils.createOrder(orderPayload);

})


test('network Response Intercept' , async({page})=>
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
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",

async route=>{
const body = JSON.stringify(fakeResponse);
const orderResponse =await page.request.fetch("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
route.fulfill(
    {
     orderResponse,
     body,
    });
});
await page.getByRole("button",{name:'  ORDERS'}).click();
await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
console.log(await page.locator(".mt-4").textContent());

});