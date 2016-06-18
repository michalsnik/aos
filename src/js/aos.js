/**
 * *******************************************************
 * AOS (Animate on scroll) - wowjs alternative
 * made to animate elements on scroll in both directions
 * *******************************************************
 */

import styles from './../sass/aos.scss';

// Modules & helpers
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';

import observe from './libs/observer';

import detect from './helpers/detector';
import handleScroll from './helpers/handleScroll';
import prepare from './helpers/prepare';
import elements from './helpers/elements';

/**
 * Private variables
 */
let $aosElements = [];
let initialized = false;

/**
 * Default options
 */
let options = {
  offset: 120,
  delay: 0,
  easing: 'ease',
  duration: 400,
  disable: false,
  once: false,
  startEvent: 'DOMContentLoaded'
};

/**
 * Refresh AOS
 */
const refresh = function refresh(initialize = false) {
  // Allow refresh only when it was first initialized on startEvent
  if (initialize) initialized = true;

  if (initialized) {
    // Extend elements objects in $aosElements with their positions
    $aosElements = prepare($aosElements, options);
    // Perform scroll event, to refresh view and show/hide elements
    handleScroll($aosElements, options.once);

    return $aosElements;
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
const init = function init(settings) {
  options = Object.assign(options, settings);

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
      $aosElements.forEach(function(el, i) {
        el.node.removeAttribute('data-aos');
        el.node.removeAttribute('data-aos-easing');
        el.node.removeAttribute('data-aos-duration');
        el.node.removeAttribute('data-aos-delay');
      });
      return false;
    }
  }


  /**
   * Set global settings on body, based on options
   * so CSS can use it
   */
  document.querySelector('body').setAttribute('data-aos-easing', options.easing);
  document.querySelector('body').setAttribute('data-aos-duration', options.duration);
  document.querySelector('body').setAttribute('data-aos-delay', options.delay);

  /**
   * Handle initializing
   */
  if (options.startEvent === 'DOMContentLoaded' &&
    ['complete', 'interactive'].includes(document.readyState)) {
    // Initialize AOS if default startEvent was already fired
    refresh(true);
  } else {
    // Listen to options.startEvent and initialize AOS
    document.addEventListener(options.startEvent, function() {
      refresh(true);
    });
  }

  /**
   * Refresh plugin on window resize or orientation change
   */
  window.addEventListener('resize', debounce(refresh, 50, true));
  window.addEventListener('orientationchange', debounce(refresh, 50, true));

  /**
   * Handle scroll event to animate elements on scroll
   */
  window.addEventListener('scroll', throttle(() => {
    handleScroll($aosElements, options.once);
  }, 99));

  /**
   * Watch if nodes are removed
   * If so refresh plugin
   */
  document.addEventListener('DOMNodeRemoved', (event) => {
    const el = event.target;
    if (el && el.nodeType === 1 && el.hasAttribute && el.hasAttribute('data-aos')) {
      debounce(refresh, 50, true)
    }
  });

  /**
   * Observe [aos] elements
   * If something is loaded by AJAX
   * it'll refresh plugin automatically
   */
  observe('[data-aos]', refresh);

  return $aosElements;
};

/**
 * Export Public API
 */
export default {
  init,
  refresh
};
