import { sendForgotPasswordEmail } from "./sendForgotPasswordEmail";

describe("sendForgotPasswordEmail", () => {

    it("should successfully send a password reset email to a user", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ data: true }),
            })
        ) as jest.Mock;

        const mockEmail: string = "test@email.com";

        const result = await sendForgotPasswordEmail(mockEmail);

        expect(result).toBe(true);

        expect(fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/auth/forgotPassword`,
            expect.objectContaining({
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: mockEmail }),
            })
        );
    });
});