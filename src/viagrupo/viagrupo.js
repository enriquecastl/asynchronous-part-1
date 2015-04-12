var scrapper = require('jq-scrapper'),
    _ = require('underscore');

exports.fetchDeals = function(callback){
    scrapper.get('http://www.viagrupo.com/santo-domingo/active', function($){
        var dealsCollection = [];

        $('div.alld_deal').each(function(){
		
			var c=$(this).find("p.alld_save").text().split("  ");
			var discont;//el %
			var discontSave;//el $$
			var finalPrice=$(this).find("p.alld_v").text().replace(' RD$','');//precio final
			
			for(var i=1;i<c.length;i++){
				var j=c[i];
				if(i%2){
					discontSave =j.replace('RD$',''); 
					//console.log(discontSave);
				}else{
					discont =j.replace('Desc. ','').replace('%','');
					//console.log(discont);
				}
			}
			var re = /url\(.*\)/gi;
			var c=$(this).find("span.alld_border").attr("style");
			var matches = re.exec(c);
			var v;
			if(matches) 
				v=matches[0].replace(/url\(/gi, "").replace(")", "");
		
            var $dealLink = $(this).find("a"),
                $dealPic = v,
                $dealDesc = $(this).find("div.alldeal_content a"),
                $dealOriginalPrice = parseInt(finalPrice)+parseInt(discontSave),
                $dealDiscount = discont,
                $dealDiscountedPrice = finalPrice;

            dealsCollection.push({
                url : $dealLink.attr("href"),
                picture : v,
                description : $dealDesc.text(),
                originalPrice : $dealOriginalPrice,
                discount : $dealDiscount,
                discountedPrice : $dealDiscountedPrice,
                source : {
                    url: "http://www.viagrupo.com/",
                    name: "ViaGrupo"
                },
                active:true
            });
        });

        if(_.isFunction(callback))
            callback(dealsCollection);
    });
}

//exports.fetchDeals(function(deals){ console.log(deals)});