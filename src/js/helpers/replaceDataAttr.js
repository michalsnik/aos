/**
 * Replace [data-aos*] with [aos*] attr and then remove all [data-aos*]
 */
var replaceDataAttr = function (elements) {
  var elements = elements || document.querySelectorAll('[data-aos], [data-aos-offset], [data-aos-easing], [data-aos-delay], [data-aos-anchor], [data-aos-anchor-placement], [data-aos-once]');

  [].forEach.call(elements, function(el, i) {
    var re_dataAttr = /^data\-(.+)$/;
    var attrToRemove = [];

    [].forEach.call(el.attributes, function(attr, index) {
      if (re_dataAttr.test(attr.nodeName)) {
        var dataAttr = attr.nodeName.match(re_dataAttr)[0];
        var simpleAttr = attr.nodeName.match(re_dataAttr)[1];

        if (el.getAttribute(dataAttr).length) {
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
