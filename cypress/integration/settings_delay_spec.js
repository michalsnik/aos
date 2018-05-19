describe('setting: delay', function() {
  before(() => {
    cy.visit('/');
  });

  it('Should set default delay attribue on body', function() {
    cy.initAOS();
    cy.get('body').should('have.attr', 'data-aos-delay', '0');
  });

  it('Should respect global delay setting and set attribue on body', function() {
    cy.initAOS({
      delay: 100
    });
    cy.get('body').should('have.attr', 'data-aos-delay', '100');
  });
});
