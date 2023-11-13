import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    model: false,
    user: null,
    accessToken: null,
    change: false,
    showCode: true,
    sidePagination: false,
    itemNumber: 0,
    isLoading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoading: (state,action) => {
            state.isLoading = action.payload;
        },
        setItemNumber: (state, action) => {
            state.itemNumber = action.payload;
        },
        toggleModel: (state, action) => {
            state.model = action.payload.model;
        },
        setChange: (state, action) => {
            state.change = action.payload.change;
        },
        toggleSidePagination: (state, action) => {
            state.sidePagination = action.payload.sidePagination;
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

export const {
    toggleModel,
    setLogin,
    setLogout,
    setChange,
    setShowCode,
    toggleSidePagination,
    setItemNumber,
    setIsLoading
} = authSlice.actions;
export default authSlice.reducer;
