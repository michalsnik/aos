/* Clearing variables */

var calculateOffset = require('./calculateOffset');

var prepare = function ($elements) {

    [].forEach.call($elements, function(el, i) {
        el.node.classList.add('aos-init');
        el.delay = el.node.getAttribute('aos-delay') || 0;
        el.position = calculateOffset(el.node);
    });

    return $elements;
};

module.exports = prepare;