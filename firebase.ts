import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBS95sNXnKAoqt-4Vt9E8-ZunPp4UNa8FQ",
  authDomain: "test-crm-development.firebaseapp.com",
  projectId: "test-crm-development",
  storageBucket: "test-crm-development.appspot.com",
  messagingSenderId: "114705653468",
  appId: "1:114705653468:web:404a4ad0952d0535cdde19",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);

export default app;
