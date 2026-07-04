// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZsGKAlJsbWE1DkbFagG6r2BHU5wyze5o",
  authDomain: "picnic-cosplay.firebaseapp.com",
  projectId: "picnic-cosplay",
  storageBucket: "picnic-cosplay.firebasestorage.app",
  messagingSenderId: "361836569784",
  appId: "1:361836569784:web:61eccb1f6c3fa4e3c0804d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)