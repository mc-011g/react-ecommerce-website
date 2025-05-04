import { resendVerifyEmail } from "./resendVerifyEmail";
import { ObjectId } from "mongodb";

describe("resendVerifyEmail", () => {

    it("should successfully send a new verification email to a user", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ success: true }),
            })
        ) as jest.Mock;

        const mockUserId: string = new ObjectId().toHexString();

        await resendVerifyEmail(mockUserId);

        expect(fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/auth/resendVerifyEmail/${mockUserId}`,
            expect.objectContaining({
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            })
        );
    });

});