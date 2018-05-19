describe('setting: once', function() {
  context('global', () => {
    before(() => {
      cy.visit('/');
      cy.initAOS({
        once: true
      });
    });

    it('Should add aos-animate class on all visible elements', () => {
      cy.get('.aos-animate').should('have.length', 6);
    });

    it('Should add aos-animate class to all visible elements after scroll', () => {
      cy.scrollTo(0, 200);
      cy.get('.aos-animate').should('have.length', 9);

      cy.scrollTo(0, 800);
      cy.get('.aos-animate').should('have.length', 15);
    });

    it('Should not remove aos-animate class after scrolling up', () => {
      cy.scrollTo(0, 0);
      cy.get('.aos-animate').should('have.length', 15);
    });
  });

  context('inline', () => {
    before(() => {
      cy.visit('/once.html');
      cy.initAOS();
    });

    it('Should add aos-animate class on all visible elements', () => {
      cy.get('.aos-animate').should('have.length', 6);
    });

    it('Should add aos-animate class to all visible elements after scroll', () => {
      cy.scrollTo(0, 200);
      cy.get('.aos-animate').should('have.length', 9);

      cy.scrollTo('bottom');
      cy.get('.aos-animate').should('have.length', 21);
    });

    it('Should not remove aos-animate class after scrolling up', () => {
      cy.scrollTo(0, 0);
      cy.get('.aos-animate').should('have.length', 11);
      cy
        .get('.aos-init')
        .eq(8)
        .should('have.class', 'aos-animate');
      cy
        .get('.aos-init')
        .eq(10)
        .should('have.class', 'aos-animate');
      cy
        .get('.aos-init')
        .eq(12)
        .should('have.class', 'aos-animate');
      cy
        .get('.aos-init')
        .eq(16)
        .should('have.class', 'aos-animate');
      cy
        .get('.aos-init')
        .eq(20)
        .should('have.class', 'aos-animate');
    });
  });
});
