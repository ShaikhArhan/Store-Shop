import { createSlice } from "@reduxjs/toolkit";
import { update } from "../../thunk/product/Product";
const initialState = {
    productUpdate: [],
    status: "idle",
    error: null
}
const productUpdateSlice = createSlice({
    name: "productUpdate",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = "idle";
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(update.pending, (state) => {
                state.status = "loading";
                state.product = [];
            })
            .addCase(update.fulfilled, (state, action) => {
                state.productUpdate = action.payload?.data;
                state.message = action.payload?.message
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(update.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.payload?.message
                state.error = action.payload;
            })
    }
})

export const { resetStatus } = productUpdateSlice.actions

export default productUpdateSlice