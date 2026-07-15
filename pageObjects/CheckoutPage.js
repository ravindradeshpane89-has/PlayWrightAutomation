class CheckoutPage {

    constructor(page) {
        this.personalInfoSection = page.locator(".form__cc");
        this.creditCardNumber = page.locator(".input").nth(0);
        this.expiryDate = page.locator(".input").nth(1);
        this.expiryYear = page.locator(".input").nth(2);
        this.cvv = page.locator(".input").nth(3);
        this.nameOnCard = page.locator(".input").nth(4);
        this.applyCoupon = page.locator(".input").nth(5);
        this.applyCouponBtn = page.locator("button:has-text('Apply Coupon ')");
        this.emailText = page.locator(".user__name label");
        this.selectCountry = page.locator("[placeholder ='Select Country']");
        this.countryList = page.locator("section.ta-results");
        this.couponApplyMsg = page.locator("p:has-text('* Coupon Applied')");
        this.placeOrderBtn = page.locator("a:has-text('Place Order ')");

    }

    async enterPersonInfo(creditCardNumber, expiryDate, expiryYear, cvv,name, coupon) {

        await this.creditCardNumber.fill(" ");
        await this.creditCardNumber.type(creditCardNumber);
        await this.expiryDate.selectOption(expiryDate);
        await this.expiryYear.selectOption(expiryYear);
        await this.cvv.type(cvv);
        await this.nameOnCard.type(name);
        await this.applyCoupon.type(coupon);
        await this.applyCouponBtn.click();

    }

    async getEmail(){

        return this.emailText;
    }

    async getCouponApplyMsgElement(){
        return this.couponApplyMsg;
    }

    async placeOrder(countryName) {

        await this.selectCountry.pressSequentially(countryName);
        await this.countryList.waitFor();
        const options = this.countryList.locator("button");
        const CountryListCount = await options.count();
        for (let i = 0; i < CountryListCount; i++) {

            const countryText = await options.nth(i).textContent();

            if ( await countryText.trim() === countryName) {

                await options.nth(i).click();
                break;
            }
        }

        await this.placeOrderBtn.click();
    }
}
module.exports ={CheckoutPage};