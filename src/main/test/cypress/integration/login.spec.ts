import faker from "faker";

const baseUrl: string = Cypress.config().baseUrl;
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

  it("Shoud present error if form is invalid", () => {
    cy.getByTestId("email").focus().type(faker.random.word());
    cy.getByTestId("email-status")
      .should("have.attr", "title", "Dados inválidos")
      .should("contain.text", "🔴");
    cy.getByTestId("password").focus().type(faker.random.alphaNumeric(3));
    cy.getByTestId("password-status")
      .should("have.attr", "title", "Dados inválidos")
      .should("contain.text", "🔴");
    cy.getByTestId("submitButton").should("have.attr", "disabled");
    cy.getByTestId("status-container").should("not.have.descendants");
  });

  it("Shoud present valid form", () => {
    cy.getByTestId("email").focus().type(faker.internet.email());
    cy.getByTestId("email-status")
      .should("have.attr", "title", "Ok..")
      .should("contain.text", "🟢");
    cy.getByTestId("password").focus().type(faker.random.alphaNumeric(6));
    cy.getByTestId("password-status")
      .should("have.attr", "title", "Ok..")
      .should("contain.text", "🟢");
    cy.getByTestId("submitButton").should("not.have.attr", "disabled");
    cy.getByTestId("status-container").should("not.have.descendants");
  });

  it("Shoud present error if credentials are invalid", () => {
    cy.getByTestId("email").focus().type(faker.internet.email());
    cy.getByTestId("password").focus().type(faker.random.alphaNumeric(6));
    cy.getByTestId("submitButton").click();
    cy.getByTestId("status-container")
      .getByTestId("spinner")
      .should("exist")
      .getByTestId("main-error")
      .should("not.exist")
      .getByTestId("spinner")
      .should("not.exist")
      .getByTestId("main-error")
      .should("exist");
    cy.url().should("eq", `${baseUrl}/login`);
  });

  it("Shoud save access token if valid credentials are provided", () => {
    cy.getByTestId("email").focus().type("mango@gmail.com");
    cy.getByTestId("password").focus().type("12345");
    cy.getByTestId("submitButton").click();
    cy.getByTestId("status-container")
      .getByTestId("spinner")
      .should("exist")
      .getByTestId("main-error")
      .should("not.exist")
      .getByTestId("spinner")
      .should("not.exist");
    cy.url().should("eq", `${baseUrl}/`);
    cy.window().then((window) =>
      assert.isOk(window.localStorage.getItem("accessToken")),
    );
  });
});