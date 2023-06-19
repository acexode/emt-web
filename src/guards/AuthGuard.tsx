import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import tokenService from "../services/tokenService"
import Login from "../pages/authentication/login";

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
    children: PropTypes.node,
};

// @ts-ignore
export default function AuthGuard({ children }) {
    const [isAuthenticated] = useState(
        tokenService.getToken()
    );
     const { pathname } = useLocation();
    const [requestedLocation, setRequestedLocation] = useState(null);
    if (!isAuthenticated) {
        if (pathname !== requestedLocation) {
            // @ts-ignore
            setRequestedLocation(pathname);
        }
        return <Login />;
    }

    if (requestedLocation && pathname !== requestedLocation) {
        setRequestedLocation(null);
        return <Navigate to={requestedLocation} />;
    }

    return <>{children}</>;
}
