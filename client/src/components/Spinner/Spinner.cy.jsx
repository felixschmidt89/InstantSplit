import React from "react";
import Spinner from "./Spinner";
import { mount } from "cypress/react18";

describe("<Spinner />", () => {
  it("mounts with specified attributes", () => {
    // Define attributes
    const color = "rgba(85, 156, 173, 0.3)";
    const size = 40;
    const marginTop = "16px";
    const height = "75%";

    // Mount Spinner
    mount(
      <Spinner
        color={color}
        size={size}
        marginTop={marginTop}
        height={height}
      />
    );

    // Assert that Spinner mounts with specified attributes
    // Check margin-top CSS property
    cy.get("[class*='spinnerContainer']").should(
      "have.css",
      "margin-top",
      marginTop
    );

    // Check SVG element attributes
    cy.get("svg")
      .should("have.css", "width", `${size}px`)
      .should("have.css", "height", `${size}px`)
      .should("have.attr", "width", size)
      .should("have.attr", "height", size)
      .should("have.attr", "viewBox", "0 0 24 24")
      .should("have.attr", "xmlns", "http://www.w3.org/2000/svg");

    // Check fill color CSS property
    cy.get(".spinner_DupU").should("have.css", "fill", color);

    // Check animation-delay CSS properties
    cy.get(".spinner_DupU").should("have.css", "animation-delay", "0s");
    cy.get(".spinner_GWtZ").should("have.css", "animation-delay", "0.1s");
    cy.get(".spinner_dwN6").should("have.css", "animation-delay", "0.2s");
    cy.get(".spinner_46QP").should("have.css", "animation-delay", "0.3s");
    cy.get(".spinner_PD82").should("have.css", "animation-delay", "0.4s");
    cy.get(".spinner_eUgh").should("have.css", "animation-delay", "0.5s");
    cy.get(".spinner_eUaP").should("have.css", "animation-delay", "0.6s");
    cy.get(".spinner_j38H").should("have.css", "animation-delay", "0.7s");
    cy.get(".spinner_tVmX").should("have.css", "animation-delay", "0.8s");
    cy.get(".spinner_DQhX").should("have.css", "animation-delay", "0.9s");
    cy.get(".spinner_GIL4").should("have.css", "animation-delay", "1s");
    cy.get(".spinner_n0Yb").should("have.css", "animation-delay", "1.1s");
  });
});
