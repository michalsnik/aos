var createArrayWithElements = function () {
  var elements = document.querySelectorAll('[aos]');
  var finalElements = [];

  [].forEach.call(elements, function(el, i) {
    finalElements.push({
      node: el
    });
  });

  return finalElements;
}

module.exports = createArrayWithElements;