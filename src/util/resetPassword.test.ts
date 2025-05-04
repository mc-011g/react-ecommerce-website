import { v4 as uuid } from "uuid";
import { resetPassword } from "./resetPassword";

describe("resetPassword", () => {

    it("should successfully update a user's password", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ success: true }),
            })
        ) as jest.Mock;

        const mockPasswordResetCode: string = uuid();
        const mockPassword: string = "Password123123123";

        await resetPassword(mockPasswordResetCode, mockPassword);

        expect(fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/auth/resetPassword/${mockPasswordResetCode}`,
            expect.objectContaining({
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newPassword: mockPassword }),
            })
        );
    });

});