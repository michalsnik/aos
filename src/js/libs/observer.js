let callback = () => {};

function ready(selector, fn) {
  const doc = window.document;
  const MutationObserver =
  window.MutationObserver ||
  window.WebKitMutationObserver ||
  window.MozMutationObserver;

  const observer = new MutationObserver(check);
  callback = fn;

  observer.observe(doc.documentElement, {
    childList: true,
    subtree: true,
    removedNodes: true
  });
}

function check(mutations) {
  if (!mutations) return;

  mutations.forEach(mutation => {
    const addedNodes = Array.prototype.slice.call(mutation.addedNodes);
    const removedNodes = Array.prototype.slice.call(mutation.removedNodes);

    const anyAOSElementAdded = addedNodes
      .concat(removedNodes)
      .filter(el => el.hasAttribute && el.hasAttribute('data-aos'))
      .length;

    if (anyAOSElementAdded) {
      callback();
    }
  });
}

export default ready;
