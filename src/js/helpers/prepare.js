/* Clearing variables */

var calculateOffset = require('./calculateOffset');

var prepare = function ($elements, options) {

    [].forEach.call($elements, function(el, i) {
        el.node.classList.add('aos-init');
        el.position = calculateOffset(el.node, options.offset);
    });

    return $elements;
};

module.exports = prepare;
