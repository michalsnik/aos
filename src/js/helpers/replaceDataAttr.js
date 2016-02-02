/**
 * Replace [data-aos*] with [aos*] attr and then remove all [data-aos*]
 */
var replaceDataAttr = function () {
    var dataAttrs = ['[data-aos]', '[data-aos-offset]', '[data-aos-easing]', '[data-aos-delay]', '[data-aos-anchor]', '[data-aos-anchor-placement]', '[data-aos-once]'];
    var dataAttrsString = dataAttrs.join(', ');

    var elements = document.querySelectorAll(dataAttrsString);

    [].forEach.call(elements, function (el) {
        var regexDataAttr = /^data\-(.+)$/;
        var attrToRemove = [];

        [].forEach.call(el.attributes, function (attr) {
            if (regexDataAttr.test(attr.nodeName)) {
                var dataAttr = attr.nodeName.match(regexDataAttr)[0];
                var dataAttrBracket = '[' + dataAttr + ']';
                var simpleAttr = attr.nodeName.match(regexDataAttr)[1];

                if (
                    el.getAttribute(dataAttr).length &&
                    dataAttrs.indexOf(dataAttrBracket) !== -1
                ) {
                    el.setAttribute(simpleAttr, attr.nodeValue);
                    attrToRemove.push(dataAttr);
                }
            }
        });

        for (var i = 0; i < attrToRemove.length; i++) {
            el.removeAttribute(attrToRemove[i]);
        }
    });
};

module.exports = replaceDataAttr;
