/* Clearing variables */

import calculateOffset from './calculateOffset';
import getInlineOption from './getInlineOption';

const prepare = function ($elements, options) {
  $elements.forEach((el, i) => {
    const positionIn = calculateOffset(el.node, options.offset);
    const positionOut = positionIn + window.innerHeight;

    el.node.classList.add('aos-init');
    el.position = {
      in: positionIn,
      out: positionOut
    };
    el.options = {
      once: getInlineOption(el, 'once', options.once),
      mirror: getInlineOption(el, 'mirror', options.mirror)
    }
  });

  return $elements;
};

export default prepare;
