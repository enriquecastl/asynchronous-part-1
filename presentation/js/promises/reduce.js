function reduce(fnDict) {
    var accum = {},
        keys = Object.keys(fnDict),
        fns = keys.map(function(key) { return fnDict[key] }),
        result
        ;

    if(!fns.length) {
        result = Q.when(accum)
    } else {
        result = fns.reduce(function(prev, next, index) {
            return prev.then(function(data) {
                if(keys[index-1]) {
                    accum[keys[index - 1]] = data;
                }
                return next(accum, data)
            })
        }, Q.when(accum))
    }

    return result
}