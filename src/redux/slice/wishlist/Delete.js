import { createSlice } from "@reduxjs/toolkit";
import { deleted, fetch, post } from "../../thunk/wishlist/WishList";
const initialState = {
    wishListDelete: [],
    status: "idle",
    message: "",
    // success: null,
    error: null
}
const wishListDeleteSlice = createSlice({
    name: "wishListDelete",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.wishListDelete=[]
            state.status = "idle";
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleted.pending, (state) => {
                state.status = "loading";
                state.wishListDelete = [];
            })
            .addCase(deleted.fulfilled, (state, action) => {
                state.wishListDelete = action.payload?.data;
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

export const { resetStatus } = wishListDeleteSlice.actions

export default wishListDeleteSlice