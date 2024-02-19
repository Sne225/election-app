// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvC02NWL_LDXUBsXmiBjFmm1_41e-cxdU",
  authDomain: "max-project-e9eab.firebaseapp.com",
  projectId: "max-project-e9eab",
  storageBucket: "max-project-e9eab.appspot.com",
  messagingSenderId: "491755718176",
  appId: "1:491755718176:web:daf16ee49f83814adb1e45",
  measurementId: "G-2RC8K1JPY6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { auth, firestore };