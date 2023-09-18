import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const RequireAuth = ({ allowedRoles }) => {
    const user = useSelector((state) => state.auth.user);
    const location = useLocation();
    useEffect(() => {
        console.log(user);
    });

    return user?.email ? (
        <Navigate to="/" state={{ from: location , }} replace={true} />
    ) : (
        <Outlet />
    );
};

export default RequireAuth;
