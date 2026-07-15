import {test as baseTest} from '@playwright/test';
interface TestDataForOrder{
   inputEmail: string,
            password:string,
            requiredProduct:string
}

export const customtest = baseTest.extend<{testForOrder:TestDataForOrder}>(
    {
        testForOrder: {
            inputEmail: "Rav.desh@resp.com",
            password: "Learning1@3",
            requiredProduct: "ZARA COAT 3"

        }
    }




)