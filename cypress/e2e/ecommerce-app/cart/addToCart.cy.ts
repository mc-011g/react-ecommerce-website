import { CartProduct } from "@/types/types";

describe("Adding an item to the cart", () => {
    beforeEach(() => {
        cy.window().then((win) => {
            win.localStorage.setItem(
                "cart",
                JSON.stringify([])
            );
        });
    });

    it("should navigate to two product pages and add multiple items of the same and different sizes to the cart", () => {
        //Product 1, 1 item
        cy.visit("/products/667197f9bdb811be15f18a9f");
        cy.get('[data-cy="productSize"]').eq(2).click();
        cy.get('[data-cy="addToCartButton"]').click();
        cy.get('[data-cy="addedProductCloseButton"]').as('addedProductCloseButton').click();
        cy.get('[data-cy="shoppingBagIcon"').as('shoppingBagIcon').invoke('text').should('equal', '1');

        //Product 2, 3 items, 2 sizes
        cy.visit("/products/667197d6bdb811be15f18a9e");

        cy.get('@shoppingBagIcon').invoke('text').should('equal', '1');
        cy.get('[data-cy="productSize"]').eq(0).click();
        cy.get('[data-cy="addToCartButton"]', { timeout: 10000 }).should('be.enabled').click();
        cy.get('@addedProductCloseButton').click();

        cy.get('[data-cy="productSize"]').eq(3).should('be.visible').click();
        cy.get('[data-cy="addToCartButton"]', { timeout: 10000 }).should('be.enabled').click();
        cy.get('@addedProductCloseButton').click();
        cy.get('[data-cy="addToCartButton"]', { timeout: 10000 }).should('be.enabled').click();

        cy.get('@shoppingBagIcon').invoke('text').should('equal', '4');
    });
});

it("should not add an item to the cart without selecting a size first", () => {
    cy.visit("/products/667197f9bdb811be15f18a9f");
    cy.get('[data-cy="addToCartButton"]').as('addToCartButton').should('not.be.enabled');
    cy.get('[data-cy="productSize"]').eq(0).click();
    cy.get('@addToCartButton').should('be.enabled').click();
    cy.get('[data-cy="shoppingBagIcon"').invoke('text').should('equal', '1');
});