export const getTokenPayload = () => {

    const token = localStorage.getItem("token");

    if (!token) { return null; }

    const getTokenPayload = (token: string) => {
        if (token) {
            const encodedPayload = token.split(".")[1];
            return JSON.parse(atob(encodedPayload));
        } else {
            return null;
        }
    }

    const checkIfTokenExpired = (token: { exp: number }) => {
        const currentTime = Date.now() / 1000; // Current time in seconds
        return token.exp < currentTime; // Check if the token is expired
    }

    const tokenPayload = getTokenPayload(token);

    if (!tokenPayload || checkIfTokenExpired(tokenPayload)) {
        return null;
    }

    return tokenPayload;
}