// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc0c77Wauf03FfBLJF-IdXwYuimjMG4Co",
  authDomain: "reels-27971.firebaseapp.com",
  projectId: "reels-27971",
  storageBucket: "reels-27971.appspot.com",
  messagingSenderId: "476584735012",
  appId: "1:476584735012:web:9db8dbd186912db04e43b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
export { auth, storage, db };