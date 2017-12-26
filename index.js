'use strict';

const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

const { validator } = require('./validation');
const handlers = require('./handlers');
const errors = require('./errors');

const webhookHandler = (event) => {
    return Promise.resolve()
        .then(() => {
            const clientId = event.pathParameters.clientId;
            const apiKey = event.pathParameters.apiKey;

            let incomingEvent;

            try {
                incomingEvent = JSON.parse(event.body);
            } catch (error) {
                console.error(error);

                throw new errors.BaseError(400, 'Bad Request');
            }

            const validationErrors = validator.validate(incomingEvent);

            if (validationErrors) {
                const errorsMessage = validationErrors
                    .map(validationError => validationError.message)
                    .reduce((accumulator, current) => `${accumulator} ${current}`, '');

                throw new errors.BaseError(400, `Validation Errors: ${errorsMessage}`);
            }

            const handler = handlers.getHandlerByEvent(incomingEvent);

            if (!handler) {
                throw new errors.BaseError(455, 'Unexpected event type');
            }

            console.log(incomingEvent);

            return handler.perform();
        });
};

exports.handler = function (event, context, callback) {
    webhookHandler(event)
        .then(() => {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({ success: true })
            });
        })
        .catch(error => {
            callback(null, {
                statusCode: error.statusCode || 500,
                body: JSON.stringify({ message: error.message || 'Internal server error' })
            });
        });
};
