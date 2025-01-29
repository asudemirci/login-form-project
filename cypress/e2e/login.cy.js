describe("Login Page Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should log in successfully with correct credentials", () => {
    cy.get("[data-cy=input-email]").type("erdem.guntay@wit.com.tr");
    cy.get("[data-cy=input-password]").type("9fxIH0GXesEwH_I");
    cy.get("[data-cy=remember-me]").check();
    cy.get("[data-cy=submit-button]").click();
    cy.url().should("include", "/main"); 
  });

  it("Should not log in with incorrect credentials", () => {
    cy.get("[data-cy=input-email]").type("wrong@example.com");
    cy.get("[data-cy=input-password]").type("wrongpass");
    cy.get("[data-cy=submit-button]").click();
    cy.url().should("include", "/error");
  });

  it("Should not log in with empty fields", () => {
    cy.get("[data-cy=submit-button]").should("be.disabled");
  });

  it("Should not enable login button if credentials are incomplete", () => {
    cy.get("[data-cy=input-email]").type("erdem.guntay@wit.com.tr");
    cy.get("[data-cy=submit-button]").should("be.disabled");
  });

  it("Should check and uncheck Remember Me box", () => {
    cy.get("[data-cy=remember-me]").check().should("be.checked");
    cy.get("[data-cy=remember-me]").uncheck().should("not.be.checked");
  });
});