/**
 * AOS (Animate on scroll) - wowjs alternative
 * made to animate elements on scroll in both directions
 */

;
(function(window, document, undefined) {
    /**
     * Modules & helpers
     */
    var _throttle           = require('lodash.throttle');
    var _debounce           = require('lodash.debounce');
    var _extend             = require('lodash.assign');
    var observe             = require('./modules/observer');
    var detect              = require('./modules/detector');
    var classListShim       = require('./modules/classList-shim');
    var calculateOffset     = require('./modules/calculateOffset');
    var handleScroll        = require('./modules/handleScroll');
    var prepare             = require('./modules/prepare');
    var elements            = require('./modules/elements');

    /**
     * Private variables
     */
    var $aosElements = [];
    var initialized = false;

    /**
     * Default options
     */
    var options = {
        offset:     120,
        delay:      0,
        easing:     'ease',
        duration:   400,
        disable:    false,
        once:       false,
        startEvent: 'DOMContentLoaded'
    };

    /**
     * Refresh AOS
     */
    var refresh = function() {
        // Allow refresh only when it was first initialized on startEvent
        if (initialized) {
            // Fill elements objects in $aosElements with their delays and positions
            $aosElements = prepare($aosElements);
            // Perform scroll event, to refresh view and show/hide elements
            handleScroll($aosElements, options.once);
        }
    };

    /**
     * Initializing AOS
     * - Create options merging defaults with user defined options
     * - Set attributes on <body> as global setting - css relies on it
     * - Attach preparing elements to options.startEvent,
     *   window resize and orientation change
     * - Attach function that handle scroll and everything connected to it
     *   to window scroll event and fire once document is ready to set initial state
     */
    var init = function(settings) {
        options = _extend(options, settings);

        // Create initial array with elements -> to be fullfilled later with prepare()
        $aosElements = elements();

        /**
         * Check options.disable
         * and do not init plugin if conditions are true
         */
        if (options.disable) {
            if (
                options.disable === true ||
                (options.disable === 'mobile' && detect.mobile()) ||
                (options.disable === 'phone' && detect.phone()) ||
                (options.disable === 'tablet' && detect.tablet()) ||
                (typeof options.disable === 'function' && options.disable() === true)
            ) {
                [].forEach.call($aosElements, function(el, i) {
                    el.node.removeAttribute('aos');
                    el.node.removeAttribute('aos-easing');
                    el.node.removeAttribute('aos-duration');
                    el.node.removeAttribute('aos-delay');
                });
                return false;
            }
        }

        /**
         * Set global settings on body, based on options
         * so CSS can use it
         */
        document.querySelector('body').setAttribute('aos-easing', options.easing);
        document.querySelector('body').setAttribute('aos-duration', options.duration);
        document.querySelector('body').setAttribute('aos-delay', options.delay);

        /**
         * Listen to options.startEvent and fire first refresh
         */
        document.addEventListener(options.startEvent, function() {
            initialized = true;
            refresh();
        });

        /**
         * Refresh plugin on window resize or orientation change
         */
        window.addEventListener('resize orientationchange', _debounce(refresh, 50, true));

        /**
         * Handle scroll event to animate elements on scroll
         */
        window.addEventListener('scroll', _throttle(function() {
            handleScroll($aosElements, options.once);
        }, 99));

        /**
         * Watch if nodes are removed
         * If so refresh plugin
         */
        document.addEventListener('DOMNodeRemoved', function(event) {
            var el = event.target;
            if (el && el.nodeType === 1 && el.hasAttribute && event.target.hasAttribute('aos')) {
                _debounce(refresh, 50, true)
            }
        });

        /**
         * Observe [aos] elements
         * If something is loaded by AJAX
         * it'll refresh plugin automatically
         */
        observe('[aos]', refresh);

    };

    /**
     * Public API
     */
    var AOS = {
        init: init,
        refresh: refresh
    };

    /**
     * Expose AOS as a global or module
     */
    window.AOS = AOS;
    if (typeof define === 'function' && define.amd) {
        define([], function() {
            return AOS;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = AOS;
    }

})(window, document);