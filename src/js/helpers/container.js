/**
 * Returns valid container, or null
 *
 * @param  {(HTMLElement|Window|String)}  container    AOS container
 * @return {(HTMLElement|Window|null)}
 */
export const resolveContainer = container => {
  if (container instanceof Element || container === window) return container;
  if (typeof container === 'string') {
    const queryResult = document.querySelector(container);
    if (queryResult) return queryResult;
  }
  return null;
};

/**
 * @param  {(HTMLElement|Window)}  container    AOS container
 * @return {int}
 */
export const getElementHeight = container => {
  return container === window ? container.innerHeight : container.clientHeight;
};

/**
 * @param  {(HTMLElement|Window)}  container    AOS container
 * @return {int}
 */
export const getElementOffset = container => {
  return container === window ? container.pageYOffset : container.scrollTop;
};
