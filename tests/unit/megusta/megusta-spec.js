'use strict';

var nock = require('nock'),
    _ = require('lodash'),
    support = require('../../test-support');

describe('megusta', function() {
    var sut,
        fixture
        ;

    beforeEach(function() {
        sut = support.module('megusta');
        fixture = support.fixture('megusta/megusta.html');
    });

    describe('fetching megusta deals', function() {
        var domain = 'http://megusta.do',
            path = '/deal/all',
            request,
            result
            ;

        beforeEach(function setupRequest() {
            request = nock(domain).get(path).reply(200, fixture);
            result = sut();
        });

        it('should make a HTTP GET request to megusta home page', function(done) {
            _.defer(request.done);
            _.defer(done);
        });

        context('given the home page contains three deals', function() {

            it('should resolve with three deal objects', function() {
                return expect(result).to.be.fulfilled.then(function(deals){
                    expect(deals.length).to.equal(3);
                });
            });
        });
    });
});