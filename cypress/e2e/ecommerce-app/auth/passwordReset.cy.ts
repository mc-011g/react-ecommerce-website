import { mockResetPasswordCode, mockUser } from "cypress/support/constants";

describe("Password reset functionality", () => {

    it("should send a password reset link and show a sent message", () => {
        cy.intercept("POST", "/api/users/auth/forgotPassword", {
            statusCode: 200,
            body: {
                data: true,
                message: "Forgot password email sent successfully",
            },
        }).as("sendPasswordResetLinkRequest");

        cy.visit('/login');
        cy.get('[data-cy="forgotPasswordLink"]').click();

        cy.url().should('include', '/forgotPassword');
        cy.get('[data-cy="emailInput"]').type(mockUser.email);
        cy.get('[data-cy="sendResetLink"]').click();

        cy.wait('@sendPasswordResetLinkRequest').its('request.body').should('include', { email: mockUser.email });

        cy.get('[data-cy="linkSentTitle"]').invoke('text').should('equal', 'Password Reset Link Sent');
    });

    it('should navigate to the password reset page, successfully reset a password for a user, then navigate back to the login', () => {

        cy.visit(`/resetPassword/${mockResetPasswordCode}`);

        cy.get('[data-cy="newPasswordInput"]').type('password222222');
        cy.get('[data-cy="newConfirmPasswordInput"]').type('password222222');

        cy.intercept("PUT", `/api/users/auth/resetPassword/${mockResetPasswordCode}`, {
            statusCode: 201,
            body: {
                success: true,
                message: "Password reset successfully",
            },
        }).as("resetPasswordRequest");

        cy.get('[data-cy="passwordResetButton"]').click();
        cy.wait('@resetPasswordRequest').its('request.body').should('include', { newPassword: 'password222222' });

        cy.get('[data-cy="passwordResetSuccessMessage"]').invoke('text').should('equal', 'Password Reset Success');

        cy.get('[data-cy="passwordResetLoginButton"]').click();

        cy.url().should('include', '/login');
    });


});