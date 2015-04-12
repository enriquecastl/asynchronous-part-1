var cheerio = require('cheerio'), 
    request = require('request'),
    _ = require('underscore');

exports.fetchDeals = function(callback){

    request({
        url : 'http://www.queganga.do/site/index',
        method : 'POST',
        form : {
            category : 'all-offers'
        },
        headers : {
            'Cookie' : 'subscriber=1;',
            'Accept' : 'application/json, text/javascript, */*; q=0.01',
            'Accept-Encoding' : 'gzip,deflate,sdch',
            'Accept-Language' : 'en-US,en;q=0.8,fr;q=0.6,es;q=0.4',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest'
        }
    }, function(error, response, body){
        var dealsJSON = JSON.parse(body),
            $ = cheerio.load(dealsJSON.html);

        var dealsCollection = [];

        $('div.products div.product').each(function(){
            var $dealLink = $(this).find("div.photo a"),
                $dealPic = $(this).find("div.photo a img"),
                $dealOriginalPrice = $(this).find("div.pricing p.muted small"),
                $dealDiscountedPrice = $(this).find("div.pricing h1.price");

            var dealObject = {
                url : $dealLink.attr("href"),
                picture : "http://www.queganga.do"+$dealPic.attr("src"),
                description : $dealPic.attr("alt"),
                originalPrice : $dealOriginalPrice.text(),
                discountedPrice : $dealDiscountedPrice.text(),
                source : {
                    name : "QUEGANGA",
                    url  : "http://www.queganga.do/"
                },
                active: true
            };

            dealObject.originalPrice = cleanNumbers(dealObject.originalPrice);
            dealObject.discountedPrice = cleanNumbers(dealObject.discountedPrice);
            dealObject.discount = dealObject.discountedPrice / dealObject.originalPrice;

            dealsCollection.push(dealObject);

            function cleanNumbers(number){
                return parseInt(number.replace('Valorado en', '').replace(/\s+/gi,'').replace('$','').replace(',',''));
            }
        });

        if(_.isFunction(callback))
            callback(dealsCollection);
    });
}