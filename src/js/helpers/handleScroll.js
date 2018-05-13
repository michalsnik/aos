/**
 * Set or remove aos-animate class
 * @param {node} el         element
 * @param {int}  top        scrolled distance
 * @param {void} once
 */
const setState = function (el, top, once, willChangeOffset) {
  const attrOnce = el.node.getAttribute('data-aos-once');
  
  if (top > el.position) {
    el.node.classList.add('aos-animate');
  } else if (typeof attrOnce !== 'undefined') {
    if (attrOnce === 'false' || (!once && attrOnce !== 'true')) {
      el.node.classList.remove('aos-animate');
    }
  }
  
  if (el.position - willChangeOffset < top && top < el.position + willChangeOffset) { //add will-change to element to prepare for upcomming change
    el.node.style.willChange = 'transform, opacity';
  } else { //remove will-change from element to release resources
    el.node.style.willChange = 'auto';
  }
};


/**
 * Scroll logic - add or remove 'aos-animate' class on scroll
 *
 * @param  {array} $elements         array of elements nodes
 * @param  {bool} once               plugin option
 * @return {void}
 */
const handleScroll = function ($elements, once, willChangeOffset) {
  const scrollTop = window.pageYOffset;
  const windowHeight = window.innerHeight;
  /**
   * Check all registered elements positions
   * and animate them on scroll
   */
  $elements.forEach((el, i) => {
    setState(el, windowHeight + scrollTop, once, willChangeOffset);
  });
};

export default handleScroll;
