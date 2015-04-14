'use strict';

var when = require('when'),
    request = require('request')
    ;

module.exports = function requester() {
    var megustaDealsUrl = 'http://megusta.do/deal/all';

    return when.promise(function(resolve, reject) {
        request.get(megustaDealsUrl, function(error, response, body) {
            if(error) {
                reject(new Error("deals couldn't be fetched"));
            } else {
                resolve(body);
            }
        });
    });
};