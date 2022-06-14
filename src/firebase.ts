// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrXUQZTxJvroCMm6rpOns5zmXWR_MCcv0",
  authDomain: "issue-tracker-58663.firebaseapp.com",
  databaseURL:
    "https://issue-tracker-58663-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "issue-tracker-58663",
  storageBucket: "issue-tracker-58663.appspot.com",
  messagingSenderId: "928467012172",
  appId: "1:928467012172:web:8a31d9ad85e2d2cd78c2e9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const database = getDatabase(app);

export default app;
