export const mockTokenVerified = Cypress.env("MOCK_TOKEN_VERIFIED") || "";
export const mockTokenUnverified = Cypress.env("MOCK_TOKEN_UNVERIFIED") || "";

export const mockVerificationString = "verificationString";
export const mockResetPasswordCode = "testPasswordResetCode";

export const mockUser = {
    _id: "680a198933eb81eef9aac66e",
    email: "email@test.com",
    password: "password123123123",
    firstName: "FirstName",
    lastName: "LastName",
    isVerified: true,
    phoneNumber: "1231231231"
}

export const mockCart = [
    {
        _id: "667197f9bdb811be15f18a9f",
        name: "Product 3",
        price: 100,
        category: "athletic",
        quantity: 1,
        imageURL: "https://reactecommerceapp.blob.core.windows.net/images/domino-studio-164_6wVEHfI-unsplash(1).jpg", selectedColor: "Red",
        selectedSize: "8"
    },
    {
        _id: "667197d6bdb811be15f18a9e",
        name: "Product 2",
        price: 30,
        category: "athletic",
        quantity: 1,
        imageURL:"https://reactecommerceapp.blob.core.windows.net/images/luis-felipe-lins-J2-wAQDckus-unsplash(1).jpg",
        selectedColor: "White",
        selectedSize: "8"
    },
    {
        _id: "667197d6bdb811be15f18a9e",
        name: "Product 2",
        price: 30,
        category: "athletic",
        quantity: 2,
        imageURL:"https://reactecommerceapp.blob.core.windows.net/images/luis-felipe-lins-J2-wAQDckus-unsplash(1).jpg",
        selectedColor: "White",
        selectedSize: "11"
    },
]