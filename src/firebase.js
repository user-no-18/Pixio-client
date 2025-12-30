import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config (client-safe)
const firebaseConfig = {
  apiKey: "AIzaSyAqKqx2jUIN05zmAGwanAOcAFdtziWBpyQ",
  authDomain: "pixio-76704.firebaseapp.com",
  projectId: "pixio-76704",
  storageBucket: "pixio-76704.appspot.com",
  messagingSenderId: "267948723056",
  appId: "1:267948723056:web:ba3c2eb95d797862899db5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth instance
export const auth = getAuth(app);

export default app;
