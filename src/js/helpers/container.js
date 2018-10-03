/**
 * Return provided container if valid, otherwise throw an error
 */
export default container => {
  if (container instanceof Element || container == window) return container;
  if (typeof container === 'string') {
    const queryResult = document.querySelector(container);
    if (queryResult) return queryResult;
  }
  throw `[AOS] Defined property 'container' is not valid`;
};
