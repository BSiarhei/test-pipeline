'use strict';

class BaseError extends Error {
    constructor(statusCode = 500, ...args) {
        super(...args);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = BaseError;
