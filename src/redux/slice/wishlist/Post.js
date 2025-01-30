import { createSlice } from "@reduxjs/toolkit";
import { fetch, post } from "../../thunk/wishlist/WishList";
const initialState = {
    wishListPost: [],
    status: "idle",
    message: "",
    // success: null,
    error: null
}
const wishListPostSlice = createSlice({
    name: "wishListPost",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.wishListPost = []
            state.status = "idle";
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(post.pending, (state) => {
                state.status = "loading";
                state.wishListPost = [];
            })
            .addCase(post.fulfilled, (state, action) => {
                state.wishListPost = action.payload?.data;
                state.message = action.payload?.message
                state.status = "succeeded";
                // state.success = action.payload?.success
                state.error = null;
            })
            .addCase(post.rejected, (state, action) => {
                state.status = "failed";                
                state.message = action.payload?.message
                state.error = action.payload;
            })
    }
})

export const { resetStatus } = wishListPostSlice.actions

export default wishListPostSlice