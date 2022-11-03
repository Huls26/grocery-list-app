import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCdnA1rKVbGZUYNSNiAKUVXRP4VTRPqubo",
    authDomain: "grocery-list-app-83bfd.firebaseapp.com",
    projectId: "grocery-list-app-83bfd",
    storageBucket: "grocery-list-app-83bfd.appspot.com",
    messagingSenderId: "69875309379",
    appId: "1:69875309379:web:d2d2f6849117bd659c6df6",
    measurementId: "G-9G1K0NNLRR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth }
