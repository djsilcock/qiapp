/*eslint-env mocha */
/*global cy */
describe("basic functionality", () => {
  it("displays", () => {
    cy.visit("http://localhost:3000/components/form");
  });
  context("Basic form entry", () => {
    it("can type into single input", () => {
      cy.contains("single input").click().focused().type("hello single input");
    });
    it("can type into multiline input", () => {
      cy.contains("multiple input")
        .click()
        .focused()
        .type("hello multiple input");
    });
    it("can check both checkboxes", () => {
      cy.contains("CB Option 1").click();
      cy.contains("CB Option 1")
        .then((el) => cy.get("#" + el[0].htmlFor))
        .should("be.checked");
      cy.contains("CB Option 2").click();
      cy.contains("CB Option 2")
        .then((el) => cy.get("#" + el[0].htmlFor))
        .should("be.checked");
    });
    it("can check only one radiobutton", () => {
      cy.contains("Radio Option 1").click();
      cy.contains("Radio Option 1")
        .then((el) => cy.get("#" + el[0].htmlFor))
        .should("be.checked");
      cy.contains("Radio Option 2").click();
      cy.contains("Radio Option 2")
        .then((el) => cy.get("#" + el[0].htmlFor))
        .should("be.checked");
      cy.contains("Radio Option 1")
        .then((el) => cy.get("#" + el[0].htmlFor))
        .should("not.be.checked");
    });
    context("the date field", () => {
      it("should popup the picker", () => {
        cy.get(".ui.popup").should("have.lengthOf", 0);
        cy.contains("date field").click().focused().as("datefield");
        cy.get(".ui.popup").should("not.have.lengthOf", 0);
        cy.get("@datefield").blur();
        cy.get(".ui.popup").should("have.lengthOf", 0);
      });
      it("should enter text", () => {
        cy.contains("date field").click().focused().as("datefield");
        cy.get("@datefield").type("12/5/20").blur();
      });
      it("should reject nonsensical date", () => {
        cy.contains("date field").click().focused().as("datefield");
        cy.get("@datefield").clear().type("nonsensenonsense").blur();
      });
    });
    context("the single dropdown", () => {
      it("should be selectable", () => {
        cy.contains("single dropdown")
          .then((el) => cy.get("#" + el[0].htmlFor))
          .click();
        cy.contains("SD Option 2").click();
      });
    });
    context("the multiple dropdown", () => {
      it("should be selectable", () => {
        cy.contains("multiple dropdown")
          .then((el) => cy.get("#" + el[0].htmlFor))
          .as("multidropdown");
        cy.get("@multidropdown").click();
        cy.contains("MD Option 2").click();
        cy.get("@multidropdown").click();
        cy.contains("MD Option 1").click();
      });
    });
  });
  context("afterwards", () => {
    it("should reset when button pressed", () => {
      cy.contains("Reset").click();
    });
  });
  context("form submission", () => {
    it("should submit valid data", () => {
      const formData = {
        singleinput: "hello single input",
        multipleinput: "hello multiple input",
        datefield: "12/5/20",
        checkboxfield: ["opt2"],
        radiofield: "opt1",
        singledropdown: "opt2",
        multidropdown: ["opt2"],
      };
      cy.window().then((window) => {
        window.formcontroller.reset(formData);
      });
      cy.contains("Submit").click();
      cy.window().its("formvalues").should("deep.equal", formData);
    });
    it("should reject invalid data", () => {
      const formData = {
        singleinput: "hello single input",
        multipleinput: "hel",
        checkboxfield: ["opt1"],
        radiofield: "opt2",
        datefield: "12/5/20",
        singledropdown: "opt2",
        multidropdown: ["opt2"],
      };
      cy.window().then((window) => {
        window.formcontroller.reset(formData);
      });
      cy.contains("Submit").click();
      cy.window().its("formvalues").should("not.deep.equal", formData);
    });
  });
});
