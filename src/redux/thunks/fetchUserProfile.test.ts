import { ObjectId } from "mongodb";
import { fetchUserProfile } from "./fetchUserProfile";
import { initializeUser } from "../slices/userSlice";

describe("fetchUserProfileThunk", () => {
    const mockDispatch = jest.fn();
    const mockGetState = jest.fn();

    beforeEach(() => {
        //Mocks the localStorage globally.
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

    it("dispatches inititalizeUser with a sucessful API call", async () => {
        const mockUser = {
            _id: new ObjectId().toHexString(),
            firstName: "",
            lastName: "",
            phoneNumber: "",
            isVerified: false,
        };

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ data: mockUser }),
            })
        ) as jest.Mock;


        mockGetState.mockReturnValue({ user: { value: null } });

        await fetchUserProfile(mockUser._id)(mockDispatch, mockGetState);

        expect(fetch).toHaveBeenCalledWith(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${mockUser._id}`,
            expect.objectContaining({
                method: "GET",
                headers: { Authorization: "Bearer mockToken" },
            })
        );

        expect(mockDispatch).toHaveBeenCalledWith(initializeUser(mockUser));
    });
});