Cypress.Commands.add('initAOS', (settings) => {
  cy.window().then(({ AOS }) => {
    AOS.init(settings);
  });
});

Cypress.Commands.add('dispatchEvent', (eventName) => {
  cy.window().then(window => {
    const event = new Event(eventName);
    window.document.dispatchEvent(event);
  });
});
