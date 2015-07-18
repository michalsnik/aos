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

  var initialized = false;

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
    var additionalOffset = 0;
    var attrs = {
      offset: $(el).attr('aos-offset'),
      anchor: $(el).attr('aos-anchor'),
      anchorPlacement: $(el).attr('aos-anchor-placement')
    };

    if (attrs.offset && !isNaN(attrs.offset)) {
      additionalOffset = parseInt(attrs.offset);
    }

    if (attrs.anchor && $(attrs.anchor)) {
      $el = $(attrs.anchor);
    }

    elementOffsetTop = getOffset($el.get(0)).top;

    switch (attrs.anchorPlacement) {
      case 'top-bottom':
        // Default offset
      break;
      case 'center-bottom':
        elementOffsetTop += $(el).outerHeight()/2;
      break;
      case 'bottom-bottom':
        elementOffsetTop += $(el).outerHeight();
      break;
      case 'top-center':
        elementOffsetTop += windowHeight/2;
      break;
      case 'bottom-center':
        elementOffsetTop += windowHeight/2 + $(el).outerHeight();
      break;
      case 'center-center':
        elementOffsetTop += windowHeight/2 + $(el).outerHeight()/2;
      break;
      case 'top-top':
        elementOffsetTop += windowHeight;
      break;
      case 'bottom-top':
        elementOffsetTop += $(el).outerHeight() + windowHeight;
      break;
      case 'center-top':
        elementOffsetTop += $(el).outerHeight()/2 + windowHeight;
      break;
      // Default top-bottom with additional offset from global settings
      default:
        elementOffsetTop += additionalOffset || options.offset;
      break;
    }


    return elementOffsetTop;
  };

  /**
   * Scroll logic
   * and all that funny things
   * are right here
   */
  var handleScroll = function(){
    scrollTop = window.scrollY;

    $.each(aosElementsPositions, function(i, elPos){
      if (scrollTop > elPos - windowHeight) {
        $aosElements.eq(i).addClass('aos-animate');
      } else {
        $aosElements.eq(i).removeClass('aos-animate');
      }
    });
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

    initialized = true;

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
    $('body').attr('aos-delay', options.delay);

    $(document).on('ready', function(){
      generate();
      handleScroll();
    });

    $(window)
      .on('resize orientationchange', _debounce(generate, 50, true))
      .on('scroll', _debounce(handleScroll, 15, true));

    /**
     * Watch if nodes are removed
     * If so refresh plugin data
     */
    document.addEventListener('DOMNodeRemoved', function (event) {
      if ($(event.target).is('[aos]')) {
        setTimeout(function(){
          generate();
          handleScroll();
        }, 50);
      }
    });

    /**
     * Observe [aos] elements
     * If something is loaded by AJAX
     * it'll refresh plugin data automatically
     */
    observe('[aos]', function(element){
      if (initialized) {
        generate();
        handleScroll();
      }
    });

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

/**
 * Observer implementation
 */
(function(win){
    'use strict';

    var listeners = [],
    doc = win.document,
    MutationObserver = win.MutationObserver || win.WebKitMutationObserver,
    observer;

    function ready(selector, fn){
        // Store the selector and callback to be monitored
        listeners.push({
            selector: selector,
            fn: fn
        });
        if(!observer){
            // Watch for changes in the document
            observer = new MutationObserver(check);
            observer.observe(doc.documentElement, {
                childList: true,
                subtree: true,
                removedNodes: true,
            });
        }
        // Check if the element is currently in the DOM
        check();
    }

    function check(){
        // Check the DOM for elements matching a stored selector
        for(var i = 0, len = listeners.length, listener, elements; i < len; i++){
            listener = listeners[i];
            // Query for elements matching the specified selector
            elements = doc.querySelectorAll(listener.selector);
            for(var j = 0, jLen = elements.length, element; j < jLen; j++){
                element = elements[j];
                // Make sure the callback isn't invoked with the
                // same element more than once
                if(!element.ready){
                    element.ready = true;
                    // Invoke the callback with the element
                    listener.fn.call(element, element);
                }
            }
        }
    }

    // Expose `ready`
    win.observe = ready;

})(this);