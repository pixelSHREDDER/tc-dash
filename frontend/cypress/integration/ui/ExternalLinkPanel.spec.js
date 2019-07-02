describe("External Link Panel", () => {
    beforeEach(() => {
        //cy.fixture("instance").as("instance");
        //cy.fixture("users/admin").as("admin");
        //cy.fixture("instance");
        cy.login();
      });

      it("Should be able to load External Link Panel", function() {
        cy.visit("/website/write-post");
        /*cy
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
        cy.get("form").submit();*/
        cy.location("pathname").should("eq", "/website/write-post");
      });
  });