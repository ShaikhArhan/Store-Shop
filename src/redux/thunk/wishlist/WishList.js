// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetch = createAsyncThunk(
//     "wishlist/fetch", async (id, { getState }) => {
//         try {
//             console.log("wishlist/fetch -coming ....");
//             const host = getState().host.host
//             console.log("wishlist/fetch -host:", host);
//             const request = await axios.get(host + `/wishlist/fetch/${id}`)
//             console.log('wishlist/fetch -request:', request.data.data);
//             if (request.data) {
//                 return request.data
//             } else {
//                 throw new Error()
//             }
//         } catch (error) {
//             console.log('wishlist/post -error: ', error);

//         }
//     }
// )

// export const post = createAsyncThunk(
//     "wishlist/post", async (data, { getState }) => {
//         try {
//             console.log("wishlist/post -coming ....");
//             console.log("wishlist/post -data", data);
//             const host = getState().host.host
//             console.log("wishlist/post -host:", host);
//             const request = await axios.post(host + `/wishlist/post`, data)
//             console.log('wishlist/post -request:', request.data.data);
//             if (request.data.data) {
//                 return request.data
//             }
//             else {
//                 throw new Error()
//             }
//         } catch (error) {
//             console.log('wishlist/post -error: ', error);

//         }
//     }
// )

// export const deleted = createAsyncThunk(
//     "wishlist/deleted", async (data, { getState }) => {
//         try {
//             console.log("wishlist/deleted -coming ....");
//             console.log("wishlist/deleted -data", data);
//             const host = getState().host.host
//             console.log("wishlist/deleted -host:", host);
//             const request = await axios.delete(host + "/wishlist/delete", { data })
//             console.log('wishlist/deleted -request:', request.data.data);
//             if (request.data) {
//                 return request.data
//             }
//             else {
//                 throw new Error()
//             }
//         }
//         catch (error) {
//             console.log('wishlist/deleted -error: ', error);
//         }
//     }
// )





import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch wishlist
export const fetch = createAsyncThunk(
    "wishlist/fetch",
    async (id, { getState, rejectWithValue }) => {
        try {
            console.log("wishlist/fetch -coming ....");
            const state = getState();
            const host = state.host.host;
            const token = JSON.parse(localStorage.getItem("loginAuth")); // Access token from login state

            const request = await axios.get(`${host}/wishlist/fetch/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Pass token directly without "Bearer"
                },
            });
            // console.log('wishlist/fetch -request:', request.data.data);
            // if (request.data) {
            if (request.data.success === false) {
                return rejectWithValue(request.data);
            }
            return request.data;
            // } else {
            //     throw new Error();
            // }
        } catch (error) {
            console.log('wishlist/fetch -error: ', error);
            // throw error; // Optional: Throw the error to be handled in extraReducers
        }
    }
);

// Post to wishlist
export const post = createAsyncThunk(
    "wishlist/post",
    async (data, { getState, rejectWithValue }) => {
        try {
            console.log("wishlist/post -coming ....");
            console.log("wishlist/post -data", data);
            const state = getState();
            const host = state.host.host;
            const token = JSON.parse(localStorage.getItem("loginAuth")); // Access token from login state

            const request = await axios.post(`${host}/wishlist/post`, data, {
                headers: {
                    Authorization: `Bearer ${token}`, // Pass token directly without "Bearer"
                },
            });

            // console.log('wishlist/post -request:', request.data.data);
            // if (request.data.data) {
            if (request.data.success === false) {
                return rejectWithValue(request.data);
            }
            return request.data;
            // } else {
            //     throw new Error();
            // }
        } catch (error) {
            console.log('wishlist/post -error: ', error);
            // throw error;
        }
    }
);

// Delete from wishlist
export const deleted = createAsyncThunk(
    "wishlist/deleted",
    async (data, { getState, rejectWithValue }) => {
        try {
            console.log("wishlist/deleted -coming ....");
            console.log("wishlist/deleted -data", data);
            const state = getState();
            const host = state.host.host;
            const token = JSON.parse(localStorage.getItem("loginAuth")); // Access token from login state

            const request = await axios.delete(`${host}/wishlist/delete`, {
                data,
                headers: {
                    Authorization: `Bearer ${token}`, // Pass token directly without "Bearer"
                },
            });

            // console.log('wishlist/deleted -request:', request.data.data);
            // if (request.data) {
            if (request.data.success === false) {
                return rejectWithValue(request.data);
            }
            return request.data;
            // } else {
            //     throw new Error();
            // }
        } catch (error) {
            console.log('wishlist/deleted -error: ', error);
            // throw error;
        }
    }
);
