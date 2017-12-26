'use strict';

const constants = require('../constants');
const OrderHandler = require('./OrderHandler');

const handlerClasses = {
    [constants.eventTypeEntities.order]: OrderHandler
};

module.exports = {
    getHandlerByEvent: (event) => {
        const entityName = event.eventType.split('_')[0];
        const Handler = handlerClasses[entityName];

        if (!Handler) {
            return null;
        }

        return new Handler(event);
    }
};
