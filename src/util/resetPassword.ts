export const resetPassword = async (passwordResetCode: string, newPassword: string): Promise<void> => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/auth/resetPassword/${passwordResetCode}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ newPassword: newPassword })
        });

    const { message } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }
}

