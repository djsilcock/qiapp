/*eslint-env mocha */
/*global cy */
describe("basic functionality", () => {
  it("displays", () => {
    cy.visit("http://localhost:3000/components/modal");
  });

  context("modal", () => {
    it("should popup and type", () => {
      cy.window().then((win) => {
        win.modalcontroller.current.open().then((values) => {
          win.modalvalues = values;
        });
      });
      cy.contains("Modal field")
        .click()
        .focused()
        .type("hello modal field")
        .closest("form")
        .contains("Submit")
        .click();
      cy.window()
        .its("modalvalues")
        .should("deep.equal", { hello: "hello modal field" });
    });
    it("should be initialised with values", () => {
      const formvalues = { hello: "sample data" };
      cy.window().then((win) => {
        win.modalcontroller.current.open(formvalues).then((values) => {
          win.modalvalues = values;
        });
      });
      cy.contains("Modal field").closest("form").contains("Submit").click();
      cy.window().its("modalvalues").should("deep.equal", formvalues);
    });
  });
});
