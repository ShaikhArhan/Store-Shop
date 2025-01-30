// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetch = createAsyncThunk(
//     "product/fetch", async (_, { getState }) => {
//         try {
//             console.log("product/fetch -coming ....");
//             const host = getState().host.host
//             console.log("product/fetch -host:", host);
//             const request = await axios.get(host + "/product/fetch")
//             console.log('product/fetch -request:', request.data.data);

//             if (request.data.data) {
//                 return request.data;
//             } else {
//                 throw new Error()
//             }
//         } catch (error) {
//             console.log('product/fetch -error: ', error);
//         }
//     }
// )

// export const post = createAsyncThunk(
//     "product/post", async (product, { getState }) => {
//         try {

//             console.log("product/post -coming ....");
//             const host = getState().host.host
//             console.log("product/post -host:", host);
//             const request = await axios.post(host + "/product/post", product)
//             console.log('product/post -request:', request.data.data);

//             if (request.data.data) {
//                 return request.data;
//             } else {
//                 throw new Error()
//             }
//         } catch (error) {
//             console.log("product/post -error:", error);
//         }
//     }
// )







import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { data } from "react-router-dom";

export const fetch = createAsyncThunk(
    "product/fetch",
    async (_, { getState, rejectWithValue }) => {
        try {
            // console.log("product/fetch -coming ....");
            const host = getState().host.host;
            // console.log("product/fetch -host:", host);
            const token = JSON.parse(localStorage.getItem("loginAuth"));
            const request = await axios.get(host + "/product/fetch", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },});
            // console.log('product/fetch -request:', request.data.data);
            if (request.data.success === false) {
                return rejectWithValue(request.data);
            }
            return request.data;
        } catch (error) {
            console.log('product/fetch -error: ', error);
        }
    }
);

export const fetchById = createAsyncThunk(
    "product/fetchById", async (id, { getState, rejectWithValue }) => {
        try {
            console.log("product/fetchById -coming ....");
            const host = getState().host.host;
            const token = JSON.parse(localStorage.getItem("loginAuth"));
            const request = await axios.get(host + `/product/fetch/${id}`, {                
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log('request: ', request.data.data);
            if (request.data.success === false) {
                return rejectWithValue(request.data);
            }
            return request.data;
        } catch (error) {
            console.log("product/fetchById -error:", error);
        }
    }
)

export const post = createAsyncThunk(
    "product/post",
    async (product, { getState, rejectWithValue }) => {
        try {
            // console.log("product/post -coming ....");
            const host = getState().host.host;
            const token = JSON.parse(localStorage.getItem("loginAuth"));
            const request = await axios.post(host + "/product/post", product, {                
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            console.log('request: ', request);
            if (request.data.success === false) {
                return rejectWithValue(request.data);
            }
            return request.data;            
        } catch (error) {
            console.log("product/post -error:", error);
        }
    }
);


export const update = createAsyncThunk(
    "product/update", async ( {id, data}, { getState, rejectWithValue }) => {
        console.log('id, data: ', id, data);        
        try {
            console.log("product/update -coming ....");
            const host = getState().host.host;
            const token = JSON.parse(localStorage.getItem("loginAuth"));
            const request = await axios.put(host + `/product/update/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('request: ', request);
            if (request.data.success === false) {
                return rejectWithValue(request.data);
            }
            return request.data;
        } catch (error) {
            console.log("product/post -error:", error);
        }
    }
)

export const deleted = createAsyncThunk(
    "product/delete", async (id, { getState, rejectWithValue }) => {
        console.log('product/delete -id: ', id);
        try {
            console.log("product/delete -coming ....");
            const host = getState().host.host;
            const token = JSON.parse(localStorage.getItem("loginAuth"));
            const request = await axios.delete(host + `/product/delete`, {
                
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data:{id}
            });
            console.log('request: ', request);
            if (request.data.success === false) {
                return rejectWithValue(request.data);
            }
            return request.data;
        } catch (error) {
            console.log("product/post -error:", error);
        }
    }
)
