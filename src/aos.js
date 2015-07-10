/*
 * AOS (Animate on scroll) - wowjs alternative
 * made to animate elements on scroll in both directions
 *
 * TODO:
 * - add more easing functions
 * - add delay customization as optional attribute on element
 */

;(function(window, document, undefined) {

  /**
   * Private variables
   */
  var $aosElements = null;
  var windowHeight = 0;
  var aosElementsPositions = [];
  var scrollTop = 0;

  /**
   * Default options
   */
  var options = {
    /*
     * Lonely offset
     * Mayby one day there he'll find some friends
     */
    offset: 120,
    delay: 0
  };

  /**
   * Scroll logic
   * and all that funny things
   * are right here
   */
  var handleScroll = function(){
    scrollTop = $(window).scrollTop();

    $.each(aosElementsPositions, function(i, elPos) {
      if (scrollTop >= elPos - windowHeight) {
        if(options.delay){
          setTimeout(function(){
            $aosElements.eq(i).addClass('aos-animate');
          }, options.delay);
        }else{
          $aosElements.eq(i).addClass('aos-animate');
        }
      } else {
        $aosElements.eq(i).removeClass('aos-animate');
      }
    });
  };

  /**
   * And maybe here as well
   */
  var init = function(settings){
    /* Looking for some guest */
    $aosElements = $('[aos]');
    windowHeight = $(window).height();
    /* Clearing area to make place for some chicks */
    aosElementsPositions = [];

    /*
     * Merge user settings with default settings
     */
    options = $.extend({}, options, settings);

    /* Invite everyone */
    $aosElements.addClass('aos-init').each(function(i, el){
      /* Yeah, dancefloor isn't empty now! */
      var elementOffsetTop = $(el).offset().top;
      var additionalOffset = options.offset;
      var attrs = {
        offset: $(el).attr('aos-offset'),
        anchor: $(el).attr('aos-anchor')
      };

      if (attrs.offset && !isNaN(attrs.offset)) {
        additionalOffset = parseInt(attrs.offset);
      }

      if (attrs.anchor && $(attrs.anchor)) {
        elementOffsetTop = $(attrs.anchor).offset().top
      }

      aosElementsPositions.push(elementOffsetTop + additionalOffset);
    });

    /**
     * Start the real party
     * PARTY HARD
     */
    handleScroll();

    /*
     * Let them keep dancing, they're having fun
     * seriously
     */
    $(window).on('scroll', _debounce(handleScroll, 15, true));

  };

  /**
   * Public API
   */
  var AOS = {
    init: init
  };

  /**
   * Expose AOS as a global
   * or requre.js module
   */
  if(typeof define === 'function' && define.amd) {
    define([], function () {
      return AOS;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = AOS;
  } else {
    window.AOS = AOS;
  }

  /*
   * Underscore helpers
   * Don't touch it
   */
  var _now = Date.now || function() {
      return new Date().getTime();
  };
  var _debounce = function(func, wait, immediate) {
      var timeout, args, context, timestamp, result;

      var later = function() {
        var last = _now() - timestamp;

        if (last < wait && last > 0) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate) {
            result = func.apply(context, args);
            if (!timeout) context = args = null;
          }
        }
      };

      return function() {
        context = this;
        args = arguments;
        timestamp = _now();
        var callNow = immediate && !timeout;
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
          result = func.apply(context, args);
          context = args = null;
        }

        return result;
      };
  };

})(window, document);