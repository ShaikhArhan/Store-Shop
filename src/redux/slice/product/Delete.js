import { createSlice } from "@reduxjs/toolkit";
import { deleted } from "../../thunk/product/Product";
const initialState = {
    productDelete: [],
    status: "idle",
    error: null
}
const productDeleteSlice = createSlice({
    name: "productDelete",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = "idle";
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleted.pending, (state) => {
                state.status = "loading";
                state.product = [];
            })
            .addCase(deleted.fulfilled, (state, action) => {
                state.productDelete = action.payload?.data;
                state.message = action.payload?.message
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(deleted.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.payload?.message
                state.error = action.payload;
            })
    }
})

export const { resetStatus } = productDeleteSlice.actions

export default productDeleteSlice