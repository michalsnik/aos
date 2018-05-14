/**
 * Set or remove aos-animate class
 * @param {node} el         element
 * @param {int}  top        scrolled distance
 */
const setState = (el, top) => {
  if (el.options.mirror && top >= el.position.out && !el.options.once) {
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
 * @return {void}
 */
const handleScroll = $elements =>
  $elements.forEach((el, i) =>
    setState(el, window.pageYOffset)
  );

export default handleScroll;
