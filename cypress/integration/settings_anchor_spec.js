describe('setting: anchor', function() {
  before(() => {
    cy.visit('/anchor.html');
    cy.viewport(1280, 700);
    cy.initAOS({
      offset: 0
    });
  });

  it('Should properly animate elements according to anchor positions', () => {
    cy.get('.aos-animate').should('have.length', 0);

    cy.scrollTo(0, 50);
    cy.get('.aos-animate').should('have.length', 1);
    cy.get('[data-id="1"]').should('have.class', 'aos-animate');

    cy.scrollTo(0, 550);
    cy.get('.aos-animate').should('have.length', 2);
    cy.get('[data-id="2"]').should('have.class', 'aos-animate');

    cy.scrollTo(0, 750);
    cy.get('.aos-animate').should('have.length', 3);
    cy.get('[data-id="4"]').should('have.class', 'aos-animate');

    cy.scrollTo(0, 1050);
    cy.get('.aos-animate').should('have.length', 4);
    cy.get('[data-id="3"]').should('have.class', 'aos-animate');

    cy.scrollTo(0, 1250);
    cy.get('.aos-animate').should('have.length', 5);
    cy.get('[data-id="5"]').should('have.class', 'aos-animate');

    cy.scrollTo(0, 1450);
    cy.get('.aos-animate').should('have.length', 6);
    cy.get('[data-id="7"]').should('have.class', 'aos-animate');

    cy.scrollTo(0, 1750);
    cy.get('.aos-animate').should('have.length', 7);
    cy.get('[data-id="6"]').should('have.class', 'aos-animate');

    cy.scrollTo(0, 1950);
    cy.get('.aos-animate').should('have.length', 8);
    cy.get('[data-id="8"]').should('have.class', 'aos-animate');

    cy.scrollTo(0, 2450);
    cy.get('.aos-animate').should('have.length', 9);
    cy.get('[data-id="9"]').should('have.class', 'aos-animate');
  });
});
