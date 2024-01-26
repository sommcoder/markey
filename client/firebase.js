// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5hAef20CWn1hyUDbpj97to9xQYEZUEBs",
  authDomain: "mar-key-26942.firebaseapp.com",
  projectId: "mar-key-26942",
  storageBucket: "mar-key-26942.appspot.com",
  messagingSenderId: "68358579764",
  appId: "1:68358579764:web:693fe73219afc486724c61",
  measurementId: "G-NE3ZSBCMX7",
  databaseURL: "https://mar-key-26942-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
