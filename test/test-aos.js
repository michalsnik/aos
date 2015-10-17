var should = require('chai').should();
var jsdom = require('jsdom').jsdom;
var window = jsdom().defaultView;

var core = require('../src/js/aos-core');

describe('AOS -> ', function() {
    var aos = core(window);

    it('Should have init method', function() {
        should.exist(aos.init);
    });

});