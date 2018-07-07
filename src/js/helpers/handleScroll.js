import detect from './detector';

/**
 * Adds multiple classes on node
 * @param {DOMNode} node
 * @param {array}  classes
 */
const addClasses = (node, classes) =>
  classes && classes.forEach(className => node.classList.add(className));

/**
 * Removes multiple classes from node
 * @param {DOMNode} node
 * @param {array}  classes
 */
const removeClasses = (node, classes) =>
  classes && classes.forEach(className => node.classList.remove(className));

const fireEvent = (eventName, data) => {
  let customEvent;

  if (detect.ie11()) {
    customEvent = document.createEvent('CustomEvent');
    customEvent.initCustomEvent(eventName, true, true, { detail: data });
  } else {
    customEvent = new CustomEvent(eventName, {
      detail: data
    });
  }

  return document.dispatchEvent(customEvent);
};

/**
 * Set or remove aos-animate class
 * @param {node} el         element
 * @param {int}  top        scrolled distance
 */
const applyClasses = (el, top) => {
  const { options, position, node, data } = el;

  const hide = () => {
    if (!el.animated) return;

    removeClasses(node, options.animatedClassNames);
    fireEvent('aos:out', node);

    if (el.options.id) {
      fireEvent(`aos:in:${el.options.id}`, node);
    }

    el.animated = false;
  };

  const show = () => {
    if (el.animated) return;

    addClasses(node, options.animatedClassNames);

    fireEvent('aos:in', node);
    if (el.options.id) {
      fireEvent(`aos:in:${el.options.id}`, node);
    }

    el.animated = true;
  };

  if (options.mirror && top >= position.out && !options.once) {
    hide();
  } else if (top >= position.in) {
    show();
  } else if (el.animated && !options.once) {
    hide();
  }
};

/**
 * Scroll logic - add or remove 'aos-animate' class on scroll
 *
 * @param  {array} $elements         array of elements nodes
 * @return {void}
 */
const handleScroll = $elements =>
  $elements.forEach((el, i) => applyClasses(el, window.pageYOffset));

export default handleScroll;
