describe('setting: offset', function() {
  context('global', () => {
    before(() => {
      cy.visit('/');
    });

    context('400px', () => {
      before(() => {
        cy.initAOS({
          offset: 400
        });
      });

      it('Should animate 3 items', function() {
        cy.get('.aos-animate').should('have.length', 3);
      });

      it('Should animate next 3 items on scroll', function() {
        cy.scrollTo(0, 50);
        cy.get('.aos-animate').should('have.length', 6);
      });
    });

    context('0px', () => {
      before(() => {
        cy.initAOS({
          offset: 0
        });
      });

      it('Should animate 9 items', function() {
        cy.get('.aos-animate').should('have.length', 9);
        cy.scrollTo(0, 50);
        cy.get('.aos-animate').should('have.length', 9);
      });
    });
  });

  context('inline', () => {
    before(() => {
      cy.visit('/offset.html');
      cy.initAOS();
      cy.viewport(1280, 500);
    });

    it('Should properly tigger all animations', function() {
      cy.get('.aos-animate').should('have.length', 7);
      cy.scrollTo(0, 1 * 150);
      cy.get('.aos-animate').should('have.length', 8);
      cy.scrollTo(0, 2 * 150);
      cy.get('.aos-animate').should('have.length', 10);
      cy.scrollTo(0, 3 * 150);
      cy.get('.aos-animate').should('have.length', 11);
      cy.scrollTo(0, 4 * 150);
      cy.get('.aos-animate').should('have.length', 13);
      cy.scrollTo(0, 5 * 150);
      cy.get('.aos-animate').should('have.length', 14);
      cy.scrollTo(0, 6 * 150);
      cy.get('.aos-animate').should('have.length', 16);
      cy.scrollTo(0, 7 * 150);
      cy.get('.aos-animate').should('have.length', 17);
      cy.scrollTo(0, 8 * 150);
      cy.get('.aos-animate').should('have.length', 19);
      cy.scrollTo(0, 9 * 150);
      cy.get('.aos-animate').should('have.length', 20);
      cy.scrollTo(0, 10 * 150);
      cy.get('.aos-animate').should('have.length', 22);
      cy.scrollTo(0, 11 * 150);
      cy.get('.aos-animate').should('have.length', 23);
      cy.scrollTo(0, 12 * 150);
      cy.get('.aos-animate').should('have.length', 25);
      cy.scrollTo(0, 13 * 150);
      cy.get('.aos-animate').should('have.length', 26);
      cy.scrollTo(0, 14 * 150);
      cy.get('.aos-animate').should('have.length', 27);
    });
  });
});
