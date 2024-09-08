// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqWBlp25szxPSaW5kqIraGxjiiMAN7jxI",
  authDomain: "ecom-1f0d3.firebaseapp.com",
  projectId: "ecom-1f0d3",
  storageBucket: "ecom-1f0d3.appspot.com",
  messagingSenderId: "347953395090",
  appId: "1:347953395090:web:04d68f1ae6fa2e968afd4b",
  measurementId: "G-8EB7P0T4J6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
