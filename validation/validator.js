'use strict';

const Ajv = require('ajv');
const ajvErrorsWrapper = require('ajv-errors');
const errors = require('../errors');
const schemas = require('./schemas');
const ajvKeywords = require('./ajvKeywords');

const ajv = new Ajv({allErrors: true, jsonPointers: true, schemas: Object.keys(schemas).map(schemaName => schemas[schemaName])});
ajvErrorsWrapper(ajv);
ajvKeywords.extend(ajv);
const baseValidate = ajv.getSchema('base');

module.exports = {
    validate(data) {
        let valid = baseValidate(data);

        if (!valid) {
            return baseValidate.errors;
        }

        const customValidate = ajv.getSchema(data.eventType);

        if (!customValidate) {
            return [new errors.BaseError(400, 'Unexpected event type')];
        }

        valid = customValidate(data);

        if (valid) {
            return null;
        } else {
            return customValidate.errors;
        }
    }
};
