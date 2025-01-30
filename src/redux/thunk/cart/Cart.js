// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetch = createAsyncThunk(
//     "cart/fetch", async (id, { getState }) => {
//         try {
//             console.log("cart/fetch -coming ....");
//             const host = getState().host.host
//             // console.log("cart/fetch -host:", host);
//             const request = await axios.get(host + `/cart/fetch/${id}`)
//             // console.log("cart/fetch -request:", request.data.data);

//             // if (request.data.data) {
//                 return request.data
//             // } else {
//             //     throw new Error()
//             // }
//         } catch (error) {
//             console.log("wishlist/fetch -error:", error);
//         }
//     }
// )

// export const post = createAsyncThunk(
//     "cart/post", async (data, { getState }) => {
//         try {
//             // console.log("cart/post -coming ....");
//             // console.log("cart/post -data ....",data);
//             const host = getState().host.host
//             // console.log("cart/post -host:", host);
//             const request = await axios.post(host + `/cart/post`, data)
//             // console.log("cart/post -request:", request.data.data);
//             // if (request.data.data) {
//                 return request.data.data
//             // } else {
//                 // throw new Error();
//             // }
//         } catch (error) {
//             console.log("wishlist/fetch -error:", error);
//         }
//     }
// )

// export const update = createAsyncThunk(
//     "cart/update", async (data, { getState }) => {
//         try {
//             console.log("cart/update -coming ....");
//             // console.log("cart/update -data ....", data);

//             const host = getState().host.host
//             // console.log("cart/update -host:", host);
//             const request = await axios.put(host + `/cart/update`, data)
//             console.log("cart/update -request:", request.data.data);            

//             // if (request.data.data) {
//                 return request.data
//             // } else {
//             //     throw new Error();
//             // }
//         } catch (error) {
//             console.log("wishlist/fetch -error:", error);
//         }
//     }
// )

// export const deleted = createAsyncThunk(
//     "cart/delete", async (data, { getState }) => {
//         try {
//             // console.log("cart/delete -coming ....");
//             // console.log("cart/delete -data", data);
//             const host = getState().host.host
//             // console.log("cart/delete -host:", host);
//             const request = await axios.delete(host + `/cart/delete/`, { data: data })
//             // console.log("cart/delete -request:", request.data.data);
//             // if (request.data.data) {
//                 return request.data
//             // } else {
//             //     throw new Error();
//             // }
//         } catch (error) {
//             console.log("wishlist/fetch -error:", error);
//         }
//     }
// )




import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch cart
export const fetch = createAsyncThunk(
    "cart/fetch",
    async (id, { getState,rejectWithValue }) => {
        try {
            // console.log("cart/fetch -coming ....");
            const state = getState();
            const host = state.host.host;
            const token = JSON.parse(localStorage.getItem("loginAuth")); // Access token from login state

            const request = await axios.get(`${host}/cart/fetch/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Pass token directly without "Bearer"
                },
            });
            console.log("request.data",request.data.data);
            if (request.data.success === false) {
                return rejectWithValue(request.data);
            }
            return request.data;
        } catch (error) {
            console.error("cart/fetch -error:", error);            
        }
    }
);

// Post to cart
export const post = createAsyncThunk(
    "cart/post",
    async (data, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const host = state.host.host;
            const token = JSON.parse(localStorage.getItem("loginAuth")); // Access token from login state

            const request = await axios.post(`${host}/cart/post`, data, {
                headers: {
                    Authorization: `Bearer ${token}`, // Pass token directly without "Bearer"
                },
            });

            if (request.data.success === false) {
                return rejectWithValue(request.data);
            }
            // console.log('request.data: ', request.data);
            return request.data;
        } catch (error) {
            console.error("cart/post -error:", error);
            // throw error;
        }
    }
);

// Update cart
export const update = createAsyncThunk(
    "cart/update",
    async (data, { getState, rejectWithValue }) => {
        console.log('data: ', data);
        try {
            console.log("cart/update -coming ....");
            const state = getState();
            const host = state.host.host;
            const token = JSON.parse(localStorage.getItem("loginAuth")); // Access token from login state

            const request = await axios.put(`${host}/cart/update`, data, {
                headers: {
                    Authorization: `Bearer ${token}`, // Pass token directly without "Bearer"
                },
            });
            // console.log("cart/update -request:", request.data.data);
            if (request.data.success === false) {
                return rejectWithValue(request.data);
            }
            return request.data;
        } catch (error) {
            console.error("cart/update -error:", error);
            // throw error;
        }
    }
);

// Delete from cart
export const deleted = createAsyncThunk(
    "cart/delete",
    async (data, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const host = state.host.host;
            const token = JSON.parse(localStorage.getItem("loginAuth")); 
            // console.log('token: ', token);

            const request = await axios.delete(`${host}/cart/delete/`, {
                data: data,
                headers: {
                    Authorization: `Bearer ${token}`, // Pass token directly without "Bearer"
                },
            });

            if (request.data.success === false) {
                return rejectWithValue(request.data);
            }
            return request.data;
        } catch (error) {
            console.error("cart/delete -error:", error);
            // throw error;
        }
    }
);
