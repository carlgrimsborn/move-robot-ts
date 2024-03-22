describe("robot commands", () => {
  const reportGeneralText = "Report: ";

  const inputCombination1 = "FFFFFBLLFR";
  const result1 = "1,1 Ö";
  it(`${inputCombination1} results in ${result1}`, () => {
    cy.visit("http://localhost:3000/");
    inputCombination1.split("").forEach((command) => {
      cy.get(".Input").type(command);
    });
    cy.get(".ReportText").should("have.text", reportGeneralText + result1);
    cy.get(".Input").should("have.value", inputCombination1);
  });

  const inputCombination2 = "LFFRFRFRFF";
  const result2 = "2,-1 N";
  it(`${inputCombination2} results in ${result2}`, () => {
    cy.visit("http://localhost:3000/");
    inputCombination2.split("").forEach((command) => {
      cy.get(".Input").type(command);
    });
    cy.get(".ReportText").should("have.text", reportGeneralText + result2);
    cy.get(".Input").should("have.value", inputCombination2);
  });

  it("should be able to reset input field", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".Input").type("L");
    cy.get(".Input").type("L");
    cy.get(".Input").type("L");
    cy.get(".Input").type("R");
    cy.get(".Input").type("F");
    cy.get(".ResetButton").click();
    cy.get(".Input").should("have.value", "");
  });

  const inputCombination3 = "RFBLLFFRRB";
  const result3 = "2,-2 S";
  it(`${inputCombination3} using arrow keys should result in ${result3}`, () => {
    cy.visit("http://localhost:3000/");
    cy.get(".App").type("{rightArrow}");
    cy.get(".App").type("{upArrow}");
    cy.get(".App").type("{downArrow}");
    cy.get(".App").type("{leftArrow}");
    cy.get(".App").type("{leftArrow}");
    cy.get(".App").type("{upArrow}");
    cy.get(".App").type("{upArrow}");
    cy.get(".App").type("{rightArrow}");
    cy.get(".App").type("{rightArrow}");
    cy.get(".App").type("{downArrow}");
    cy.get(".ReportText").should("have.text", reportGeneralText + result3);
    cy.get(".Input").should("have.value", inputCombination3);
  });

  it("should be unable to delete characters in input field", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".Input").type("R");
    cy.get(".Input").type("F");
    cy.get(".Input").type("R");
    cy.get(".Input").type("{backspace}");
    cy.get(".Input").should("have.value", "RFR");
  });

  it("should be able to finish with mixed text input and arrow key typing", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".App").type("{leftArrow}");
    cy.get(".App").type("{leftArrow}");
    cy.get(".App").type("{upArrow}");
    cy.get(".Input").type("F");
    cy.get(".Input").type("R");
    cy.get(".App").type("{downArrow}");
    cy.get(".Input").type("F");
    cy.get(".Input").type("R");
    cy.get(".Input").type("F");
    cy.get(".Input").type("R");
    cy.get(".ReportText").should("exist");
  });

  const inputCombination4 = "RFFLLFRRFL";
  const result4 = "4,0 V";
  it(`should be able to switch to circle variant and do a report with combination ${inputCombination4} that results in ${result4}`, () => {
    cy.visit("http://localhost:3000/");
    cy.get(".VariantText").click();
    cy.get(".VariantText").should("have.text", "circle");
    inputCombination4.split("").forEach((command) => {
      cy.get(".Input").type(command);
    });
    cy.get(".ReportText").should("have.text", reportGeneralText + result4);
    cy.get(".Input").should("have.value", inputCombination4);
  });

  const inputCombination5 = "LFLFFFFFFL";
  const result5 = "2,-2 V";
  it("should not get outside bounds in circle variant", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".VariantText").click();
    cy.get(".VariantText").should("have.text", "circle");
    inputCombination5.split("").forEach((command) => {
      cy.get(".Input").type(command);
    });
    cy.get(".ReportText").should("have.text", reportGeneralText + result5);
    cy.get(".Input").should("have.value", inputCombination5);
  });

  const inputCombination6SE = "HGGVVGHHGV";
  const inputCombination6EN = "RFFLLFRRFL";
  const result6 = "0,2 V";
  it(`should be able to switch language to swedish and finish combination ${inputCombination6SE} and switch back to english and ${inputCombination6EN} should give the same result`, () => {
    cy.visit("http://localhost:3000/");
    cy.get(".LanguageToggle").click();

    //swedish commands
    inputCombination6SE.split("").forEach((command) => {
      cy.get(".Input").type(command);
    });
    cy.get(".ReportText").should("have.text", reportGeneralText + result6);
    cy.get(".Input").should("have.value", inputCombination6SE);

    // toggling language resets data
    cy.get(".LanguageToggle").click();

    //english commands
    inputCombination6EN.split("").forEach((command) => {
      cy.get(".Input").type(command);
    });
    cy.get(".ReportText").should("have.text", reportGeneralText + result6);
    cy.get(".Input").should("have.value", inputCombination6EN);
  });
});
