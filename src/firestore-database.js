import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js'

    // If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
    import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js'

    // Add Firebase products that you want to use
    import { getAuth } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js'
    import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, updateDoc, onSnapshot, query, orderBy, limit, where, addDoc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'

    const firebaseConfig = {
  apiKey: "AIzaSyDOHAsmbxXHIZpdQPON_CfQwISxSKgqn-8",
  authDomain: "type-space-tfg.firebaseapp.com",
  databaseURL: "https://type-space-tfg-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "type-space-tfg",
  storageBucket: "type-space-tfg.appspot.com",
  messagingSenderId: "655076684530",
  appId: "1:655076684530:web:2ef1296c62ce8ea524d66b"
};
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    export { db }