import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDinfKglRkPIQ4lhsxe6gKMcjQ69QoekHw",
  authDomain: "tfg-type-space.firebaseapp.com",
  projectId: "tfg-type-space",
  storageBucket: "tfg-type-space.appspot.com",
  messagingSenderId: "812395040880",
  appId: "1:812395040880:web:b4742cc1e7af073197a4b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };