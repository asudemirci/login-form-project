import { errorMessages } from "../../src/components/Login";
describe("Login Page Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  describe("Login Functionality", () => {
    it("Should log in successfully with correct credentials", () => {
      cy.get("[data-cy=input-email]").type("erdem.guntay@wit.com.tr");
      cy.get("[data-cy=input-password]").type("9fxIH0GXesEwH_I");
      cy.get("[data-cy=submit-button]").click();
      cy.url().should("include", "/success"); 
    });

  it("Should not log in with incorrect credentials", () => {
    cy.get("[data-cy=input-email]").type("wrong@example.com");
    cy.get("[data-cy=input-password]").type("Wrongpass123");
    cy.get("[data-cy=submit-button]").click();
    cy.url().should("not.include", "/success");
    cy.url().should("include", "/error"); 
  });
  });

  describe("Form Validation", () => {
    it("Should show an error for invalid email format", () => {
      cy.get("[data-cy=input-email]").type("wrongemail");
      cy.get("[data-cy=input-password]").type("Password1");
      cy.get("[data-cy=submit-button]").should("be.disabled");
      cy.get("[data-cy=email-error]").should("be.visible").and("contain", errorMessages.email);
    });

    it("Should show an error for weak password", () => {
      cy.get("[data-cy=input-email]").type("wrong@example.com");
      cy.get("[data-cy=input-password]").type("wrongpass");
      cy.get("[data-cy=submit-button]").should("be.disabled");
      cy.get("[data-cy=password-error]").should("be.visible").and("contain", errorMessages.password);
    });

    it("Should not show errors for valid credentials", () => {
      cy.get("[data-cy=input-email]").type("test@example.com");
      cy.get("[data-cy=input-password]").type("StrongPass123");
      cy.get("[data-cy=email-error]").should("not.exist");
      cy.get("[data-cy=password-error]").should("not.exist");
      cy.get("[data-cy=submit-button]").should("not.be.disabled");
    });
  });

  describe("UI Interactions", () => {
    it("Should check and uncheck Remember Me box", () => {
      cy.get("[data-cy=remember-me]").check().should("be.checked");
      cy.get("[data-cy=remember-me]").uncheck().should("not.be.checked");
    });
  });

});
