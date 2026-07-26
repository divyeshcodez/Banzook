import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCh50lChAC-KqWrWwTKcAQDvtlBXtOWI6s",
  authDomain: "banzookky.firebaseapp.com",
  projectId: "banzookky",
  storageBucket: "banzookky.firebasestorage.app",
  messagingSenderId: "267074199036",
  appId: "1:267074199036:web:216b413a7bf65fabce2679"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
