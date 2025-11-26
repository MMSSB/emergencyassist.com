// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDC_awyYcSoWofirfmTJuFVMAChfdIPvco",
  authDomain: "emergency-e9cd2.firebaseapp.com",
  projectId: "emergency-e9cd2",
  storageBucket: "emergency-e9cd2.firebasestorage.app",
  messagingSenderId: "690717145656",
  appId: "1:690717145656:web:c971cbf6f91c2367e504cd",
  measurementId: "G-L1KJR2GGTB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, db, analytics };