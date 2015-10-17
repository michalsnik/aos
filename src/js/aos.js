/**
 * AOS (Animate on scroll) - wowjs alternative
 * made to animate elements on scroll in both directions
 */

var core = require('./aos-core');

;(function() {
    window.AOS = core(window);
})();