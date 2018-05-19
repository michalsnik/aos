describe('setting: duration', function() {
  before(() => {
    cy.visit('/');
  });

  it('Should set default duration attribue on body', function() {
    cy.initAOS();
    cy.get('body').should('have.attr', 'data-aos-duration', '400');
  });

  it('Should respect global duration setting and set attribue on body', function() {
    cy.initAOS({
      duration: 2000
    });
    cy.get('body').should('have.attr', 'data-aos-duration', '2000');
  });
});
