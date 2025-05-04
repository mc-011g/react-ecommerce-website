import { User } from "@/types/types";
import { initializeUser } from "../slices/userSlice";
import { AppDispatch, RootState } from "@/components/ReduxProvider";

export const fetchUserProfile = (_id: string) => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    const state = getState();
    const currentUser = state.user.value as User | null;

    if (currentUser
        && currentUser.firstName
        && currentUser.lastName
        && currentUser.phoneNumber
    ) {
        return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("User is not authenticated");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${_id}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const { data, message } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }

    dispatch(initializeUser(data));
}