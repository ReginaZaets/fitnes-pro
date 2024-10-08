import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD61-W8Yj1oKf-eSU_INnxsjL9t48gD0Ko",
  authDomain: "fitness-pro-72544.firebaseapp.com",
  databaseURL:
    "https://fitness-pro-72544-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fitness-pro-72544",
  storageBucket: "fitness-pro-72544.appspot.com",
  messagingSenderId: "986474731937",
  appId: "1:986474731937:web:4eb60d301c9d1b175153e0",
  measurementId: "G-LG7C5E2Q15",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const auth = getAuth(app);

export { app, analytics, db, auth };
