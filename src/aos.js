/**
 * AOS (Animate on scroll) - wowjs alternative
 * made to animate elements on scroll in both directions
 */

;(function(window, document, undefined) {

  /**
   * Private variables
   */
  var $aosElements = [];
  var aosElementsPositions = [];
  var aosElementsDelays = [];

  var windowHeight = 0;
  var scrollTop = 0;

  /**
   * Default options
   */
  var options = {
    offset: 120,
    delay: 0,
    easing: 'ease',
    duration: 400
  };

  /**
   * Get offset of DOM element Helper
   * including these with translation properly as well
   *
   * @param  {Node} el [DOM element]
   * @return {Object} [top and left offset]
   */
  getOffset = function (el) {
    var _x = 0;
    var _y = 0;

    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - (el.tagName != 'BODY' ? el.scrollTop : 0);
        _y += el.offsetTop - (el.tagName != 'BODY' ? el.scrollLeft : 0);
        el = el.offsetParent;
    }

    return {
      top: _y,
      left: _x
    };
  }

  /**
   * Calculate offset
   * basing on element's settings like:
   * - anchor
   * - offset
   *
   * @param  {Node} el [Dom element]
   * @return {Integer} [Final offset that will be used to trigger animation in good position]
   */
  var calculateOffset = function(el){
    var $el = $(el);
    var elementOffsetTop = 0;
    var additionalOffset = options.offset;
    var attrs = {
      offset: $(el).attr('aos-offset'),
      anchor: $(el).attr('aos-anchor')
    };

    if (attrs.offset && !isNaN(attrs.offset)) {
      additionalOffset = parseInt(attrs.offset);
    }

    if (attrs.anchor && $(attrs.anchor)) {
      $el = $(attrs.anchor);
    }

    elementOffsetTop = getOffset($el.get(0)).top;

    return elementOffsetTop + additionalOffset;
  };

  /**
   * Scroll logic
   * and all that funny things
   * are right here
   */
  var handleScroll = function(){
    scrollTop = window.scrollY;

    for(var i = 0; i < aosElementsPositions.length; i++) {
      if (scrollTop >= aosElementsPositions[i] - windowHeight) {
        setTimeout(function(){
          $aosElements.eq(i).addClass('aos-animate');
        }(i), (aosElementsDelays[i] || options.delay));
      } else {
        $aosElements.eq(i).removeClass('aos-animate');
      }
    }
  };

  /**
   * Generate arrays with elements
   * and offsets
   */
  var generate = function() {
    /* Clearing variables */
    $aosElements = $('[aos]');
    aosElementsPositions = [];
    aosElementsDelays = [];

    windowHeight = $(window).height();

    $aosElements.addClass('aos-init').each(function(i, el){
      aosElementsDelays.push($(el).attr('aos-delay') || 0);
      aosElementsPositions.push(calculateOffset(el));
    });
  };

  /**
   * Initializing AOS
   * - Create options merging defaults with user defined options
   * - Set attributes on <body> as global setting - css relies on it
   * - Attach preparing elements to document ready event,
   *   window resize and orientation change
   * - Attach function that handle scroll and everything connected to it
   *   to window scroll event and fire once document is ready to set initial state
   */
  var init = function(settings){
    options = $.extend({}, options, settings);

    $('body').attr('aos-easing', options.easing);
    $('body').attr('aos-duration', options.duration);

    $(document).on('ready', function(){
      generate();
      handleScroll();
    });

    $(window)
      .on('resize orientationchange', _debounce(generate, 50, true))
      .on('scroll', _debounce(handleScroll, 15, true));
  };

  /**
   * Public API
   */
  var AOS = {
    init: init,
    refresh: generate
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

  /**
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