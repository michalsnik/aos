/**
 * Set or remove aos-animate class
 * @param {node} el         element
 * @param {int}  top        scrolled distance
 */
const setState = function (el, top) {
  if (top >= el.position.out && !el.options.once && el.options.mirror) {
    el.node.classList.remove('aos-animate');
  }
  else if (top >= el.position.in) {
    el.node.classList.add('aos-animate');
  }
  else if (!el.options.once) {
    el.node.classList.remove('aos-animate');
  }
};

/**
 * Scroll logic - add or remove 'aos-animate' class on scroll
 *
 * @param  {array} $elements         array of elements nodes
 * @param  {bool} once               plugin option
 * @return {void}
 */
const handleScroll = function ($elements) {
  const scrollTop = window.pageYOffset;
  const windowHeight = window.innerHeight;
  /**
   * Check all registered elements positions
   * and animate them on scroll
   */
  $elements.forEach((el, i) => {
    setState(el, windowHeight + scrollTop);
  });
};

export default handleScroll;
