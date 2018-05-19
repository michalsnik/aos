Cypress.Commands.add('initAOS', settings => {
  cy.window().then(({ AOS }) => {
    AOS.init(settings);
  });
});

Cypress.Commands.add('dispatchEvent', (eventName, times = 1) => {
  cy.window().then(window => {
    const event = new Event(eventName);
    for (let i = 0; i < times; i++) {
      window.document.dispatchEvent(event);
    }
  });
});
