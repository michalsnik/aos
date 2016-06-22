import $ from 'jquery';
import AOS from '../src/js/aos';

jasmine.getStyleFixtures().fixturesPath = 'base/dist';
jasmine.getFixtures().fixturesPath = 'base/test/fixtures';

describe('AOS -> ', function() {

  beforeEach(function() {
    jasmine.getStyleFixtures().load = 'aos.css';
    jasmine.getFixtures().load('aos.fixture.html');
  });

  afterEach(function() {
    jasmine.getStyleFixtures().cleanUp();
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
    expect(elementsCount).toEqual(elements.length);
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
