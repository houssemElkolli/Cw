import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    model: false,
    user: null,
    token: null,
    role: null,
    change: false,
    showCode : true,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        toggleModel: (state, action) => {
            state.model = action.payload.model
        },
        setChange: (state, action) => {
            state.change = action.payload.change
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },

    }
})

export const { toggleModel, setLogin, setLogout,setChange,setShowCode } = authSlice.actions;
export default authSlice.reducer; 