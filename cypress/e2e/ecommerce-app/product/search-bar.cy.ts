import { Product } from "@/types/types";

describe("Search bar functionality", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get("[data-cy='searchBarIcon']").as('searchBarIcon').click();
        cy.get("[data-cy='searchResultsContainer']").as('searchResultsContainer');
        cy.get("[data-cy='searchBarInput']").as('searchBarInput');
    });

    it("should display the search bar when the search icon is clicked", () => {
        cy.get("@searchResultsContainer").should('be.visible');
    });

    it("should display the expected products when typing 3 into the search bar and navigate to the Product 3 page", () => {
        cy.get("[data-cy='searchBarInput']").type('3');

        cy.get("[data-cy='searchResultsProduct']").should("have.length", 4);

        cy.get("[data-cy='searchResultsProduct']").eq(0)
            .invoke('text').should('include', 'Product 3');
        cy.get("[data-cy='searchResultsProduct']").eq(1)
            .invoke('text').should('include', 'Product 13');
        cy.get("[data-cy='searchResultsProduct']").eq(2)
            .invoke('text').should('include', 'Product 23');
        cy.get("[data-cy='searchResultsProduct']").eq(3)
            .invoke('text').should('include', 'Product 30');

        cy.get("[data-cy='searchResultsProduct']").eq(0).click();

        cy.url().should('include', '/products/667197f9bdb811be15f18a9f');

        cy.get("[data-cy='productName']").invoke('text').should('equal', 'Product 3');
    });


    it("navigate to a product page after typing a search query and clicking the product", () => {
        const mockSearchResultsProducts: Product[] = [
            {
                _id: "667197f9bdb811be15f18a9f",
                name: "Product 3",
                price: 100,
                category: "shoes",
                quantity: 1,
                sizes: [{ size: "", priceId: "" }],
                colors: [],
                images: [""],
                imageURL: ""
            },
            {
                _id: "667197f9bdb811be15f18a9b",
                name: "Product 13",
                price: 100,
                category: "shoes",
                quantity: 1,
                sizes: [{ size: "", priceId: "" }],
                colors: [],
                images: [""],
                imageURL: ""
            },
        ]

        cy.get("@searchBarInput").type('3');

        cy.get("[data-cy='searchResultsProduct']").as('searchResultsProduct');

        cy.get("@searchResultsProduct").eq(0).as("product").click();

        cy.url().should("include", `/products/${mockSearchResultsProducts[0]._id}`);
    });


    it("navigate to the search results page after typing a search query and pressing enter, showing the expected results", () => {
        cy.get("@searchBarInput").type('3{enter}');

        cy.get("[data-cy='searchResultsPageProduct']").should("have.length", 4);

        cy.get("[data-cy='searchResultsPageProduct']").eq(0)
            .invoke('text').should('include', 'Product 3');
        cy.get("[data-cy='searchResultsPageProduct']").eq(1)
            .invoke('text').should('include', 'Product 13');
        cy.get("[data-cy='searchResultsPageProduct']").eq(2)
            .invoke('text').should('include', 'Product 23');
        cy.get("[data-cy='searchResultsPageProduct']").eq(3)
            .invoke('text').should('include', 'Product 30');

        cy.url().should("include", "/searchResults");
    });

    it("should close the search results container after pressing the X button", () => {
        cy.get("[data-cy='searchResultsCloseButton']").click();
        cy.get("@searchResultsContainer").should('not.exist');
    });


});
