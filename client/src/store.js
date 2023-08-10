import { configureStore } from "@reduxjs/toolkit";
import  authReducer  from "./state/authSlice"





export const store = configureStore({
    reducer: authReducer,
})