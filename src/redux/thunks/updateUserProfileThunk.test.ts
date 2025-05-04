import { User } from "../../types/types";
import { updateUserProfile } from "../slices/userSlice";
import { updateUserProfileThunk } from "./updateUserProfileThunk";

describe("updateUserProfileThunk", () => {
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
        const mockUser: User = {
            _id: "680a198933eb81eef9aac66e",
            email: "test@email.com",
            firstName: "FirstName",
            lastName: "LastName",
            phoneNumber: "1231231231",
            isVerified: true,
        };

        const mockUserUpdated: User = {
            _id: mockUser._id,
            email: "test2@email.com",
            firstName: "FirstName2",
            lastName: "LastName2",
            phoneNumber: "1112223331",
            isVerified: true,
        }

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    message: "User profile updated",
                    data: {
                        user: {
                            _id: mockUser._id,
                            email: mockUserUpdated.email,
                            isVerified: true,
                            firstName: mockUserUpdated.firstName,
                            lastName: mockUserUpdated.lastName,
                            phoneNumber: mockUserUpdated.phoneNumber,
                        },
                        token: "mockToken"
                    }
                }),
            })
        ) as jest.Mock;

        mockGetState.mockReturnValue({ user: { value: mockUser } });

        await updateUserProfileThunk(mockUserUpdated)(mockDispatch);

        expect(fetch).toHaveBeenCalledWith(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${mockUser._id}`,
            expect.objectContaining({
                method: "PUT",
                headers: { Authorization: "Bearer mockToken" },
                body: JSON.stringify(mockUserUpdated),
            })
        );

        expect(localStorage.setItem).toHaveBeenCalledWith("token", "mockToken");

        expect(mockDispatch).toHaveBeenCalledWith(updateUserProfile(mockUserUpdated));
    });
});