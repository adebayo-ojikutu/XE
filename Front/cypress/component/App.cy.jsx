import App from "../../src/App";
import { MemoryRouter } from "react-router-dom";

describe("App", () => {
  it("loads and renders property rows", () => {
    cy.intercept("GET", "**/properties/page-all", {
      statusCode: 200,
      body: {
        body: [
          {
            _id: "prop-1",
            title: "Modern 2-bedroom apartment",
            adsType: "rent",
            price: 1200,
            bedrooms: 2,
            bathrooms: 1,
            area: "Ikeja",
          },
        ],
      },
    }).as("getProperties");

    cy.mount(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );
    cy.wait("@getProperties");
    cy.contains("Modern 2-bedroom apartment").should("be.visible");
    cy.contains("EUR 1,200").should("be.visible");
  });

  it("opens edit modal from table action", () => {
    cy.intercept("GET", "**/properties/page-all", {
      statusCode: 200,
      body: {
        body: [
          {
            _id: "prop-2",
            title: "Family home close to school",
            adsType: "buy",
            price: 2500,
            bedrooms: 4,
            bathrooms: 3,
            area: "Yaba",
          },
        ],
      },
    }).as("getProperties");

    cy.mount(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );
    cy.wait("@getProperties");

    cy.contains("button", "Edit").click();
    cy.contains("Edit property ad").should("be.visible");
    cy.get("#title").should("have.value", "Family home close to school");
  });
});
