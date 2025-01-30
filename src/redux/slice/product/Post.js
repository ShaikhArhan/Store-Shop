import { createSlice } from "@reduxjs/toolkit";
import { post } from "../../thunk/product/Product";
const initialState = {
    productPost: [],
    status: "idle",
    error: null
}
const productPostSlice = createSlice({
    name: "productPost",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = "idle";
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(post.pending, (state) => {
                state.status = "loading";
                state.product = [];
            })
            .addCase(post.fulfilled, (state, action) => {
                state.product = action.payload?.data;
                state.message = action.payload?.message
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(post.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.payload?.message
                state.error = action.payload;
            })
    }
})

export const { resetStatus } = productPostSlice.actions

export default productPostSlice