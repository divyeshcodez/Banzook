import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCh50lChAC-KqWrWwTKcAQDvtlBXtOWI6s",
  authDomain: "banzookky.firebaseapp.com",
  projectId: "banzookky",
  storageBucket: "banzookky.firebasestorage.app",
  messagingSenderId: "267074199036",
  appId: "1:267074199036:web:216b413a7bf65fabce2679"
};

// Initialize Firebase safely
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
