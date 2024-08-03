import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "inter-link-58156.firebaseapp.com",
  projectId: "inter-link-58156",
  storageBucket: "inter-link-58156.appspot.com",
  messagingSenderId: "1002201423",
  appId: "1:1002201423:web:d2ce2d0b620478d1e0253a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();