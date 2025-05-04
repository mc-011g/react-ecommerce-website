import { mockTokenVerified } from "cypress/support/constants";
import { mockUser } from "cypress/support/constants";

describe("Login functionality", () => {

    it("should log in succesfully using valid credentials", () => {
        cy.intercept("POST", "/api/users/auth/login", {
            statusCode: 200,
            body: {
                message: "User logged in succesfully",
                data: {
                    user: {
                        _id: "680a198933eb81eef9aac66e",
                        isVerified: true
                    },
                    token: mockTokenVerified,
                }
            },
        }).as("loginRequest");   

        cy.visit("/login");
        cy.get("[data-cy='emailInput']").type(mockUser.email);
        cy.get("[data-cy='passwordInput']").type(mockUser.password);
        cy.get("[data-cy='loginButton']").click();

        cy.wait("@loginRequest");

        cy.location("pathname").should("equal", "/");
    });

    it("should show an error if using invalid credentials", () => {
        cy.intercept("POST", "/api/users/auth/login", {
            statusCode: 401,
            body: {
                success: false,
                message: "User failed to log in",
            },
        }).as("loginRequest");

        cy.visit("/login");
        cy.get("[data-cy='emailInput']").type(mockUser.email);
        cy.get("[data-cy='passwordInput']").type("pass");
        cy.get("[data-cy='loginButton']").click();

        cy.wait("@loginRequest").its("request.body").should("deep.equal", {
            email: mockUser.email,
            password: "pass"
        });

        cy.get("[data-cy='errorMessage']").should("be.visible");
    });

    it("should redirect an unverified user to the resendVerifyEmail page", () => {
        cy.intercept("POST", "/api/users/auth/login", {
            statusCode: 201,
            body: {
                message: "User logged in but is not verified",
                data: {
                    user: {
                        id: "680a198933eb81eef9aac66e",
                        isVerified: false
                    }
                }
            },
        }).as("loginRequest");

        cy.visit("/login");
        cy.get("[data-cy='emailInput']").type(mockUser.email);
        cy.get("[data-cy='passwordInput']").type(mockUser.password);
        cy.get("[data-cy='loginButton']").click();

        cy.wait("@loginRequest").its("request.body").should("deep.equal", {
            email: mockUser.email,
            password: mockUser.password
        });

        cy.url().should("include", "/resendVerifyEmail");
    });
});