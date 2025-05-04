import { loginUserSchema } from "./loginUserSchema";


describe("loginUserSchema", () => {

    it("should return information from a valid login form", async () => {

        const parsedLoginData = {
            email: "email@test.com",
            password: "password123123",
        }

        const validationResult = loginUserSchema.safeParse(parsedLoginData);
        expect(validationResult.success).toBe(true);
    });

    it("should return an error for invalid information from a login", async () => {

        const parsedLoginData = {
            email: "testemail",
            password: "pass",
        }

        const validationResult = loginUserSchema.safeParse(parsedLoginData);

        expect(validationResult.success).toBe(false);

        expect.arrayContaining([
            expect.objectContaining({
                message: "Invalid email address",
                path: ["email"],
            }),
            expect.objectContaining({
                message: "Password must be at least 8 characters long",
                path: ["password"],
            }),
        ])
    });
});