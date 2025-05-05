import { AppDispatch } from "@/components/ReduxProvider";
import { updateUserProfile } from "../slices/userSlice";
import { User } from "@/types/types";

export const updateUserProfileThunk = (userProfileInfo: User) => async (dispatch: AppDispatch): Promise<void> => {

    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("User is not authenticated");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userProfileInfo._id}`, {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userProfileInfo),
    });

    const { data, message } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }

    localStorage.setItem("token", data.token);

    dispatch(updateUserProfile(data.user));
}