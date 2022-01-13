// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlR-0mhuR-8xb8J3foy7SZcBZZBTzdrp0",
  authDomain: "house-marketplace-app-d6bb0.firebaseapp.com",
  projectId: "house-marketplace-app-d6bb0",
  storageBucket: "house-marketplace-app-d6bb0.appspot.com",
  messagingSenderId: "419315367047",
  appId: "1:419315367047:web:a629738d06c75cbb034c22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();