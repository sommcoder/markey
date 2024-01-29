import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/firestore";

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

// recaptcha: 6Le7AmApAAAAALFa7DxsFlvP4syuJnGSRPR4Dn33

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // use to read and write
// const analytics = getAnalytics(app);

export { db };
