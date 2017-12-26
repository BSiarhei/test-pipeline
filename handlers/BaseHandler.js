'use strict';

const errors = require('../errors');

class BaseHandler {
    perform() {
        throw new errors.BaseError(500, 'Not implemented');
    }

    _getProperty(event) {
        return event.eventType.split('_')[1];
    }

    _getAction(event) {
        return event.eventType.split('_')[2];
    }
}

module.exports = BaseHandler;
