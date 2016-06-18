import $ from 'jquery';
import calculateOffset from '../src/js/helpers/calculateOffset';

const delay = 50;

jasmine.getStyleFixtures().fixturesPath = 'base/dist';
jasmine.getFixtures().fixturesPath = 'base/test/fixtures';

describe('Offset -> ', function() {

  beforeEach(function() {
    jasmine.getStyleFixtures().load = 'aos.css';
    jasmine.getFixtures().load('aos.fixture.html');
  });

  afterEach(function() {
    jasmine.getStyleFixtures().cleanUp();
    jasmine.getFixtures().cleanUp();
  });

  describe('with default option set to "0" -> ', function() {
    var offset = 0;

    it('on aos-item--1 should equal 0', function(done) {
      var node = document.querySelector('.aos-item--1');

      setTimeout(function() {
        expect(calculateOffset(node, offset)).toBe(0);
        done();
      }, delay);
    });

    it('on aos-item--2 should equal 150', function(done) {
      var node = document.querySelector('.aos-item--2');

      setTimeout(function() {
        expect(calculateOffset(node, offset)).toBe(150);
        done();
      }, delay);
    });

    it('on aos-item--6 should equal 750', function(done) {
      var node = document.querySelector('.aos-item--6');

      setTimeout(function() {
        expect(calculateOffset(node, offset)).toBe(750);
        done();
      }, delay);
    });

  });

  describe('with default option set to "50" => ', function() {
    var offset = 50;

    it('on aos-item--1 should equal 50', function(done) {
      var node = document.querySelector('.aos-item--1');

      setTimeout(function() {
        expect(calculateOffset(node, offset)).toBe(50);
        done();
      }, delay);
    });

    it('on aos-item--2 should equal 200', function(done) {
      var node = document.querySelector('.aos-item--2');

      setTimeout(function() {
        expect(calculateOffset(node, offset)).toBe(200);
        done();
      }, delay);
    });

    it('on aos-item--6 should equal 800', function(done) {
      var node = document.querySelector('.aos-item--6');

      setTimeout(function() {
        expect(calculateOffset(node, offset)).toBe(800);
        done();
      }, delay);
    });

  });

  describe('after AOS init -> ', function() {

    beforeEach(function() {
      $('.aos-item').addClass('aos-init');
    });

    describe('with option "offset" set to "50" => ', function() {
      var offset = 50;

      it('on aos-item--1 should equal 50', function(done) {
        var node = document.querySelector('.aos-item--1');

        setTimeout(function() {
          expect(calculateOffset(node, offset)).toBe(50);
          done();
        }, delay);
      });

      it('on aos-item--2 should equal 200', function(done) {
        var node = document.querySelector('.aos-item--2');

        setTimeout(function() {
          expect(calculateOffset(node, offset)).toBe(200);
          done();
        }, delay);
      });

      it('on aos-item--6 should equal 800', function(done) {
        var node = document.querySelector('.aos-item--6');

        setTimeout(function() {
          expect(calculateOffset(node, offset)).toBe(800);
          done();
        }, delay);
      });

    });

    describe('with option "offset" set to "0" => ', function() {
      var offset = 0;

      it('on aos-item--1 should equal 0', function(done) {
        var node = document.querySelector('.aos-item--1');

        setTimeout(function() {
          expect(calculateOffset(node, offset)).toBe(0);
          done();
        }, delay);
      });

      it('on aos-item--2 should equal 150', function(done) {
        var node = document.querySelector('.aos-item--2');

        setTimeout(function() {
          expect(calculateOffset(node, offset)).toBe(150);
          done();
        }, delay);
      });

      it('on aos-item--6 should equal 750', function(done) {
        var node = document.querySelector('.aos-item--6');

        setTimeout(function() {
          expect(calculateOffset(node, offset)).toBe(750);
          done();
        }, delay);
      });

    });

  });

});


describe('Offset on element with attr [aos-offset] -> set to "50" ', function() {

  beforeEach(function() {
    jasmine.getStyleFixtures().load = 'aos.css';
    jasmine.getFixtures().load('aos-offset.fixture.html');
  });

  afterEach(function() {
    jasmine.getStyleFixtures().cleanUp();
    jasmine.getFixtures().cleanUp();
  });

  it('on aos-item--1 should equal 50', function(done) {
    var node = document.querySelector('.aos-item--1');

    setTimeout(function() {
      expect(calculateOffset(node)).toBe(50);
      done();
    }, delay);
  });

  it('on aos-item--2 should equal 200', function(done) {
    var node = document.querySelector('.aos-item--2');

    setTimeout(function() {
      expect(calculateOffset(node)).toBe(200);
      done();
    }, delay);
  });

  it('on aos-item--6 should equal 800', function(done) {
    var node = document.querySelector('.aos-item--6');

    setTimeout(function() {
      expect(calculateOffset(node)).toBe(800);
      done();
    }, delay);
  });

});

describe('Offset on element with attr [aos-offset] after AOS init -> set to "50" ', function() {

  beforeEach(function() {
    jasmine.getStyleFixtures().load = 'aos.css';
    jasmine.getFixtures().load('aos-offset.fixture.html');
    $('.aos-item').addClass('aos-init');
  });

  afterEach(function() {
    jasmine.getStyleFixtures().cleanUp();
    jasmine.getFixtures().cleanUp();
  });

  it('on aos-item--1 should equal 50', function(done) {
    var node = document.querySelector('.aos-item--1');

    setTimeout(function() {
      expect(calculateOffset(node)).toBe(50);
      done();
    }, delay);
  });

  it('on aos-item--2 should equal 200', function(done) {
    var node = document.querySelector('.aos-item--2');

    setTimeout(function() {
      expect(calculateOffset(node)).toBe(200);
      done();
    }, delay);
  });

  it('on aos-item--6 should equal 800', function(done) {
    var node = document.querySelector('.aos-item--6');

    setTimeout(function() {
      expect(calculateOffset(node)).toBe(800);
      done();
    }, delay);
  });

});
