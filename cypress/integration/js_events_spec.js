describe('JS Events', function() {
  context('default events', function() {
    let aosInStub;
    let aosOutStub;

    before(() => {
      aosInStub = cy.stub();
      aosOutStub = cy.stub();
      cy
        .visit('/')
        .document()
        .then(document => {
          document.addEventListener('aos:in', aosInStub);
          document.addEventListener('aos:out', aosOutStub);
        })
        .initAOS();
    });

    it('Should trigger custom events', function() {
      expect(aosInStub).to.have.callCount(6);
      expect(aosOutStub).to.be.not.called;

      cy.scrollTo(0, 800);
      cy.wait(0, () => {
        expect(aosInStub).to.have.callCount(15);
      });

      cy.scrollTo('top');
      cy.wait(0, () => {
        expect(aosInStub).to.have.callCount(15);
        expect(aosOutStub).to.have.callCount(9);
      });
    });
  });

  context('custom events', function() {
    let aosInStub;
    let aosOutStub;

    before(() => {
      aosInStub = cy.stub();
      aosOutStub = cy.stub();
      cy
        .visit('/')
        .document()
        .then(document => {
          document.addEventListener('aos:in:super-duper', aosInStub);
          document.addEventListener('aos:out:super-duper', aosOutStub);
        })
        .initAOS();
    });

    it('Should trigger custom events', function() {
      expect(aosInStub).to.be.not.called;
      expect(aosOutStub).to.be.not.called;

      cy.scrollTo(0, 350);
      cy.wait(0, () => {
        expect(aosInStub).to.be.calledOnce;
      });

      cy.scrollTo('top');
      cy.wait(0, () => {
        expect(aosOutStub).to.be.calledOnce;
      });
    });
  });
});
