/* Clearing variables */

var calculateOffset = require('./calculateOffset');

var prepare = function ($elements) {

    [].forEach.call($elements, function(el, i) {
        el.node.classList.add('aos-init');
        el.position = calculateOffset(el.node);
    });

    return $elements;
};

module.exports = prepare;