describe("Filtering products", () => {
    beforeEach(() => {
        // cy.intercept('GET', '/api/products').as('getProducts');
        cy.visit('/products');
        // cy.wait('@getProducts');
    });

    it("should filter products using multiple filters correctly to get Product 15 and 25", () => {
        //Product 1, 1 item
        cy.visit("/products");

        cy.get('[data-cy="largeProductCard"]').as('product');
        cy.get('[data-cy="categoryFilters"] input[type=checkbox]').eq(1).check();

        //filter by size     
        cy.get('[data-cy="sizeFilters"] button[data-cy="sizeDiv"]').eq(0).click();
        cy.get('[data-cy="sizeFilters"] button[data-cy="sizeDiv"]').eq(7).click();

        //filter by color     
        cy.get('[data-cy="colorFilters"] input[type=checkbox]').eq(0).check();
        cy.get('[data-cy="colorFilters"] input[type=checkbox]').eq(1).check();

        //filter by price      
        cy.get('[data-cy="priceFilters"] input[type=checkbox]').eq(1).check();
        cy.get('[data-cy="priceFilters"] input[type=checkbox]').eq(2).check();

        //Product 14, 15, and 30
        cy.get('@product').should('have.length', 3);
        cy.get('@product').eq(0).invoke('text').should('include', 'Product 14');
        cy.get('@product').eq(1).invoke('text').should('include', 'Product 15');
        cy.get('@product').eq(2).invoke('text').should('include', 'Product 30');
    });
});
