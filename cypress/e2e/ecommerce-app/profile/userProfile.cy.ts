import { mockTokenVerified, mockUser } from "cypress/support/constants";

describe('User profile page', () => {
    beforeEach(() => {
        cy.window().then((win) => {
            win.localStorage.setItem("token", mockTokenVerified)
        })
     
        cy.intercept("GET", `/api/users/${mockUser._id}`, {
            statusCode: 200,
            body: {
                data: {
                    _id: mockUser._id,
                    isVerified: mockUser.isVerified,
                    email: mockUser.email,
                    firstName: mockUser.firstName,
                    lastName: mockUser.lastName,
                    phoneNumber: mockUser.phoneNumber
                },
                message: "Found user."
            },
        }).as("fetchUserProfile");

        cy.visit("/profile");

        cy.wait("@fetchUserProfile").its("request.headers").should("deep.include", {
            authorization: `Bearer ${mockTokenVerified}`
        });
    });

    it('should be able to edit existing user profile fields', () => {

        //Mock update data
        const mockUpdatedData = {
            _id: mockUser._id,
            isVerified: mockUser.isVerified,
            email: "newemail@email.com",
            firstName: "NewFirstName",
            lastName: "NewLastName",
            phoneNumber: "1112223331"
        }
        cy.get('[data-cy="firstNameInput"]').as('firstNameInput').invoke('val').should('equal', mockUser.firstName);
        cy.get('[data-cy="lastNameInput"]').as('lastNameInput').invoke('val').should('equal', mockUser.lastName);
        cy.get('[data-cy="phoneNumberInput"]').as('phoneNumberInput').invoke('val').should('equal', mockUser.phoneNumber);
        cy.get('[data-cy="emailInput"]').as('emailInput').invoke('val').should('equal', mockUser.email);

        //Change user details
        cy.get('@firstNameInput').clear().type(mockUpdatedData.firstName);
        cy.get('@lastNameInput').clear().type(mockUpdatedData.lastName);
        cy.get('@phoneNumberInput').clear().type(mockUpdatedData.phoneNumber);
        cy.get('@emailInput').clear().type(mockUpdatedData.email);

        cy.intercept("PUT", `/api/users/${mockUser._id}`, {
            statusCode: 201,
            body: {
                data: {
                    user: {
                        _id: mockUser._id,
                        isVerified: mockUser.isVerified,
                        email: mockUpdatedData.email,
                        firstName: mockUpdatedData.firstName,
                        lastName: mockUpdatedData.lastName,
                        phoneNumber: mockUpdatedData.phoneNumber
                    },
                    token: mockTokenVerified,
                },
                message: "User profile updated",
            },
        }).as("updateUserProfile");

        cy.get('[data-cy="saveButton"]').click();

        cy.wait('@updateUserProfile').its('request.body').should('equal', JSON.stringify(mockUpdatedData));

        cy.get('@firstNameInput').invoke('val').should('equal', mockUpdatedData.firstName);
        cy.get('@lastNameInput').invoke('val').should('equal', mockUpdatedData.lastName);
        cy.get('@phoneNumberInput').invoke('val').should('equal', mockUpdatedData.phoneNumber);
        cy.get('@emailInput').invoke('val').should('equal', mockUpdatedData.email);

    });

    it('should reset changes to a user profile', () => {
        //Mock update data
        const mockUpdatedData = {
            _id: mockUser._id,
            isVerified: mockUser.isVerified,
            email: "newemail@email.com",
            firstName: "NewFirstName",
            lastName: "NewLastName",
            phoneNumber: "1112223331"
        }

        //Check original data
        cy.get('[data-cy="firstNameInput"]').as('firstNameInput').invoke('val').should('equal', mockUser.firstName);
        cy.get('[data-cy="lastNameInput"]').as('lastNameInput').invoke('val').should('equal', mockUser.lastName);
        cy.get('[data-cy="phoneNumberInput"]').as('phoneNumberInput').invoke('val').should('equal', mockUser.phoneNumber);
        cy.get('[data-cy="emailInput"]').as('emailInput').invoke('val').should('equal', mockUser.email);

        //Modify the profile fields
        cy.get('@firstNameInput').clear().type(mockUpdatedData.firstName);
        cy.get('@lastNameInput').clear().type(mockUpdatedData.lastName);
        cy.get('@phoneNumberInput').clear().type(mockUpdatedData.phoneNumber);
        cy.get('@emailInput').clear().type(mockUpdatedData.email);

        //Reset profile data
        cy.get('[data-cy="resetButton"]').click();

        //Check that the data is the original data like before
        cy.get('[data-cy="firstNameInput"]').as('firstNameInput').invoke('val').should('equal', mockUser.firstName);
        cy.get('[data-cy="lastNameInput"]').as('lastNameInput').invoke('val').should('equal', mockUser.lastName);
        cy.get('[data-cy="phoneNumberInput"]').as('phoneNumberInput').invoke('val').should('equal', mockUser.phoneNumber);
        cy.get('[data-cy="emailInput"]').as('emailInput').invoke('val').should('equal', mockUser.email);
    });

    it('should logout a user after clicking the logout button', () => {

        cy.window().then((win) => {
            expect(win.localStorage.getItem("token")).to.equal(mockTokenVerified);
        })

        cy.get('[data-cy="logoutButton"]').click();

        cy.window().then((win) => {
            expect(win.localStorage.getItem("token")).to.not.exist;
        })

        cy.location("pathname").should('equal', "/");

        cy.visit("/profile");

        //Redirects back to homepage
        cy.location("pathname").should('equal', '/');
    });

    it('should show a reset password message after clicking the reset password button', () => {
        cy.intercept("POST", `/api/users/auth/forgotPassword`, {
            statusCode: 200,
            body: {
                data: true,
                message: "Forgot password email sent successfully",
            },
        }).as("sendResetPasswordLink");

        cy.get('[data-cy="resetPasswordButton"]').click();

        cy.wait('@sendResetPasswordLink').its('request.body').should('include', { email: mockUser.email });

        cy.get('[data-cy="successMessage"]').invoke('text').should("equal", "A password reset link has been sent to your email.");
    });
});