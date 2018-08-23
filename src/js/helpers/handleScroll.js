/**
 * Set or remove aos-animate class
 * @param {node} el         element
 * @param {int}  top        scrolled distance
 * @param {void} once
 */
const setState = function (el, top, once) {
  const attrOnce = el.node.getAttribute('data-aos-once');
  if (top > el.position) {
    el.node.classList.add('aos-animate');
  } else if (typeof attrOnce !== 'undefined') {
    if (attrOnce === 'false' || (!once && attrOnce !== 'true')) {
      el.node.classList.remove('aos-animate');
    }
  }
};


/**
 * Scroll logic - add or remove 'aos-animate' class on scroll
 *
 * @param  {array} $elements         array of elements nodes
 * @param  {bool} once               plugin option
 * @return {void}
 */
const handleScroll = function ($elements, once, scrollContainer = window) {
  let scrollTop = null;
  let windowHeight = null;

  if(scrollContainer == window) {
    scrollTop = window.pageYOffset;
    windowHeight = window.innerHeight;
  } else {
    scrollTop = scrollContainer.scrollTop;
    windowHeight = scrollContainer.offsetHeight;
  }

  /**
   * Check all registered elements positions
   * and animate them on scroll
   */
  $elements.forEach((el, i) => {
    setState(el, windowHeight + scrollTop, once);
  });
};

export default handleScroll;
