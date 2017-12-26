'use strict';

const BaseHandler = require('./BaseHandler');

class OrderHandler extends BaseHandler {
    constructor(event) {
        super();

        this.orderId = event.entityId;
        this.message = event.message;
        this.property = this._getProperty(event);
        this.action = this._getAction(event);
    }

    perform() {
        // some logic here
        return Promise.resolve();
    }
}

module.exports = OrderHandler;
