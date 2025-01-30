import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../thunk/login/Login";
import { jwtDecode } from "jwt-decode";


const decodeUser = () => {
    const token = localStorage.getItem("loginAuth");
    if (token != undefined || null) {
        try {
            if (token != undefined) {
                return jwtDecode(token);
            }
        } catch (e) {
            console.error("Error decoding token");
            return null
        }
    }
    return null;
}


const initialState = {
    loginUser: decodeUser(),
    token: "",
    status: "idle",
    message: "",
    error: null
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = "idle";
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.token = action.payload?.token;
                state.message = action.payload?.message
                state.status = "succeeded";
                state.error = null;
                if (action.payload?.token) {
                    try {
                        state.loginUser = jwtDecode(action.payload?.token);
                    } catch (e) {
                        console.error("Error decoding token");
                    }
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.payload?.message
                state.error = action.payload;
            })
    }
})

export const { resetStatus } = loginSlice.actions;

export default loginSlice
