const doc = window.document;
const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

let listeners = [];
let observer;

function ready (selector, fn) {
  // Store the selector and callback to be monitored
  listeners.push({
    selector,
    fn
  });

  if (!observer && MutationObserver) {
    // Watch for changes in the document
    observer = new MutationObserver(check);
    observer.observe(doc.documentElement, {
      childList: true,
      subtree: true,
      removedNodes: true
    });
  }
  // Check if the element is currently in the DOM
  check();
}

function check() {
  // Check the DOM for elements matching a stored selector
  for (let i = 0, len = listeners.length, listener, elements; i < len; i++) {
    listener = listeners[i];
    // Query for elements matching the specified selector
    elements = doc.querySelectorAll(listener.selector);
    for (let j = 0, jLen = elements.length, element; j < jLen; j++) {
      element = elements[j];
      // Make sure the callback isn't invoked with the
      // same element more than once
      if (!element.ready) {
        element.ready = true;
        // Invoke the callback with the element
        listener.fn.call(element, element);
      }
    }
  }
}

export default ready;
