describe('setting: mirror', function() {
  before(() => {
    cy.visit('/');
    cy.viewport(1280, 650);
    cy.initAOS({
      mirror: true,
      offset: 50
    });
  });

  it('Should animate in and out', function() {
    cy.get('.aos-animate').should('have.length', 6);

    cy.scrollTo(0, 50);
    cy.get('.aos-animate').should('have.length', 9);
    cy
      .get('.aos-init')
      .eq(0)
      .should('have.class', 'aos-animate');

    cy.scrollTo(0, 300);
    cy.get('.aos-animate').should('have.length', 6);
    cy
      .get('.aos-init')
      .eq(0)
      .should('not.have.class', 'aos-animate');

    cy.scrollTo(0, 350);
    cy.get('.aos-animate').should('have.length', 9);
    cy
      .get('.aos-init')
      .eq(3)
      .should('have.class', 'aos-animate');

    cy.scrollTo(0, 600);
    cy.get('.aos-animate').should('have.length', 6);
    cy
      .get('.aos-init')
      .eq(3)
      .should('not.have.class', 'aos-animate');

    cy.scrollTo(0, 650);
    cy.get('.aos-animate').should('have.length', 9);
  });
});
