class ApiUtilsForAssignment3 {
       tokenId;
       eventId;

    constructor(apiContext, requestPalyload) {
        this.apiContext = apiContext;
        this.requestPalyload = requestPalyload;
    }

    async getToken() {

        const getTokenApiResponse = await this.apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",
            { data: this.requestPalyload }
        );

        const getTokenResponseJson = await getTokenApiResponse.json();
        console.log(getTokenResponseJson);
        this.tokenId = getTokenResponseJson.token;

    }

    async getEvent() {

        const getEventsApiResponse = await this.apiContext.get("https://api.eventhub.rahulshettyacademy.com/api/events", {
            headers: { 'Authorization': 'Bearer '+this.tokenId }

        });
        const getEventsResponseJson = await getEventsApiResponse.json();
        console.log(getEventsResponseJson);
         this.eventId = await getEventsResponseJson.data[0].id;
    }

    async createBooking(email) {

        const createBookingApiResponse = await this.apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/bookings", {
            data: {
                'eventId': this.eventId,
                'customerName': 'Yahoo User',
                'customerEmail': email,
                'customerPhone': '9876543210',
                'quantity': 1
            },
            headers:{'Authorization':'Bearer '+this.tokenId}

        });
        const createBookingResponseJson = await createBookingApiResponse.json();
        console.log(createBookingResponseJson);
        return createBookingResponseJson.data.id;
    }
}

module.exports = {ApiUtilsForAssignment3};