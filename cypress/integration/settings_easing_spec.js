describe('setting: easing', function() {
  before(() => {
    cy.visit('/');
  });

  it('Should set default easing attribue on body', function() {
    cy.initAOS();
    cy.get('body').should('have.attr', 'data-aos-easing', 'ease');
  });

  it('Should respect global easing setting and set attribue on body', function() {
    cy.initAOS({
      easing: 'ease-in-sine'
    });
    cy.get('body').should('have.attr', 'data-aos-easing', 'ease-in-sine');
  });
});
