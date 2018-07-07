/* Clearing variables */

import { getPositionIn, getPositionOut } from './offsetCalculator';
import getInlineOption from './getInlineOption';

const prepare = function($elements, options) {
  $elements.forEach((el, i) => {
    const mirror = getInlineOption(el.node, 'mirror', options.mirror);
    const once = getInlineOption(el.node, 'once', options.once);
    const id = getInlineOption(el.node, 'id');
    const customClassNames =
      options.useClassNames && el.node.getAttribute('data-aos');

    const animatedClassNames = [options.animatedClassName]
      .concat(customClassNames ? customClassNames.split(' ') : [])
      .filter(className => typeof className === 'string');

    if (options.initClassName) {
      el.node.classList.add(options.initClassName);
    }

    el.position = {
      in: getPositionIn(el.node, options.offset, options.anchorPlacement),
      out: mirror && getPositionOut(el.node, options.offset)
    };

    el.options = {
      once,
      mirror,
      animatedClassNames,
      id
    };
  });

  return $elements;
};

export default prepare;
