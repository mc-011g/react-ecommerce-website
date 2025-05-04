import { mockCart } from "cypress/support/constants";

describe("Updating a cart", () => {
    it("should update the quantity correctly for multiple items", () => {

        cy.window().then((win) => {
            win.localStorage.setItem(
                "cart",
                JSON.stringify(mockCart)
            );
        });

        cy.visit("/cart");

        cy.get('[data-cy="shoppingBagIcon"').invoke('text').as('cartQuantity').should('equal', '4');

        cy.get('[data-cy="cartProduct"]').as('cartProduct').should('have.length', 3);

        cy.get('select[data-cy="cartProductSelectSizeList"]').eq(2).select("5");
        cy.get('select[data-cy="cartProductSelectSizeList"]').eq(1).select("7");
        cy.get('select[data-cy="cartProductSelectSizeList"]').eq(0).select("3");

        cy.get('[data-cy="cartProductPrice"]').eq(0).invoke('text').should('equal', '$300');
        cy.get('[data-cy="cartProductPrice"]').eq(1).invoke('text').should('equal', '$210');
        cy.get('[data-cy="cartProductPrice"]').eq(2).invoke('text').should('equal', '$150');

        cy.get('@cartQuantity').should('equal', '15');

        cy.get('[data-cy="cartTotal"]').invoke('text').should('equal', '$660');
    });

});