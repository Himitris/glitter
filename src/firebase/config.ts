import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCFVDqOTHDXvfo70XFs6HUH02PqK6bKBo",
  authDomain: "glitter-32462.firebaseapp.com",
  projectId: "glitter-32462",
  storageBucket: "glitter-32462.firebasestorage.app",
  messagingSenderId: "185194423113",
  appId: "1:185194423113:web:9a7da0137697ee607b3098",
  measurementId: "G-KH2XD1X4N5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
