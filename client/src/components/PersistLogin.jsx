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

        typeof accessToekn !== String
            ? verifyRefreshToken()
            : setIsLoading(false);
    });

    useEffect(() => {
        console.log(isLoading);
        console.log(accessToekn);
    }, [isLoading]);

    return (
        <>
            {isLoading ? (
                <div className="loadingContainer">
                    <div className="loudingSpin">
                        <div class="lds-grid">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            ) : (
                <Outlet />
            )}
        </>
    );
};

export default PersistLogin;
