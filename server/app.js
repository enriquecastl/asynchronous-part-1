"use strict";

var express = require('express');
var serveStatic = require('serve-static');
var app = express();

app.use(serveStatic('../presentation', {'index': ['index.html']}));
app.get(/\w+\.txt$/, function(req, res) {
    var waitUntil = parseInt(req.query.waitUntil, 10) || 10;

    setTimeout(function() {
        res.set('Content-Type', 'text/plain');
        res.send('File content');
    }, waitUntil);
});

app.get(/invalid\/\w+\.txt$/, function(req, res) {
    res.sendStatus(400);
});

var server = app.listen(3000, function(app) {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
});
