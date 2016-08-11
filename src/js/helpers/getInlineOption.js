/**
 * Get inline option with a fallback.
 *
 * @param  {Node} el [Dom element]
 * @param  {String} key [Option key]
 * @param  {String} def [Default (fallback) value]
 * @return {Mixed} [Option set with inline attributes or fallback value if not set]
 */

const getInlineOption = function(el, key, def) {
  const attr = el.node.getAttribute('data-aos-' + key);
  if ( typeof attr !== 'undefined' && attr === 'true' ) {
    return true;
  } else if ( typeof attr !== 'undefined' && attr === 'false' ) {
    return false;
  }
  return def;
}

export default getInlineOption;
