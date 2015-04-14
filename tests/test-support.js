'use strict';

var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    fs = require('fs'),
    path = require('path');


chai.use(chaiAsPromised);

global.expect = chai.expect;

exports.module = function(moduleName) {
    return require('../src/' + moduleName);
};

exports.fixture = function(fixtureName) {
    return fs.readFileSync(path.join(process.cwd(), 'fixtures', fixtureName));
};