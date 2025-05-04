import { mockTokenVerified } from "cypress/support/constants";

describe("Navbar functionality", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should navigate to the shoes page when clicking the Shoes link", () => {
        cy.get("[data-cy='shoesNavLink']").click();
        cy.url().should("include", "/products/category/shoes");
    });

    it("should navigate to the shoes page when clicking the collapsed Shoes link", () => {
        cy.viewport(400, 600);
        cy.get("[data-cy='collapsedMenuToggle']").click();
        cy.get("[data-cy='shoesNavLinkCollapsed']").click();
        cy.url().should("include", "/products/category/shoes");
    });

    it("should close the collpased navigation menu after opening it", () => {
        cy.viewport(400, 600);
        cy.get("[data-cy='collapsedMenuToggle']").as('collapsedMenuToggle').click();
        cy.get("[data-cy='collapsedNavLinkMenu']").as('collapsedNavLinkMenu').should('be.visible');
        cy.get("@collapsedMenuToggle").click();
        cy.get("@collapsedNavLinkMenu").should('not.exist');
    });

    it("should navigate to the cart page after clicking the cart icon", () => {
        cy.get("[data-cy='cartNavLink']").click();
        cy.url().should("include", "/cart");
    });

    it("should navigate to the boots page when clicking the Boots link", () => {
        cy.get("[data-cy='bootsNavLink']").click();
        cy.url().should("include", "/products/category/boots");
    });

    it("should navigate to the boots page when clicking the collapsed Boots link", () => {
        cy.viewport(400, 600);
        cy.get("[data-cy='collapsedMenuToggle']").click();
        cy.get("[data-cy='bootsNavLinkCollapsed']").click();
        cy.url().should("include", "/products/category/boots");
    });

    it("should navigate to the athletic shoes page when clicking Athletic Shoes link", () => {
        cy.get("[data-cy='athleticShoesNavLink']").click();
        cy.url().should("include", "/products/category/athletic");
    });

    it("should navigate to the athletic shoes page when clicking collapsed Athletic Shoes link", () => {
        cy.viewport(400, 600);
        cy.get("[data-cy='collapsedMenuToggle']").click();
        cy.get("[data-cy='athleticShoesNavLinkCollapsed']").click();
        cy.url().should("include", "/products/category/athletic");
    });

    it("should navigate to the home page when clicking the website title from the cart page", () => {
        cy.get("[data-cy='cartNavLink']").click();
        cy.url().should("include", "/cart");
        cy.get("[data-cy='websiteTitleNavLink']").click();
        cy.location("pathname").should("equal", "/");
    });

    it("should navigate to the login page when clicking the profile icon when a user isn't logged in", () => {
        cy.get("[data-cy='profileNavLink']").click();
        cy.url().should("include", "/login");
    });

    it("should navigate to the profile page when clicking the profile icon when a user is logged in", () => {
        cy.window().then((win) => {
            win.localStorage.setItem("token", mockTokenVerified);
        });

        cy.get("[data-cy='profileNavLink']").click();
        cy.url().should("include", "/profile");
    });
});