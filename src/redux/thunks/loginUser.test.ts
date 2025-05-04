import { loginUser } from "./loginUser";
import { initializeUser } from "../slices/userSlice";
import jwt from 'jsonwebtoken';
import { User } from "../../types/types";

jest.mock('jsonwebtoken', () => ({
    decode: jest.fn(),
}));

describe("loginUserThunk", () => {
    const mockDispatch = jest.fn();
    const mockGetState = jest.fn();

    beforeEach(() => {
        Object.defineProperty(global, "localStorage", {
            value: {
                getItem: jest.fn((key) => {
                    if (key === "token") {
                        return "mockToken";
                    }
                    if (key === "userId") {
                        return "680a198933eb81eef9aac66e"; // Return a mock userId
                    }
                    return null;
                }),
                setItem: jest.fn(),
                removeItem: jest.fn(),
                clear: jest.fn(),
            },
            writable: true,
        });

        //Mock implementation for jwt.decode
        (jwt.decode as jest.Mock).mockImplementation(() => ({
            _id: "680a198933eb81eef9aac66e",
            email: "test@email.com",
            isVerified: true,
        }));

        jest.clearAllMocks();
    });

    it("dispatches inititalizeUser with a sucessful API call for a verified user", async () => {
        const mockUser: User = {
            _id: "680a198933eb81eef9aac66e",
            email: "test@email.com",
            isVerified: true,
        };

        const mockPassword = "password123123123";

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    message: "User logged in succesfully",
                    data: {
                        user: {
                            _id: "680a198933eb81eef9aac66e",
                            isVerified: true,
                        },
                        token: "mockToken",
                    }
                }),
            })
        ) as jest.Mock;

        mockGetState.mockReturnValue({ user: { value: null } });

        await loginUser(mockUser.email as string, mockPassword)(mockDispatch, mockGetState);

        expect(fetch).toHaveBeenCalledWith(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/auth/login`,
            expect.objectContaining({
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: mockUser.email, password: mockPassword }),
            })
        );

        expect(mockDispatch).toHaveBeenCalledWith(
            initializeUser(mockUser)
        );
    });

    it("dispatches inititalizeUser with a successful API call for an unverified user", async () => {
        const mockUser: User = {
            _id: "680a198933eb81eef9aac66e",
            isVerified: false,
        };

        const mockPassword = "password123123123";

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    message: "User logged in but is not verified",
                    data: {
                        user: {
                            _id: "680a198933eb81eef9aac66e",
                            isVerified: false,
                        }
                    },
                }),
            })
        ) as jest.Mock;

        mockGetState.mockReturnValue({ user: { value: null } });

        await loginUser(mockUser.email as string, mockPassword)(mockDispatch, mockGetState);

        expect(fetch).toHaveBeenCalledWith(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/auth/login`,
            expect.objectContaining({
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: mockUser.email, password: mockPassword }),
            })
        );

        expect(mockDispatch).toHaveBeenCalledWith(
            initializeUser(mockUser)
        );
    });
});