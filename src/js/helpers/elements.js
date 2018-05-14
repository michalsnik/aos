/**
 * Generate initial array with elements as objects
 * This array will be extended later with elements attributes values
 * like 'position'
 */
export default () => {
  const elements = document.querySelectorAll('[data-aos]');
  return Array.prototype.map.call(elements, node => ({ node }));
};
