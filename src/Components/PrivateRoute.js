import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "./CartContext/UserContext";

const PrivateRoute = () => {
    const { user } = useContext(UserContext);
    const location = useLocation();
    const redirectLoginUrl = `/login?redirectTo=${encodeURI(location.pathname)}`;

    //Redirect user to login page if they are not logged in. If they are logged in
    // then they are sent to the page using Outlet
    return !user ? <Navigate to={redirectLoginUrl} /> : <Outlet />;
}

export default PrivateRoute;