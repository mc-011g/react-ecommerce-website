import { NewUser } from "@/types/types";

export const registerUser = async (registerUserForm: NewUser): Promise<void> => {

    const response: Response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerUserForm),
    });

    const { message } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }
};