import { createSlice } from "@reduxjs/toolkit";
import { registration } from "../../thunk/registration/Registration";

const initialState = {
    registrationUser: {},
    status: "idle",
    message: "",
    error: null
}

const registrationSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = "idle";
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registration.fulfilled, (state, action) => {
                state.registrationUser = action.payload?.data;
                state.message = action.payload?.message
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(registration.pending, (state, action) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(registration.rejected, (state, action) => {
                state.status = "failed";                
                state.message = action.payload?.message
                state.error = action.payload;
            })
    }
})

export const { resetStatus } = registrationSlice.actions;

export default registrationSlice