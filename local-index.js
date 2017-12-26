'use strict';

const index = require('./index');

index.handler({
    body: JSON.stringify({
        "eventType": "order_status_updated",
        "orderId": "123",
        "message": "message"
    }),
    pathParameters: {
        clientId: '123',
        apiKey: 'ASFSAFJHN3451'
    }
}, null, (error, data) => {
    console.log(data);
});