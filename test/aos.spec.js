require('jasmine-jquery');
jasmine.getFixtures().fixturesPath = 'base/test/fixtures';

var $ = require('jquery');

require('../src/js/aos');
var AOS = window.AOS;

describe('AOS -> ', function() {

    beforeEach(function() {
        jasmine.getFixtures().load('aos.fixture.html');
    });

    afterEach(function() {
        jasmine.getFixtures().cleanUp();
    });

    it('Should be defined', function() {
        expect(AOS).toBeDefined();
    });

    it('Should have init method', function() {
        expect(AOS.init).toBeDefined();
    });

    it('Should have refresh method', function() {
        expect(AOS.refresh).toBeDefined();
    });

    it('Should have same number of elements after init', function() {
        var elementsCount = $('.aos-item').length;
        var elements = AOS.init();
        expect(elements.length).toEqual(elementsCount);
    });

    it('Should have same number of elements after refresh', function() {
        var elementsCount = $('.aos-item').length;
        var elements = AOS.init();
        elements = AOS.refresh(true);
        expect(elements.length).toEqual(elementsCount);
    });

    it('Should add aos-init class on all elements', function() {
        var elementsCount = $('.aos-item').length;
        AOS.init();
        var elementsWithClass = $('.aos-init');
        expect(elementsCount).toEqual(elementsWithClass.length);
    });

});