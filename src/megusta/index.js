'use strict';

var requester = require('./requester'),
    processor = require('./processor')
    ;

module.exports = function megustaScraper() {
    return requester().then(processor);
};