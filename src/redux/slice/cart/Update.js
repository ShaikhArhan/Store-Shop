import { createSlice } from "@reduxjs/toolkit";
import { fetch, update } from "../../thunk/cart/Cart";

const initialState = {
    cartUpdate: [],
    status: "idle",
    message: "",
    // success: null,
    error: null
}

const cartUpdateSlice = createSlice({
    name: "cartUpdate",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = "idle";
            state.message = null;
            state.cartUpdate=[]
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(update.pending, (state) => {
                state.status = "loading";
                state.cartUpdate = [];                
            })
            .addCase(update.fulfilled, (state, action) => {
                state.cartUpdate = action.payload?.data;
                // console.log('state.cartUpdate: ', state.cartUpdate);
                state.message = action.payload?.message
                state.status = "succeeded";
                // console.log('state.status: ', state.status);
                // state.success = action.payload.success
                state.error = null;
            })
            .addCase(update.rejected, (state, action) => {
                state.status = "failed";                
                state.message = action.payload?.message
                state.error = action.payload;
            })
    }
})

export const { resetStatus } = cartUpdateSlice.actions

export default cartUpdateSlice