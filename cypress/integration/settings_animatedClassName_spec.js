describe('setting: animatedClassName', () => {
  context('with: "rawr"', () => {
    before(() => {
      cy.visit('/');
      cy.initAOS({
        animatedClassName: 'rawr'
      });
    });

    it('Should set proper class names on AOS elements', () => {
      cy.get('.aos-animate').should('have.length', 0);
      cy.get('.rawr').should('have.length', 6);

      cy.scrollTo(0, 800);
      cy.get('.aos-animate').should('have.length', 0);
      cy.get('.rawr').should('have.length', 15);
    });
  });

  context('with: null', () => {
    before(() => {
      cy.visit('/');
      cy.initAOS({
        animatedClassName: null
      });
    });

    it('Should not set class names on AOS elements on scroll', () => {
      cy.get('.aos-animate').should('have.length', 0);
      cy.scrollTo(0, 800);
      cy.get('.aos-animate').should('have.length', 0);
    });
  });
});
