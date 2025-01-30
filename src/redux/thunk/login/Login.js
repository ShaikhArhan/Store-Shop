import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../../../firebase/firebase";

export const login = createAsyncThunk(
    "auth/login",
    async (data, { getState, rejectWithValue }) => {
        try {
            console.log("auth/login -coming ....");
            const host = getState().host.host;
            console.log('auth/login -data:', data);
            const response = await axios.post(`${host}/auth/login`, data);
            console.log('auth/login -request:', response.data?.token);


            // const document = await getDoc(
            //     doc(db, `${data.role}s`, response.data.data.user_id)
            // );


            // const result = {
            //     data: {
            //         user_id: response.data.data.user_id,
            //         document: document.data()
            //     },
            //     message: response.data.message
            // };
            // console.log('auth/login -document.data(): ', document.data());

            if (response.data?.success === false) {
                if (response.data?.message == "Firebase: Error (auth/invalid-credential).") {
                    return rejectWithValue({ message: "invalid-credential" });
                }
                return rejectWithValue(response.data);
            }
            return response.data;
        } catch (error) {
            console.error('auth/login -error:', error);
        }
    }
);
