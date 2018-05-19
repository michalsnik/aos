describe('mutation observer', function() {
  before(() => {
    cy.visit('/async.html');
    cy.initAOS();
  });

  it('Should not animate any items if not present', function() {
    cy.get('.aos-item').should('have.length', 0);
    cy.get('.aos-animate').should('have.length', 0);
  });

  it('Should animate new items as they appear', function() {
    cy.dispatchEvent('add-aos-item');
    cy.get('.aos-item').should('have.length', 1);
    cy.get('.aos-animate').should('have.length', 1);

    cy.dispatchEvent('add-aos-item');
    cy.get('.aos-item').should('have.length', 2);
    cy.get('.aos-animate').should('have.length', 2);

    cy.dispatchEvent('add-aos-item');
    cy.get('.aos-item').should('have.length', 3);
    cy.get('.aos-animate').should('have.length', 3);

    cy.dispatchEvent('add-aos-item', 3);
    cy.get('.aos-item').should('have.length', 6);
    cy.get('.aos-animate').should('have.length', 6);

    cy.dispatchEvent('add-aos-item', 3);
    cy.get('.aos-item').should('have.length', 9);
    cy.get('.aos-animate').should('have.length', 6);

    cy.dispatchEvent('add-aos-item', 15);
    cy.get('.aos-item').should('have.length', 24);
    cy.get('.aos-animate').should('have.length', 6);
  });

  it('Should properly animate not visible items on scroll', () => {
    cy.scrollTo(0, 200);
    cy.get('.aos-animate').should('have.length', 9);

    cy.scrollTo('bottom');
    cy.get('.aos-animate').should('have.length', 24);

    cy.scrollTo('top');
    cy.get('.aos-animate').should('have.length', 6);
  });

  it('Should gracefully handle nodes deletion', function() {
    Cypress.$('.aos-item')[1].remove();
    cy.get('.aos-item').should('have.length', 23);
    cy.get('.aos-animate').should('have.length', 6);
  });
});
