var scrapper = require('jq-scrapper'),
    _ = require('underscore');

exports.fetchDeals = function(callback){
    scrapper.get('http://megusta.do/deal/all', function($){


        if(_.isFunction(callback))
            callback(dealsCollection);
    });
}

