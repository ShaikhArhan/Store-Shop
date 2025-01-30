import { createSlice } from "@reduxjs/toolkit";
import { fetch, fetchById } from "../../thunk/product/Product";
const initialState = {
    productFetchById: [],
    status: "idle",
    message: "",
    error: null
}
const productFetchByIdSlice = createSlice({
    name: "productFetchById",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = "idle";
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchById.pending, (state) => {
                state.status = "loading";
                state.productFetchById = [];
            })
            .addCase(fetchById.fulfilled, (state, action) => {
                state.productFetchById = action.payload?.data;
                state.message = action.payload?.message
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(fetchById.rejected, (state, action) => {
                state.status = "failed";                
                state.message = action.payload?.message
                state.error = action.payload;
            })
    }
})

export const {resetStatus}= productFetchByIdSlice.actions

export default productFetchByIdSlice