import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const RequireAuth = ({ allowedRoles }) => {
    const user = useSelector((state) => state.auth.user);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const location = useLocation();
    useEffect(()=> console.log(allowedRoles , accessToken))

    return (
        // user?.role?.find(role => allowedRoles?.includes(role))
        (user?.role === 'superAdmin')
            ? <Outlet />
            : typeof accessToken === String 
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/l" state={{ from: location }} replace />
    );
}

export default RequireAuth;