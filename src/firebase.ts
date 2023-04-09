import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1EQfnVhkPa1F3BVBCePpvBFtatdhxvC4",
  authDomain: "test-crm-project-55e05.firebaseapp.com",
  projectId: "test-crm-project-55e05",
  storageBucket: "test-crm-project-55e05.appspot.com",
  messagingSenderId: "418669313559",
  appId: "1:418669313559:web:26441f8f6e0987c2926652",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// apiKey: import.meta.env.REACT_APP_FIREBASE_API_KEY,
// authDomain: import.meta.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
// projectId: import.meta.env.REACT_APP_FIREBASE_PROJECT_ID,
// storageBucket: import.meta.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
// messagingSenderId: import.meta.env.REACT_APP_FIREBASE_MESSAGING_SENDER,
// appId: import.meta.env.REACT_APP_FIREBASE_APP_ID,
