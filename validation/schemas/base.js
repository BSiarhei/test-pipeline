'use strict';

const base = {
    $id: 'base',
    type: 'object',
    properties: {
        eventType : {
            type: 'string',
            elevateEventType: true
        }
    },
    required: ['eventType'],
    errorMessage: {
        properties: {
            eventType: "Incorrect event type"
        }
    }
};

module.exports = base;
