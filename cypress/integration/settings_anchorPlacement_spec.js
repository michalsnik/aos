describe('setting: anchorPlacement', function() {
  beforeEach(() => {
    cy.visit('/index.html');
    cy.viewport(1280, 700);
  });

  context('global setting', () => {
    it('Should be respected by all elements', () => {
      cy.initAOS({
        offset: 0,
        anchorPlacement: 'top-center'
      });

      cy.get('.aos-animate').should('have.length', 6);

      cy.scrollTo(0, 300);
      cy.get('.aos-animate').should('have.length', 9);
    });

    it('Should respect default offset', () => {
      cy.initAOS({
        offset: 120,
        anchorPlacement: 'top-center'
      });

      cy.get('.aos-animate').should('have.length', 3);

      cy.scrollTo(0, 120);
      cy.get('.aos-animate').should('have.length', 6);
    });
  });

  context('inline setting', () => {
    it('Should override global setting and reset default offset', () => {
      cy.document().then(document => {
        const el = document.querySelector('[data-id="6"]');
        el.dataset.aosAnchorPlacement = 'bottom-center';
      });

      cy.initAOS({
        offset: 400,
        anchorPlacement: 'top-center'
      });

      cy.get('[data-id="6"]').should('not.have.class', 'aos-animate');

      cy.scrollTo(0, 290);
      cy.get('[data-id="6"]').should('not.have.class', 'aos-animate');

      cy.scrollTo(0, 300);
      cy.get('[data-id="6"]').should('have.class', 'aos-animate');
    });

    it('Should respect inline offset', () => {
      cy.document().then(document => {
        const el = document.querySelector('[data-id="6"]');
        el.dataset.aosAnchorPlacement = 'bottom-center';
        el.dataset.aosOffset = 100;
      });

      cy.initAOS({
        offset: 400,
        anchorPlacement: 'top-center'
      });

      cy.get('[data-id="6"]').should('not.have.class', 'aos-animate');

      cy.scrollTo(0, 300);
      cy.get('[data-id="6"]').should('not.have.class', 'aos-animate');

      cy.scrollTo(0, 400);
      cy.get('[data-id="6"]').should('have.class', 'aos-animate');
    });
  });
});
