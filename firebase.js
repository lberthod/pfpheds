import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCovk3J5xoTiDojgrWquSqpSNWvdgJIRmc",
    authDomain: "fpformationheds.firebaseapp.com",
    databaseURL: "https://fpformationheds-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fpformationheds",
    storageBucket: "fpformationheds.appspot.com",
    messagingSenderId: "695199918094",
    appId: "1:695199918094:web:4504dc1940316e17f0f45f"
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
