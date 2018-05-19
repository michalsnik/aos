describe('AOS', function() {
  before(() => {
    cy.visit('/');
    cy.initAOS();
  });

  it('Should be defined', function() {
    cy
      .window()
      .its('AOS')
      .should('exist');
  });

  it('Should have init method', function() {
    cy
      .window()
      .its('AOS.init')
      .should('exist');
  });

  it('Should have refresh method', function() {
    cy
      .window()
      .its('AOS.refresh')
      .should('exist');
  });

  it('Should have refreshHard method', function() {
    cy
      .window()
      .its('AOS.refreshHard')
      .should('exist');
  });

  it('Should add aos-init class on all elements', function() {
    cy.get('.aos-init').should('have.length', 24);
  });

  it('Should add aos-animate class on all visible elements', () => {
    cy.get('.aos-animate').should('have.length', 6);
  });

  it('Should add or remove aos-animate classes regarding to their visibility after scroll', () => {
    cy.scrollTo(0, 200);
    cy.get('.aos-animate').should('have.length', 9);

    cy.scrollTo(0, 800);
    cy.get('.aos-animate').should('have.length', 15);

    cy.scrollTo('top');
    cy.get('.aos-animate').should('have.length', 6);
  });

  it('Should refresh on window resize and orientation change', () => {
    cy.viewport('iphone-6');
    cy.get('.aos-animate').should('have.length', 2);

    cy.scrollTo(0, 100);
    cy.get('.aos-animate').should('have.length', 2);

    cy.viewport('iphone-6', 'landscape');
    cy.get('.aos-animate').should('have.length', 4);

    cy.scrollTo(0, 450);
    cy.get('.aos-animate').should('have.length', 6);

    cy.scrollTo('top');
    cy.get('.aos-animate').should('have.length', 2);

    cy.viewport(1280, 720);
    cy.get('.aos-animate').should('have.length', 6);
  });
});
