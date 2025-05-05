
import { User } from "../../types/types";
import { userSlice, initializeUser, logoutUser, updateUserProfile } from "./userSlice";
import { ObjectId } from "mongodb";


describe("userSlice", () => {

    it("initializes a new user", () => {
        const initialState = { value: null };

        const user: User = {
            _id: new ObjectId().toHexString(),
            email: "test@email.com",
            isVerified: false,
            firstName: "FirstName",
            lastName: "LastName",
            phoneNumber: "123123123"
        };

        const result = userSlice.reducer(initialState, initializeUser(user));

        expect(result.value).toEqual(user);
    });

    it("logs out a user", () => {

        const user: User | null = {
            _id: new ObjectId().toHexString(),
            email: "test@email.com",
            isVerified: false,
            firstName: "FirstName",
            lastName: "LastName",
            phoneNumber: "123123123"
        };

        const initialState = { value: user };

        const result = userSlice.reducer(initialState,
            logoutUser());

        expect(result.value).toEqual(null);
    });

    it("updates a user's profile", () => {

        const user: User | null = {
            _id: new ObjectId().toHexString(),
            email: "test@email.com",
            isVerified: false,
            firstName: "FirstName",
            lastName: "LastName",
            phoneNumber: "123123123"
        };

        const userPayload: User | null = {
            _id: user._id,
            email: "test2@email.com",
            isVerified: false,
            firstName: "FirstName2",
            lastName: "LastName2",
            phoneNumber: "1111111111"
        };

        const initialState = { value: user };

        const result = userSlice.reducer(initialState,
            updateUserProfile(userPayload));

        expect(result.value).toEqual({
            ...user,
            email: "test2@email.com",
            firstName: "FirstName2",
            lastName: "LastName2",
            phoneNumber: "1111111111",
        });
    });
});