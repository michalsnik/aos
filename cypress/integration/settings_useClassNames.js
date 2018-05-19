describe('setting: useClassNames', function() {
  context('just useClassNames', function() {
    before(() => {
      cy.visit('/animatecss.html');
      cy.initAOS({
        useClassNames: true
      });
    });

    it('Should set proper custom class names on AOS elements', function() {
      cy.get('.aos-animate').should('have.length', 6);
      cy.get('.fadeInUp').should('have.length', 6);

      cy.scrollTo(0, 800);
      cy.get('.aos-animate').should('have.length', 15);
      cy.get('.fadeInUp').should('have.length', 15);
    });
  });

  context('with animatedClassName and initClassName', function() {
    before(() => {
      cy.visit('/animatecss.html');
      cy.initAOS({
        useClassNames: true,
        initClassName: false,
        animatedClassName: 'animate'
      });
    });

    it('Should set proper custom class names on AOS elements', function() {
      cy.get('.aos-init').should('have.length', 0);
      cy.get('.aos-animate').should('have.length', 0);

      cy.get('.animate').should('have.length', 6);
      cy.get('.fadeInUp').should('have.length', 6);

      cy.scrollTo(0, 800);
      cy.get('.aos-animate').should('have.length', 0);
      cy.get('.animate').should('have.length', 15);
      cy.get('.fadeInUp').should('have.length', 15);
    });
  });
});
