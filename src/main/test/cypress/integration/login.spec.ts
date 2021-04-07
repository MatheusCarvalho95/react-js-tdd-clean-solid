describe("login", () => {
  beforeEach(() => {
    cy.visit("login");
  });
  it("Shoud load with correct inital state", () => {
    cy.getByTestId("email-status").should(
      "have.attr",
      "title",
      "Campo obrigatório",
    );
  });
});
