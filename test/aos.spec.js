var aos = require('../src/js/aos');

describe('AOS -> ', function() {

    it('Should be defined', function() {
        expect(window.AOS).toBeDefined();
    });

    it('Should have init method', function() {
        expect(window.AOS.init).toBeDefined();
    });

    it('Should have refresh method', function() {
        expect(window.AOS.refresh).toBeDefined();
    });

});