/**
 * AOS (Animate on scroll) - wowjs alternative
 * made to animate elements on scroll in both directions
 */

;(function(window, document, undefined) {

  /**
   * Device detector
   */
  var _detect = {
    phone: function () {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    },
    mobile: function () {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    },
    tablet: function () {
      return _detect.mobile() && !_detect.phone();
    }
  };

  /**
   * Extend one object
   * with properties from another
   */
  var _extend = function (a, b) {
    for(var key in b) {
      if(b.hasOwnProperty(key)) a[key] = b[key];
    }
    return a;
  };

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
    duration: 400,
    disable: null,
    once: false,
    initOnTrigger: false
  };

  /**
   * Get offset of DOM element Helper
   * including these with translation properly as well
   *
   * @param  {Node} el [DOM element]
   * @return {Object} [top and left offset]
   */
  var getOffset = function (el) {
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
  };

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
    // var $el = $(el);
    var elementOffsetTop = 0;
    var additionalOffset = 0;
    var attrs = {
      offset: el.getAttribute('aos-offset'),
      anchor: el.getAttribute('aos-anchor'),
      anchorPlacement: el.getAttribute('aos-anchor-placement')
    };

    if (attrs.offset && !isNaN(attrs.offset)) {
      additionalOffset = parseInt(attrs.offset);
    }

    if (attrs.anchor && document.querySelectorAll(attrs.anchor)) {
      el = document.querySelectorAll(attrs.anchor)[0];
    }

    elementOffsetTop = getOffset(el).top;

    switch (attrs.anchorPlacement) {
      case 'top-bottom':
        // Default offset
      break;
      case 'center-bottom':
        elementOffsetTop += el.offsetHeight/2;
      break;
      case 'bottom-bottom':
        elementOffsetTop += el.offsetHeight;
      break;
      case 'top-center':
        elementOffsetTop += windowHeight/2;
      break;
      case 'bottom-center':
        elementOffsetTop += windowHeight/2 + el.offsetHeight;
      break;
      case 'center-center':
        elementOffsetTop += windowHeight/2 + el.offsetHeight/2;
      break;
      case 'top-top':
        elementOffsetTop += windowHeight;
      break;
      case 'bottom-top':
        elementOffsetTop += el.offsetHeight + windowHeight;
      break;
      case 'center-top':
        elementOffsetTop += el.offsetHeight/2 + windowHeight;
      break;
    }

    if(!attrs.anchorPlacement && isNaN(attrs.offset)) {
      additionalOffset = options.offset;
    }

    return elementOffsetTop + additionalOffset;
  };

  /**
   * Scroll logic
   * and all that funny things
   * are right here
   */
  var handleScroll = function(){
    scrollTop = window.pageYOffset;

    for(var i = 0; i < aosElementsPositions.length; i++) {
      if (scrollTop > aosElementsPositions[i] - windowHeight) {
        $aosElements[i].classList.add('aos-animate');
      } else if (!options.once){
        $aosElements[i].classList.remove('aos-animate');
      }
    }
  };

  /**
   * Generate arrays with elements
   * and offsets
   */
  var generate = function() {
    /* Clearing variables */

    aosElementsPositions = [];
    aosElementsDelays = [];

    initialized = true;

    windowHeight = window.innerHeight;

    var el = null;

    for(var i = 0; i < $aosElements.length; i++) {
      el = $aosElements[i];

      el.classList.add('aos-init');
      aosElementsDelays.push(el.getAttribute('aos-delay') || 0);
      aosElementsPositions.push(calculateOffset(el));
    }
  };

  /**
   * Refresh AOS
   */
  var refresh = function() {
    generate();
    handleScroll();
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
    options = _extend(options, settings);

    $aosElements = document.querySelectorAll('[aos]');

    if(options.disable) {
      if(
        options.disable === true ||
        (options.disable === 'mobile' && _detect.mobile()) ||
        (options.disable === 'phone' && _detect.phone()) ||
        (options.disable === 'tablet' && _detect.tablet()) ||
        (typeof options.disable === 'function' && options.disable() === true)
      ) {
        [].forEach.call($aosElements, function(el, i) {
          el.removeAttribute('aos');
          el.removeAttribute('aos-easing');
          el.removeAttribute('aos-duration');
          el.removeAttribute('aos-delay');
        });
        return false;
      }
    }

    document.querySelector('body').setAttribute('aos-easing', options.easing);
    document.querySelector('body').setAttribute('aos-duration', options.duration);
    document.querySelector('body').setAttribute('aos-delay', options.delay);

    if (!options.initOnTrigger) {
      document.addEventListener('DOMContentLoaded', function() {
        generate();
        handleScroll();
      });
    } else {
      $(document).on('aos_start', function(event) {
        generate();
        handleScroll();
      });
    }

    window.addEventListener('resize', _debounce(generate, 50, true));
    window.addEventListener('orientationchange', _debounce(generate, 50, true));
    window.addEventListener('scroll', _throttle(handleScroll, 99));

    /**
     * Watch if nodes are removed
     * If so refresh plugin data
     */
    document.addEventListener('DOMNodeRemoved', function (event) {
      var el = event.target;
      if (el && el.nodeType === 1 && el.hasAttribute && event.target.hasAttribute('aos')) {
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
    observe('[aos]', function(element) {
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
    refresh: refresh
  };



  /**
   * Expose AOS as a global
   * or requre.js module
   */
  if (typeof define === 'function' && define.amd) {
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

  var _throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  /**
   * Minimal classList shim for IE 9
   * By Devon Govett
   * MIT LICENSE
   */
  if (!("classList" in document.documentElement) && Object.defineProperty && typeof HTMLElement !== 'undefined') {
      Object.defineProperty(HTMLElement.prototype, 'classList', {
          get: function() {
              var self = this;
              function update(fn) {
                  return function(value) {
                      var classes = self.className.split(/\s+/),
                          index = classes.indexOf(value);

                      fn(classes, index, value);
                      self.className = classes.join(" ");
                  }
              }

              var ret = {                    
                  add: update(function(classes, index, value) {
                      ~index || classes.push(value);
                  }),

                  remove: update(function(classes, index) {
                      ~index && classes.splice(index, 1);
                  }),

                  toggle: update(function(classes, index, value) {
                      ~index ? classes.splice(index, 1) : classes.push(value);
                  }),

                  contains: function(value) {
                      return !!~self.className.split(/\s+/).indexOf(value);
                  },

                  item: function(i) {
                      return self.className.split(/\s+/)[i] || null;
                  }
              };
              
              Object.defineProperty(ret, 'length', {
                  get: function() {
                      return self.className.split(/\s+/).length;
                  }
              });

              return ret;
          }
      });
  }

})(window, document);




/**
 * Observer implementation
 */
(function(win) {
    'use strict';

    var listeners = [],
    doc = win.document,
    MutationObserver = win.MutationObserver || win.WebKitMutationObserver,
    observer;

    function ready(selector, fn) {
        // Store the selector and callback to be monitored
        listeners.push({
            selector: selector,
            fn: fn
        });
        if(!observer && MutationObserver){
            // Watch for changes in the document
            observer = new MutationObserver(check);
            observer.observe(doc.documentElement, {
                childList: true,
                subtree: true,
                removedNodes: true
            });
        }
        // Check if the element is currently in the DOM
        check();
    }

    function check() {
        // Check the DOM for elements matching a stored selector
        for (var i = 0, len = listeners.length, listener, elements; i < len; i++) {
            listener = listeners[i];
            // Query for elements matching the specified selector
            elements = doc.querySelectorAll(listener.selector);
            for (var j = 0, jLen = elements.length, element; j < jLen; j++) {
                element = elements[j];
                // Make sure the callback isn't invoked with the
                // same element more than once
                if (!element.ready) {
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