/* Clearing variables */

import { getPositionIn, getPositionOut } from './offsetCalculator';
import getInlineOption from './getInlineOption';

const prepare = function ($elements, options) {
  $elements.forEach((el, i) => {
    const mirror = getInlineOption(el.node, 'mirror', options.mirror);
    const once = getInlineOption(el.node, 'once', options.once);

    el.node.classList.add('aos-init');

    el.position = {
      in: getPositionIn(el.node, options.offset),
      out: mirror && getPositionOut(el.node, options.offset),
    };

    el.options = {
      once,
      mirror,
    };
  });

  return $elements;
};

export default prepare;
