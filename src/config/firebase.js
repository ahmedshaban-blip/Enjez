// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



export const firebaseConfig = {
    apiKey: "AIzaSyAiQG-lwcnMlicN1ZQBoL3a5yMCTqXGL8U",
    authDomain: "enjez-b141a.firebaseapp.com",
    projectId: "enjez-b141a",
    storageBucket: "enjez-b141a.firebasestorage.app",
    messagingSenderId: "656722814077",
    appId: "1:656722814077:web:0b4f7d2afa13638dd2fd14"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
