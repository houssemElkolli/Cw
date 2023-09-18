import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import { useSelector } from "react-redux";
const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const accessToekn = useSelector((state) => state.auth.accessToekn);

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        (typeof accessToekn !== String) ? verifyRefreshToken() : setIsLoading(false);
    });

    useEffect(() => {
        console.log(isLoading);
        console.log(accessToekn);
    }, [isLoading]);

    return <>{isLoading ? <p>is Loading</p> : <Outlet />}</>;
};

export default PersistLogin;
