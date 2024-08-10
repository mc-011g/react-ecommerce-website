import { createContext, useState } from "react";
import { App, Credentials } from "realm-web";
import { APP_ID } from "../../realm/constants.js";

// Creating a Realm App Instance
const app = new App(APP_ID);

// Creating a user context to manage and access all the user related functions
// across different components and pages.
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Function to log in user using their email & password
    const emailPasswordLogin = async (email, password) => {
        const credentials = Credentials.emailPassword(email, password);
        const authenticatedUser = await app.logIn(credentials);
        setUser(authenticatedUser);
        return authenticatedUser;
    };

    const updateUserCustomData = async (firstName, lastName, phoneNumber) => {
        const mongo = app.currentUser.mongoClient(process.env.REACT_APP_CLUSTER_NAME);
        const collection = mongo.db(process.env.REACT_APP_DB_NAME).collection(process.env.REACT_APP_COLLECTION_NAME);

        await collection.updateOne(
            { _id: app.currentUser.id },
            {
                $set: {
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber
                }
            }
        );
        await app.currentUser.refreshCustomData();
    }

    // Function to sign up user using their email & password
    const emailPasswordSignup = async (email, password) => {
        try {
            await app.emailPasswordAuth.registerUser({ email, password });
            // User is logged in after they sign up
            return emailPasswordLogin(email, password);
        } catch (error) {
            throw error;
        }
    };

    // Function to fetch the user from local storage if they are already logged in
    const fetchUser = async () => {
        if (!app.currentUser) return false;
        try {
            await app.currentUser.refreshCustomData();
            setUser(app.currentUser);
            return app.currentUser;
        } catch (error) {
            throw error;
        }
    }

    const logOutUser = async () => {
        if (!app.currentUser) return false;
        try {
            await app.currentUser.logOut();
            setUser(null);
            return true;
        } catch (error) {
            throw error
        }
    }

    const sendResetPasswordLink = async () => {
        let email = app.currentUser?.profile.email;
        try {
            await app.emailPasswordAuth.sendResetPasswordEmail({ email });
            alert("Password reset email sent.");
        } catch (error) {
            alert(error);
        }
    }

    const resetPassword = async (newPassword, resetPasswordUrlInfo) => {
        let params = new URLSearchParams(resetPasswordUrlInfo.search);
        let token = params.get("token");
        let tokenId = params.get("tokenId");
        let resetPasswordDetails = { password: newPassword, token: token, tokenId: tokenId };

        try {
            await app.emailPasswordAuth.resetPassword(resetPasswordDetails);
            alert("Password reset.");
        } catch (error) {
            alert(error)
        }
    }

    return <UserContext.Provider value={{ user, setUser, fetchUser, emailPasswordLogin, emailPasswordSignup, logOutUser, updateUserCustomData, sendResetPasswordLink, resetPassword }}>
        {children}
    </UserContext.Provider>;
}