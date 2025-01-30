import { createSlice } from "@reduxjs/toolkit";
import { fetch } from "../../thunk/cart/Cart";

const initialState = {
    cartFetch: [],
    status: "idle",
    message: "",
    // success: null,
    error: null
}

const cartFetchSlice = createSlice({
    name: "cartFetch",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = "idle";
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetch.pending, (state) => {
                state.status = "loading";
                // state.cartFetch = [];
            })
            .addCase(fetch.fulfilled, (state, action) => {
                state.cartFetch = action.payload?.data;                
                state.message = action.payload?.message
                state.status = "succeeded";
                // state.success = action.payload.success
                state.error = null;
            })
            .addCase(fetch.rejected, (state, action) => {
                state.status = "failed";                
                state.message = action.payload?.message
                state.error = action.payload;
            })
    }
})

export const { resetStatus } = cartFetchSlice.actions

export default cartFetchSlice