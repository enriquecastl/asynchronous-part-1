function reduce(fnDict) {
    var accum = {},
        keys = Object.keys(fns),
        fns = keys.map(function(key) { return fnDict[key] }),
        result
        ;

    if(!fns.length) {
        result = Q.when(accum)
    } else {
        result = fns.reduce(function(prev, next, index) {
            return prev.then(function(data) {
                accum[keys[index]] = data;
                return next(accum, data)
            })
        })
    }

    return result
}