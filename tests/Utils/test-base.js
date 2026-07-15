const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {
        testForOrder: {
            inputEmail: "Rav.desh@resp.com",
            password: "Learning1@3",
            requiredProduct: "ZARA COAT 3"

        }
    }




)