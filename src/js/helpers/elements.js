/**
 * Generate initial array with elements as objects
 * This array will be extended later with elements attributes values
 * like 'position'
 */
var createArrayWithElements = function (elements) {
  var elements = elements || document.querySelectorAll('[aos]');
  var finalElements = [];

  [].forEach.call(elements, function(el, i) {
    finalElements.push({
      node: el
    });
  });

  return finalElements;
}

module.exports = createArrayWithElements;
