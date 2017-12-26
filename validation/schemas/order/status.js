'use strict';

const orderStatusUpdated = {
    $id: 'order_status_updated',
    type: 'object',
    properties: {
        orderId : {
            type: 'string'
        },
        message: {
            type: 'string'
        }
    },
    required: ['orderId', 'message']
};

module.exports = {
    orderStatusUpdated
};
