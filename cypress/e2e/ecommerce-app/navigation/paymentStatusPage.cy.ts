describe("Payment status ", () => {
    it("should display the payment succeeded page and can navigate back to the home page", () => {
        cy.visit("/paymentSucceeded");
        cy.get('[data-cy="paymentStatusTitle"]').invoke('text').should('equal', 'Payment Succeeded');
        cy.get('[data-cy="homePageButton"]').click();
        cy.location("pathname").should('equal', '/');
    })

    it("should display the payment cancelled page and can navigate back to the home page", () => {
        cy.visit("/paymentCancelled");
        cy.get('[data-cy="paymentStatusTitle"]').invoke('text').should('equal', 'Payment Cancelled');
        cy.get('[data-cy="homePageButton"]').click();
        cy.location("pathname").should('equal', '/');
    })
});