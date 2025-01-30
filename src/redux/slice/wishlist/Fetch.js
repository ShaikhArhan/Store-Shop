import { createSlice } from "@reduxjs/toolkit";
import { fetch } from "../../thunk/wishlist/WishList";
const initialState = {
    wishListFetch: [],
    status: "idle",
    message: "",
    // success: null,
    error: null
}
const wishListFetchSlice = createSlice({
    name: "wishListFetch",
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
                state.wishListFetch = [];
            })
            .addCase(fetch.fulfilled, (state, action) => {
                state.wishListFetch = action.payload?.data;                
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

export const { resetStatus } = wishListFetchSlice.actions

export default wishListFetchSlice