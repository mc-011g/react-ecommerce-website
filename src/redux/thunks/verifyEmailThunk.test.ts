import { updateUserProfile } from "../slices/userSlice";
import { v4 as uuid } from "uuid";
import { verifyEmailThunk } from "./verifyEmailThunk";
import { User } from "../../types/types";

describe("verifyEmailThunk", () => {
    const mockDispatch = jest.fn();
    const mockGetState = jest.fn();

    beforeEach(() => {
        Object.defineProperty(global, "localStorage", {
            value: {
                getItem: jest.fn((key) => {
                    if (key === "token") {
                        return "mockToken";
                    }
                    return null;
                }),
                setItem: jest.fn(),
                removeItem: jest.fn(),
                clear: jest.fn(),
            },
            writable: true,
        });

        jest.clearAllMocks();
    });

    it("dispatches updateUserProfile with a successfull API call", async () => {
        const mockVerificationString = uuid();

        const mockUser: User = {
            _id: "680a198933eb81eef9aac66e",
            email: "test@email.com",
            isVerified: false,
        };

        const mockUserUpdated: User = {
            _id: mockUser._id,
            email: mockUser.email,
            isVerified: true,
        }

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    message: "Email verified successfully",
                    data: {
                        user: {
                            _id: mockUser._id,
                            email: mockUser.email,
                            isVerified: true,
                        },
                        token: "mockToken",
                    }
                }),
            })
        ) as jest.Mock;

        mockGetState.mockReturnValue({ user: { value: mockUser } });

        await verifyEmailThunk(mockVerificationString)(mockDispatch);

        expect(fetch).toHaveBeenCalledWith(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/auth/verifyEmail/${mockVerificationString}`,
            expect.objectContaining({
                method: "PUT",
                headers: { 'Content-Type': 'application/json', },
            })
        );

        expect(localStorage.setItem).toHaveBeenCalledWith("token", "mockToken");

        expect(mockDispatch).toHaveBeenCalledWith(updateUserProfile(mockUserUpdated));
    });
});