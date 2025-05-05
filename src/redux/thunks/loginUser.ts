import jwt from 'jsonwebtoken';
import { initializeUser } from "../slices/userSlice";
import { AppDispatch, RootState } from "@/components/ReduxProvider";
import { User } from '@/types/types';

export const loginUser = (email: string, password: string) => async (dispatch: AppDispatch, getState: () => RootState): Promise<User | void> => {

    // Check if user is already logged in
    const state = getState();
    const currentUser = state.user.value;
    if (currentUser) {
        return;
    }

    const response: Response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
    });

    const { data, message } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }

    //Not verified users
    if (data.user.isVerified === false) {
        const user: User = {
            _id: data.user._id,
            isVerified: data.user.isVerified,
        };

        localStorage.setItem("userId", data.user._id);

        dispatch(initializeUser(user));

        return user;
    }

    //Verified users
    if (data.token && data.user.isVerified === true) {
        localStorage.setItem("token", data.token);

        const decodedToken = jwt.decode(data.token);

        if (decodedToken
            && typeof decodedToken !== 'string'
            && 'email' in decodedToken
            && 'isVerified' in decodedToken
            && '_id' in decodedToken) {

            const { _id: tokenId, email: tokenEmail, isVerified: tokenIsVerified } = decodedToken;

            const user: User = {
                _id: tokenId,
                email: tokenEmail,
                isVerified: tokenIsVerified,
            };

            dispatch(initializeUser(user));

            return user;
        } else {
            throw new Error("Login failed.");
        }
    } else {
        throw new Error("Error registering user.");
    }
}