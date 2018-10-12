describe('setting: container', function() {
  context('HTMLElement as container', function() {
    before(() => {
      cy.visit('/container.html');
    });

    it('Should initialize with HTMLElement', function() {
      cy.document().then(document => {
        const el = document.querySelector('.aos-all');
        cy.initAOS({
          container: el
        });
      });
      cy.get('.aos-animate').should('have.length', 6);
    });

    it('Should animate next 3 items on scroll', function() {
      cy.get('.aos-all').scrollTo(0, 100);
      cy.get('.aos-animate').should('have.length', 9);
    });
  });

  context('CSS Selector as container', function() {
    before(() => {
      cy.visit('/container.html');
      cy.initAOS({
        container: '.aos-all',
        mirror: true
      });
    });

    it('Should initialize with 6 items', function() {
      cy.get('.aos-animate').should('have.length', 6);
    });

    it('Should animate next 3 items on scroll', function() {
      cy.get('.aos-all').scrollTo(0, 100);
      cy.get('.aos-animate').should('have.length', 9);
    });
  });

  context('Should respect other properties', function() {
    before(() => {
      cy.visit('/container.html');
      cy.initAOS({
        container: '.aos-all',
        mirror: true
      });
    });

    it('Should respect: offset', function() {
      cy.get('.aos-all').scrollTo(0, 435);
      cy.get('.aos-animate').should('have.length', 8);

      cy.get('.aos-all').scrollTo(0, 730);
      cy.get('.aos-animate').should('have.length', 9);
    });

    it('Should respect: once', function() {
      cy.get('.aos-all').scrollTo(0, 435);
      cy.get('.aos-animate').should('have.length', 11);
    });
  });

  context('Should respect: anchor', function() {
    before(() => {
      cy.visit('/container-anchor.html');
      cy.initAOS({
        container: '.aos-anchors'
      });
    });

    it('Should properly animate elements according to anchor positions', () => {
      cy.get('.aos-animate').should('have.length', 0);

      cy.get('.aos-anchors').scrollTo(0, 50);
      cy.get('.aos-animate').should('have.length', 1);
      cy.get('[data-id="1"]').should('have.class', 'aos-animate');

      cy.get('.aos-anchors').scrollTo(0, 550);
      cy.get('.aos-animate').should('have.length', 2);
      cy.get('[data-id="2"]').should('have.class', 'aos-animate');

      cy.get('.aos-anchors').scrollTo(0, 810);
      cy.get('.aos-animate').should('have.length', 3);
      cy.get('[data-id="4"]').should('have.class', 'aos-animate');

      cy.get('.aos-anchors').scrollTo(0, 1050);
      cy.get('.aos-animate').should('have.length', 4);
      cy.get('[data-id="3"]').should('have.class', 'aos-animate');

      cy.get('.aos-anchors').scrollTo(0, 1320);
      cy.get('.aos-animate').should('have.length', 5);
      cy.get('[data-id="5"]').should('have.class', 'aos-animate');

      cy.get('.aos-anchors').scrollTo(0, 1580);
      cy.get('.aos-animate').should('have.length', 6);
      cy.get('[data-id="7"]').should('have.class', 'aos-animate');

      cy.get('.aos-anchors').scrollTo(0, 1810);
      cy.get('.aos-animate').should('have.length', 7);
      cy.get('[data-id="6"]').should('have.class', 'aos-animate');

      cy.get('.aos-anchors').scrollTo(0, 2080);
      cy.get('.aos-animate').should('have.length', 8);
      cy.get('[data-id="8"]').should('have.class', 'aos-animate');

      cy.get('.aos-anchors').scrollTo(0, 2570);
      cy.get('.aos-animate').should('have.length', 9);
      cy.get('[data-id="9"]').should('have.class', 'aos-animate');
    });
  });
});
