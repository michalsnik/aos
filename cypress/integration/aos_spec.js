describe('AOS', function () {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should be defined', function() {
    cy.window().its('AOS').should('exist');
  });

  it('Should have init method', function() {
    cy.window().its('AOS.init').should('exist');
  });

  it('Should have refresh method', function() {
    cy.window().its('AOS.refresh').should('exist');
  });

  it('Should have same number of elements after init', function() {
    cy.window().then(({ AOS }) => {
      const elements = AOS.init();
      cy.get('.aos-item').should('have.length', elements.length);
    });
  });

  it('Should have same number of elements after refresh', function() {
    cy.window().then(({ AOS }) => {
      let elements = AOS.init();
      elements = AOS.refresh(true);
      cy.get('.aos-item').should('have.length', elements.length);
    });
  });

  it('Should add aos-init class on all elements', function() {
    cy.get('.aos-init').should('have.length', 42);
  });

  it('Should add aos-animate class on all visible elements', () => {
    cy.get('.aos-animate').should('have.length', 6);
  });
});
