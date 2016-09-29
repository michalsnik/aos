/* Clearing variables */

import calculateOffset from './calculateOffset';

const prepare = function ($elements, options) {
  $elements.forEach((el, i) => {
    el.node.classList.add('aos-init');
    el.position = calculateOffset(el.node, options.offset);
  });
  return $elements;
};

export default prepare;
