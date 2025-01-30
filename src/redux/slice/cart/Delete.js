import { createSlice } from "@reduxjs/toolkit";
import { deleted } from "../../thunk/cart/Cart";

const initialState = {
    cartDelete: [],
    status: "idle",
    message: "",
    // success: null,
    error: null
}

const cartDeleteSlice = createSlice({
    name: "cartDelete",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = "idle";
            state.message = null;
            state.cartDelete = []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleted.pending, (state) => {
                state.status = "loading";
                state.cartDelete = [];
            })
            .addCase(deleted.fulfilled, (state, action) => {
                state.cartDelete = action.payload?.data;
                state.message = action.payload?.message
                state.status = "succeeded";
                // state.success = action.payload.success
                state.error = null;
            })
            .addCase(deleted.rejected, (state, action) => {
                state.status = "failed";                
                state.message = action.payload?.message
                state.error = action.payload;
            })
    }
})

export const { resetStatus } = cartDeleteSlice.actions

export default cartDeleteSlice