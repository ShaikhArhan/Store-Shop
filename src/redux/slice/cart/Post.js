import { createSlice } from "@reduxjs/toolkit";
import { post } from "../../thunk/cart/Cart";

const initialState = {
    cartPost: [],
    status: "idle",
    message: "",
    // success: null,
    error: null
}

const cartPostSlice = createSlice({
    name: "cartPost",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = "idle";
            state.message = null;
            state.cartPost = []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(post.pending, (state) => {
                state.status = "loading";
                state.cartPost = [];
            })
            .addCase(post.fulfilled, (state, action) => {
                state.cartPost = action.payload?.data;
                state.message = action.payload?.message
                state.status = "succeeded";
                // state.success = action.payload.success
                state.error = null;
            })
            .addCase(post.rejected, (state, action) => {
                state.status = "failed";                
                state.message = action.payload?.message
                state.error = action.payload;
            })
    }
})

export const { resetStatus } = cartPostSlice.actions

export default cartPostSlice