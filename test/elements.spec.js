import $ from 'jquery';
import elements from '../src/js/helpers/elements';

jasmine.getStyleFixtures().fixturesPath = 'base/dist';
jasmine.getFixtures().fixturesPath = 'base/test/fixtures';

describe('Elements helper (elements.js) -> ', function() {

  beforeEach(function() {
    jasmine.getStyleFixtures().load = 'aos.css';
    jasmine.getFixtures().load('aos.fixture.html');
  });

  afterEach(function() {
    jasmine.getStyleFixtures().cleanUp();
    jasmine.getFixtures().cleanUp();
  });

  it('Should return array with objects that coresponds to elements in aos.fixture.html', function() {
    var aosElements = elements();
    expect(aosElements.length).toBe($('[data-aos]').length);
  });

  it('Should return array of objects', function() {
    var aosElements = elements();

    for (var i = 0; i < aosElements.length; i++) {
      if (aosElements[i].node) {
        expect(typeof aosElements[i]).toEqual('object');
      }
    }
  });

  it('Each object in returned array should have "node" attribute', function() {
    var aosElements = elements();

    for (var i = 0; i < aosElements.length; i++) {
      expect(aosElements[i].hasOwnProperty('node')).toBe(true);
    }
  });

  it('Each objects node in returned array should be a DOMNode', function() {
    var aosElements = elements();

    function isNode(obj) {
      return (typeof obj === "object") && (obj.nodeType === 1) && (typeof obj.style === "object") && (typeof obj.ownerDocument === "object");
    }

    for (var i = 0; i < aosElements.length; i++) {
      if (aosElements[i].node) {
        expect(isNode(aosElements[i].node)).toBe(true);
      }
    }
  });

});
