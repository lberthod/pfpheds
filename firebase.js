import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDV0Fbiu8ds-WLLG9WrH4eNqTfWLe84_8g",
    authDomain: "pfpheds.firebaseapp.com",
    databaseURL: "https://pfpheds-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pfpheds",
    storageBucket: "pfpheds.appspot.com",
    messagingSenderId: "985064549276",
    appId: "1:985064549276:web:732edc591f04477e8eb659"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getDatabase(app);

// Get a reference to the auth service
const auth = getAuth(app);

// Get a reference to the storage service
const storage = getStorage(app);

console.log(db);
console.log(auth);
console.log(storage);

export { db, auth, storage };
