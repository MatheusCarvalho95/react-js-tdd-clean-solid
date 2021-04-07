describe("login", () => {
  beforeEach(() => {
    cy.visit("login");
  });
  it("Shoud load with correct inital state", () => {
    cy.getByTestId("email-status")
      .should("have.attr", "title", "Campo obrigatório")
      .should("contain.text", "🔴");
    cy.getByTestId("password-status")
      .should("have.attr", "title", "Campo obrigatório")
      .should("contain.text", "🔴");
    cy.getByTestId("submitButton").should("have.attr", "disabled");
    cy.getByTestId("status-container").should("not.have.descendants");
  });
});
