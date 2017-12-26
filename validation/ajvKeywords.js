'use strict';

const listOfKeywords = [];

const elevateEventType = {
    name: 'elevateEventType',
    definition: {
        type: 'string',
        compile: (sch, parentSchema) => {
            const reg = /^\w+_\w+_\w+$/i;
            return data => reg.test(data);
        }
    }
};

listOfKeywords.push(elevateEventType);

module.exports = {
    extend(ajv) {
        listOfKeywords.forEach(keyword => {
            ajv.addKeyword(keyword.name, keyword.definition);
        });
    }
};
