import { mockTokenVerified, mockUser, mockVerificationString } from "cypress/support/constants";

describe("Email verification functionality", () => {
    it("should show an email sent message after clicking the resend verification email button", () => {
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

        cy.window().then((win) => {
            win.localStorage.setItem("userId", mockUser._id);
            const userId = localStorage.getItem("userId");
            expect(userId).to.equal(mockUser._id);
        });      

        cy.intercept("PUT", `/api/users/auth/resendVerifyEmail/*`, {
            statusCode: 200,
            body: {
                data: null,
                message: "Verification email resent successfully",
            },
        }).as("resendVerifyEmailRequest");

        cy.get("[data-cy='resendVerifyEmailButton']").click();

        cy.wait("@resendVerifyEmailRequest");
        // cy.wait("@resendVerifyEmailRequest").its("request.url").should('include', mockUser._id);

        cy.get("[data-cy='sentVerifyEmailMessage']").should('be.visible');

    });

    it("should show a success message after a user navigates to their email verification link with a valid verification string", () => {

        cy.intercept("PUT", `/api/users/auth/verifyEmail/${mockVerificationString}`, {
            statusCode: 200,
            body: {
                success: true,
                message: "Email verified successfully",
                mockTokenVerified,
                data: {
                    user: {
                        id: mockUser._id,
                        email: mockUser.email,
                        isVerified: true,
                    }
                }
            },
        }).as("verifyEmail");

        cy.visit(`/verifyEmail/${mockVerificationString}`);

        cy.wait("@verifyEmail");

        cy.get("[data-cy='emailVerificationSuccessMessage']").should('be.visible');

    });

    it("should show a error message after a user navigates to their email verification link with an invalid verification string", () => {

        cy.intercept("PUT", `/api/users/auth/verifyEmail/invalidVerificationString`, {
            statusCode: 200,
            body: {
                success: false,
                error: "The email verification code is invalid",
            },
        }).as("verifyEmail");

        cy.visit(`/verifyEmail/invalidVerificationString`);

        cy.wait("@verifyEmail");

        cy.get("[data-cy='emailVerificationFailMessage']").should('be.visible');

    });

    it("it should navigate back to the login after pressing the back button on the invalid email verification component", () => {

        cy.visit(`/verifyEmail/invalidVerificationString`);

        cy.intercept("PUT", `/api/users/auth/verifyEmail/invalidVerificationString`, {
            statusCode: 200,
            body: {
                success: false,
                error: "The email verification code is invalid",
            },
        }).as("verifyEmail");
        cy.wait("@verifyEmail");

        cy.get("[data-cy='backToLoginButton']").click();

        cy.location("pathname").should("equal", "/");
    });
});