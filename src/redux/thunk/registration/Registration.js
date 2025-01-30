import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
// import { auth } from "../../../firebase/firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";

export const registration = createAsyncThunk(
    "auth/registration", async (data, { getState, rejectWithValue }) => {
        console.log("registration -coming ....");
        // const fireStore = getFirestore()
        try {
            const host = getState().host.host
            // console.log("registration -host:", host);
            console.log('registration -data:', data);
            const response = await axios.post(host + "/auth/registration", data)
            console.log('response.data.data: ', response.data);

            // const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            // console.log('userCredential: ', userCredential);
            // const user_id = userCredential.user.user_id
            // console.log('user_id: ', user_id);
            // await setDoc(doc(fireStore, "users", user_id), {
            //     userName: data.userName,
            //     email: data.email,
            //     password: data.password
            // })
            // const usersCollectionRef = collection(fireStore, "users");
            // const querySnapshot = await getDocs(usersCollectionRef);
            // const userList = querySnapshot.docs.map((doc) => ({
            //     id: doc.id,
            //     ...doc.data(),
            // }));
            // console.log('userList: ', userList);

            // if (request.data.data && request.data.success == true) {
            //     return request.data;
            // } else {
            //     return rejectWithValue({ message: "Account already exist" })                
            // }
            if (response.data?.success === false) {
                if (response.data?.message == "Firebase: Error (auth/email-already-in-use).") {
                    return rejectWithValue({ message: "Account already exist" });
                }
                return rejectWithValue(response.data);
            }
        } catch (error) {
            return rejectWithValue(request.data)
        }
        
    }
)