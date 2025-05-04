import { NewUser } from "../types/types";
import { registerUser } from "./registerUser";


describe("registerUserUtil", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("registers a new user with a successful API call", async () => {
        const mockUserFormInfo: NewUser = {
            email: "test@email.com",
            password: "password123123123",
            firstName: "FirstName",
            lastName: "LastName",
            phoneNumber: "1231231231"
        };

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    success: true,
                    message: "User created succesfully",
                    user: {
                        _id: expect.any(String),
                        email: mockUserFormInfo.email,
                        isVerified: false,
                    },
                }),
            })
        ) as jest.Mock;

        await registerUser(mockUserFormInfo);

        expect(fetch).toHaveBeenCalledWith(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/auth/register`,
            expect.objectContaining({
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(mockUserFormInfo),
            })
        );
    });
});