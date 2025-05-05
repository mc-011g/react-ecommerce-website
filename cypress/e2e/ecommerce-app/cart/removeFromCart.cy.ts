import { mockCart } from "cypress/support/constants";


describe("Removing an item from the cart", () => {  
    it("should remove the specified multiple items from the cart", () => {

        //Mock the cart from the local storage
        cy.window().then((win) => {
            win.localStorage.setItem(
                "cart",
                JSON.stringify(mockCart)
            );
        });

        cy.visit("/cart");

        cy.get('[data-cy="shoppingBagIcon"').invoke('text').should('equal', '4');

        cy.get('[data-cy="cartProduct"]').as('cartProduct').should('have.length', 3);

        cy.get('[data-cy="cartProductRemoveIcon"]').eq(1).click();

        cy.get('@cartProduct').should('have.length', 2);

        cy.get('[data-cy="cartProductRemoveIcon"]').eq(0).click();

        cy.get('@cartProduct').should('have.length', 1);
    });

});