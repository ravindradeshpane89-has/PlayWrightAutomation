class DashboardPage {

constructor(page){

    this.product =page.locator(".container .row b");
    this.products =page.locator(".card-body");
    this.cartBtn =page.locator("[routerlink*='cart']");
    this.cartproduct = page.locator("div.infoWrap");
    this.page =page;
    this.checkoutBtn = page.locator("button:has-text('Checkout')");

}

async searchProductAndAddToCart(productName){

    await  this.product.last().waitFor();
    
    // add-to-cart based on product supplied
    
    const count =await this.products.count();
    
    for(let i =0;i<count;i++){
    
        if(await this.products.nth(i).locator("b").textContent() === productName){
         await this.products.nth(i).locator('button:has-text(" Add To Cart")').click();
         break;
    
        }
    }

}

async navigateToCart(){

    await this.cartBtn.click();
    await this.page.waitForLoadState("networkidle");
    const addedProduct = this.cartproduct.locator("h3");
    return addedProduct;
}

async navigateToCheckout(){
await this.checkoutBtn.click();
}

}
module.exports ={DashboardPage};