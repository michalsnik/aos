/**
 * Calculate offset
 * basing on element's settings like:
 * - anchor
 * - offset
 *
 * @param  {Node} el [Dom element]
 * @return {Integer} [Final offset that will be used to trigger animation in good position]
 */

var getOffset = require('./../libs/offset');

var calculateOffset = function(el, optionalOffset) {
    var elementOffsetTop = 0;
    var additionalOffset = 0;
    var windowHeight = window.innerHeight;
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
            elementOffsetTop += el.offsetHeight / 2;
            break;
        case 'bottom-bottom':
            elementOffsetTop += el.offsetHeight;
            break;
        case 'top-center':
            elementOffsetTop += windowHeight / 2;
            break;
        case 'bottom-center':
            elementOffsetTop += windowHeight / 2 + el.offsetHeight;
            break;
        case 'center-center':
            elementOffsetTop += windowHeight / 2 + el.offsetHeight / 2;
            break;
        case 'top-top':
            elementOffsetTop += windowHeight;
            break;
        case 'bottom-top':
            elementOffsetTop += el.offsetHeight + windowHeight;
            break;
        case 'center-top':
            elementOffsetTop += el.offsetHeight / 2 + windowHeight;
            break;
    }

    if (!attrs.anchorPlacement && !attrs.offset && !isNaN(optionalOffset)) {
        additionalOffset = optionalOffset;
    }

    return elementOffsetTop + additionalOffset;
};

module.exports = calculateOffset;
