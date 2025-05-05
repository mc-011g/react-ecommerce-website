export const sendForgotPasswordEmail = async (email: string): Promise<boolean> => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/auth/forgotPassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });

    const { data, message } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }

    return data;
}