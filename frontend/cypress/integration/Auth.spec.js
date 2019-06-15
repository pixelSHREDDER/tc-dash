describe("Some APP", () => {
    beforeEach(() => {
        cy.fixture("users/admin").as("admin");
      });

      it("Should be able to login: admin", function() {
        cy.visit("/");
        cy
            .get("button.MuiButton-containedPrimary")
            .click();
        cy
          .get('input[name="email"]')
          .type(this.admin.email)
          .should("have.value", this.admin.email);
        cy
          .get('input[name="password"]')
          .type(this.admin.password)
          .should("have.value", this.admin.password);
        cy.get("form").submit();
        cy.location("pathname").should("eq", "/");
      });
  });