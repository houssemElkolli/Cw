import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    model: false,
    user: null,
    accessToken: null,
    change: false,
    showCode: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        toggleModel: (state, action) => {
            state.model = action.payload.model;
        },
        setChange: (state, action) => {
            state.change = action.payload.change;
        },
        setLogin: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;

        },
        setLogout: (state) => {
            state.user = null;
            state.accessToken = null;
        },
    },
});

export const { toggleModel, setLogin, setLogout, setChange, setShowCode } =
    authSlice.actions;
export default authSlice.reducer;
