import { saveUserProfileSchema } from "./saveUserProfileSchema";


describe("saveUserProfileSchema", () => {

    it("should return information from a valid user profile form", async () => {

        const parsedRegistrationData = {
            email: "email@test.com",
            firstName: "firstName",
            lastName: "lastName",
            phoneNumber: "1231231231"
        }

        const validationResult = saveUserProfileSchema.safeParse(parsedRegistrationData);

        expect(validationResult.success).toBe(true);
    });

    it("should return an error for invalid information from a user profile form", async () => {

        const parsedRegistrationData = {
            email: "emailtest",
            firstName: "",
            lastName: "",
            phoneNumber: "123"
        }

        const validationResult = saveUserProfileSchema.safeParse(parsedRegistrationData);

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
        ])
    });
});