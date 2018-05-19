describe('setting: initClassName', function() {
  context('with: "rawr"', function() {
    before(() => {
      cy.visit('/');
      cy.initAOS({
        initClassName: 'rawr'
      });
    });

    it('Should set proper class names on AOS elements', function() {
      cy.get('.aos-init').should('have.length', 0);
      cy.get('.rawr').should('have.length', 24);
    });
  });

  context('with: null', function() {
    before(() => {
      cy.visit('/');
      cy.initAOS({
        initClassName: null
      });
    });

    it('Should not set initial class name on AOS elements', function() {
      cy.get('.aos-init').should('have.length', 0);
    });
  });
});
