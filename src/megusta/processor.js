'use strict';

var cheerio = require('cheerio');

module.exports = function processor(rawContent) {
    var dealsCollection = [],
        $ = cheerio.load(rawContent);

    $('div.Ofertas').each(function(){
        var $dealLink = $(this).find("div.ImgOferta a"),
            $dealPic = $(this).find("div.ImgOferta a img"),
            $dealDesc = $(this).find("div.TitOferta"),
            $dealOriginalPrice = $(this).find("div.PrecioOferta span.text"),
            $dealDiscount = $(this).find("div.AhorrasOferta span.text"),
            $dealDiscountedPrice = $(this).find("div.OfertaOferta span.text");

        dealsCollection.push({
            url : $dealLink.attr("href"),
            picture : $dealPic.attr("src"),
            description : $dealDesc.text(),
            originalPrice : formatNumber($dealOriginalPrice.text()),
            discount : getPercentage($dealDiscount.text()),
            discountedPrice : formatNumber($dealDiscountedPrice.text()),
            source : {
                url : "http://megusta.do",
                name : "Me Gusta"
            },
            active:true
        });

        function getPercentage(string){
            return parseInt((/\((\d+)%\)/gi).exec(string)[1]) / 100;
        }

        function formatNumber(number){
            return parseInt(number.replace(/RD\$\s+/, "").replace(".",""));
        }
    });

    return deals
};