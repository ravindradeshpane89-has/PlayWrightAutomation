class ApiUtils {

    constructor(apiContext, requestPayload) {
        this.apiContext = apiContext;
        this.requestPayload = requestPayload;

    }


    async getToken() {

        const apiResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",

            { data: this.requestPayload }
        );
        const apiResponseJson = await apiResponse.json();
        return apiResponseJson.token;

    }

    async createOrder(orderPayload) {

        let response = {};
        response.token = await this.getToken();

        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: { 'Authorization':  response.token, 'content-type': 'application/json' },
            }
        )
        const responseJson = await orderResponse.json();
        console.log(responseJson);
        
        response.orderId = responseJson.orders[0];
        return response;
    }
}
module.exports = {ApiUtils};