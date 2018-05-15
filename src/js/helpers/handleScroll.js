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

/**
 * Set or remove aos-animate class
 * @param {node} el         element
 * @param {int}  top        scrolled distance
 */
const applyClasses = ({ options, position, node }, top) => {
  if (options.mirror && top >= position.out && !options.once) {
    removeClasses(node, options.animatedClassNames);
  }
  else if (top >= position.in) {
    addClasses(node, options.animatedClassNames);
  }
  else if (!options.once) {
    removeClasses(node, options.animatedClassNames);
  }
};

/**
 * Scroll logic - add or remove 'aos-animate' class on scroll
 *
 * @param  {array} $elements         array of elements nodes
 * @return {void}
 */
const handleScroll = ($elements) =>
  $elements.forEach((el, i) =>
    applyClasses(el, window.pageYOffset)
  );

export default handleScroll;
