describe('setting: disableMutationObserver', function() {
  before(() => {
    cy.visit('/async.html');
    cy.initAOS({
      disableMutationObserver: true
    });
  });

  it('Should not detect any changes in DOM, and thus not animate any elements as a result', function() {
    cy.dispatchEvent('add-aos-item', 20);
    cy.get('.aos-item').should('have.length', 20);
    cy.get('.aos-animate').should('have.length', 0);
  });

  it('Should not animate dynamically loaded elements on scroll', function() {
    cy.scrollTo('bottom');
    cy.get('.aos-animate').should('have.length', 0);
  });
});
