/**
 * Scroll logic - add or remove 'aos-animate' class on scroll
 *
 * @param  {array} $elements         array of elements nodes
 * @param  {bool} once               plugin option
 * @return {void}
 */
var handleScroll = function ($elements, once) {
    var scrollTop       = window.pageYOffset;
    var windowHeight    = window.innerHeight;

    /**
     * Check all registered elements positions
     * and animate them on scroll
     */
    [].forEach.call($elements, function(el, i) {
        var attrOnce = el.node.getAttribute('aos-once');

        if (scrollTop + windowHeight > el.position) {
            el.node.classList.add('aos-animate');
        } else if (typeof attrOnce !== 'undefined') {
            if (attrOnce === 'false' || (!once && attrOnce !== 'true')) {
                el.node.classList.remove('aos-animate');
            }
        }
    });
};

module.exports = handleScroll;