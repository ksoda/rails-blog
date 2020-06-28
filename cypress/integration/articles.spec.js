describe("トップページは", () => {
  it("記事を一覧する", () => {
    cy.visit("/");
    cy.title().should("include", "Conduit");
    cy.document().should("have.property", "charset").and("eq", "UTF-8");
  });
});
