import axios from "../api/axios";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/authSlice";

const useRefreshToken = () => {
    const dispatech = useDispatch();
    const refresh = async () => {
        const response = await axios.get("/auth/refresh", {
            withCredentials: true,
        });
        dispatech(
            setLogin({
                accessToken: response.data.accessToken,
                user : response.data.user,
            })
        );
        return response.data.accessToken;
    };
    return refresh;
};

export default useRefreshToken;
