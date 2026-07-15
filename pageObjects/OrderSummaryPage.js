class OrderSummaryPage{

    constructor(page){

        this.id = page.locator(".col-text");
    }

    async getId(){
        return this.id;
    }
}
module.exports ={OrderSummaryPage};