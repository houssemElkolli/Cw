import axios from "axios";


export const BASE_URL = "https://cwv1-api2.onrender.com";





export default axios.create({
    baseURL: BASE_URL,
});


export const axiosPrivate = axios.create({ 
    baseURL: BASE_URL,
    // headers : {
    //     'Content-Type' : 'application/json'
    // },
    withCredentials : true

})