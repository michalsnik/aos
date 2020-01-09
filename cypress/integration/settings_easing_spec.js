describe('setting: easing', () => {
  before(() => {
    cy.visit('/');
  });

  it('Should set default easing attribue on body', () => {
    cy.initAOS();
    cy.get('body').should('have.attr', 'data-aos-easing', 'ease');
  });

  it('Should respect global easing setting and set attribue on body', () => {
    cy.initAOS({
      easing: 'ease-in-sine'
    });
    cy.get('body').should('have.attr', 'data-aos-easing', 'ease-in-sine');
  });
});
