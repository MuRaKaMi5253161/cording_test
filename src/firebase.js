import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRJ9oaOcu-T8W6EFBf1qn5P1ymjMEVICw",
  authDomain: "cording-test-b708a.firebaseapp.com",
  projectId: "cording-test-b708a",
  storageBucket: "cording-test-b708a.appspot.com",
  messagingSenderId: "603881219652",
  appId: "1:603881219652:web:1185d3a3430331b96dbe11"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, db, storage };
export default app;