// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTmX1-C3n2OUCj_KwwX_Y01H7zGxxfu5Y",
  authDomain: "authantication-with-firebase.firebaseapp.com",
  projectId: "authantication-with-firebase",
  storageBucket: "authantication-with-firebase.firebasestorage.app",
  messagingSenderId: "646074406965",
  appId: "1:646074406965:web:43d620d2f40ca2e86f797c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore()
export {app,auth,db}