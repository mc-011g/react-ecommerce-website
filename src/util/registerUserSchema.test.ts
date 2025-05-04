import { registerUserSchema } from "./registerUserSchema";


describe("registerUserSchema", () => {

    it("should return information from a valid registration form", async () => {
        const parsedRegistrationData = {
            email: "email@test.com",
            password: "password123123",
            firstName: "firstName",
            lastName: "lastName",
            phoneNumber: "1231231231"
        }

        const validationResult = registerUserSchema.safeParse(parsedRegistrationData);
        expect(validationResult.success).toBe(true);
    });

    it("should return an error for invalid information from a registration form", async () => {

        const parsedRegistrationData = {
            email: "emailtest",
            password: "pass3",
            firstName: "",
            lastName: "",
            phoneNumber: "123"
        }

        const validationResult = registerUserSchema.safeParse(parsedRegistrationData);

        expect(validationResult.success).toBe(false);

        expect.arrayContaining([
            expect.objectContaining({
                message: "Invalid email address",
                path: ["email"],
            }),
            expect.objectContaining({
                message: "First name is required",
                path: ["firstName"],
            }),
            expect.objectContaining({
                message: "Last name is required",
                path: ["lastName"],
            }),
            expect.objectContaining({
                message: "Phone number must be at least 10 digits",
                path: ["phoneNumber"],
            }),
            expect.objectContaining({
                message: "Password must be at least 8 characters long",
                path: ["password"],
            }),
        ])
    });
});