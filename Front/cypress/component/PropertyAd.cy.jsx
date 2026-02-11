import PropertyFormModal from "../../src/Components/Modal/PropertyAd";

const baseDialog = {
  open: true,
  type: "create",
  data: null,
};

const fillRequiredFields = () => {
  cy.get("#title").type("Bright apartment in central district");
  cy.get("#price").type("1500");
  cy.get("#bedrooms").type("2");
  cy.get("#bathrooms").type("1");
  cy.get("#sizeSqm").type("75");
  cy.get("#description").type(
    "Spacious and bright apartment with easy access to transport and shops.",
  );
};

describe("PropertyFormModal", () => {
  it("shows loading state for area autocomplete and submits selected placeId", () => {
    const onSubmit = cy.stub().as("onSubmit");

    cy.intercept("GET", "**/area/list?input=lag*", {
      statusCode: 200,
      delay: 500,
      body: {
        body: [{ mainText: "Lagos Island", placeId: "place-123" }],
      },
    }).as("fetchArea");

    cy.mount(
      <PropertyFormModal
        dialog={baseDialog}
        onClose={() => {}}
        onSubmit={onSubmit}
        isSaving={false}
      />,
    );

    cy.get("#area").type("lag");
    cy.contains("Loading areas...").should("be.visible");
    cy.wait("@fetchArea");
    cy.contains("li", "Lagos Island").click();

    fillRequiredFields();
    cy.contains("button", "Publish Ad").click();

    cy.get("@onSubmit").should("have.been.calledOnce");
    cy.get("@onSubmit")
      .its("firstCall.args.0")
      .should("deep.include", { area: "Lagos Island", placeId: "place-123" });
  });
});
