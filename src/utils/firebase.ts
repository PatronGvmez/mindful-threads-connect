
import { initializeApp, getApp, getApps } from "firebase/app";
// analytics is not used in the template, but can be added if needed by user
// import { getAnalytics } from "firebase/analytics"; 
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0gk8D6_Nmi0jC-k-Ne0nZb9kESqvIZZs", // IMPORTANT: This is a public demo key. Replace with your actual key.
  authDomain: "dutsyntax-e73be.firebaseapp.com",
  projectId: "dutsyntax-e73be",
  storageBucket: "dutsyntax-e73be.appspot.com",
  messagingSenderId: "830572755185",
  appId: "1:830572755185:web:7505729263a98cdf7b5150",
  measurementId: "G-3859LP5EX5",
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// const analytics = getAnalytics(app); // Uncomment if you need analytics

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
