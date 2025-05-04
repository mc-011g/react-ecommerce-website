import { AppDispatch } from "@/components/ReduxProvider";
import { updateUserProfile } from "../slices/userSlice";

export const verifyEmailThunk = (verificationString: string) => async (dispatch: AppDispatch): Promise<void> => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/auth/verifyEmail/${verificationString}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const { data, message } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }

    localStorage.setItem("token", data.token);

    dispatch(updateUserProfile(data.user));
}

