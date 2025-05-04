export const resendVerifyEmail = async (_id: string): Promise<void> => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/auth/resendVerifyEmail/${_id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            }
        });

    const { message } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }
}