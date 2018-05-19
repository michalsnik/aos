describe('setting: disable', function() {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should properly disable AOS', function() {
    cy.initAOS({
      disable: true
    });

    cy.get('.aos-item[data-aos]').should('have.length', 0);
    cy.get('.aos-init').should('have.length', 0);
    cy.get('.aos-animate').should('have.length', 0);
  });

  it('Should respect function passed as "disable" value', function() {
    cy.viewport(360, 420);

    cy.window().then(({ AOS, innerWidth }) => {
      AOS.init({
        disable: () => innerWidth < 400
      });
    });

    cy.get('.aos-item[data-aos]').should('have.length', 0);
    cy.get('.aos-init').should('have.length', 0);
    cy.get('.aos-animate').should('have.length', 0);
  });
});
