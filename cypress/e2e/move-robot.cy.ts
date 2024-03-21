describe("robot commands", () => {
  const reportGeneralText = "Report: ";
  it("results in 0,-1 Ö", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("reset").click();
    cy.get(".Input").type("N");
    cy.get(".Input").type("N");
    cy.get(".Input").type("N");
    cy.get(".Input").type("N");
    cy.get(".Input").type("N");
    cy.get(".Input").type("S");
    cy.get(".Input").type("V");
    cy.get(".Input").type("V");
    cy.get(".Input").type("N");
    cy.get(".Input").type("Ö");
    cy.get(".ReportText").should("have.text", reportGeneralText + "0,-1 Ö");
  });
});
