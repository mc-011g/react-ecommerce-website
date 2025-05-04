import { mockUser } from "cypress/support/constants";

describe("Register functionality", () => {
    beforeEach(() => {
        cy.visit("/register");
    });

    it("should register a user using valid information", () => {
        cy.intercept("POST", "/api/users/auth/register", {
            statusCode: 201,
            body: {
                data: null,
                message: "User created successfully.",
            },
        }).as("registerRequest");

        cy.get("[data-cy='emailInput']").type(mockUser.email);
        cy.get("[data-cy='lastNameInput']").type(mockUser.lastName);
        cy.get("[data-cy='firstNameInput']").type(mockUser.firstName);
        cy.get("[data-cy='phoneNumberInput']").type(mockUser.phoneNumber);
        cy.get("[data-cy='passwordInput']").type(mockUser.password);
        cy.get("[data-cy='confirmPasswordInput']").type(mockUser.password);
        cy.get("[data-cy='createAccountButton']").click();

        cy.wait("@registerRequest").its("request.body").should("deep.equal", {
            email: mockUser.email,
            password: mockUser.password,
            firstName: mockUser.firstName,
            lastName: mockUser.lastName,
            phoneNumber: mockUser.phoneNumber
        });

        cy.get("[data-cy='registerCompleteMessage']").should('be.visible');
    });

    it("should show a password match error if passwords are not equal", () => {

        cy.get("[data-cy='passwordInput']").type("password");
        cy.get("[data-cy='confirmPasswordInput']").type("pass");
        cy.get("[data-cy='passwordMatchError']").should("be.visible");

    });

    it("should show an error message if a user tries to register with an email already in use", () => {
        cy.intercept("POST", "/api/users/auth/register", {
            statusCode: 409,
            body: {
                success: false,
                error: "User with this email already exists",
            },
        }).as("registerRequest");


        cy.get("[data-cy='emailInput']").type(mockUser.email);
        cy.get("[data-cy='lastNameInput']").type(mockUser.lastName);
        cy.get("[data-cy='firstNameInput']").type(mockUser.firstName);
        cy.get("[data-cy='phoneNumberInput']").type(mockUser.phoneNumber);
        cy.get("[data-cy='passwordInput']").type(mockUser.password);
        cy.get("[data-cy='confirmPasswordInput']").type(mockUser.password);

        cy.get("[data-cy='createAccountButton']").click();

        cy.wait("@registerRequest").its("request.body").should("deep.equal", {
            email: mockUser.email,
            password: mockUser.password,
            firstName: mockUser.firstName,
            lastName: mockUser.lastName,
            phoneNumber: mockUser.phoneNumber
        });

        cy.get("[data-cy='errorMessage']").should("be.visible");
    });
});