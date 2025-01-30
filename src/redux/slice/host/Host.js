import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    host: import.meta.env.VITE_HOST
}

const hostSlice = createSlice({
    name: "host",
    initialState,
    reducers: {}
})
export default hostSlice;