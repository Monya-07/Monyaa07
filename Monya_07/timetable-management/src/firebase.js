// Import Firebase modules
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup 
} from "firebase/auth";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    deleteDoc, 
    doc, 
    updateDoc, 
    onSnapshot 
} from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAd421sR1w5ChNg2s1LvMlX9fjMlKCwetA",
    authDomain: "timetable-management-pro.firebaseapp.com",
    projectId: "timetable-management-pro",
    storageBucket: "timetable-management-pro.appspot.com",
    messagingSenderId: "1070169729763",
    appId: "1:1070169729763:web:61e9a723a13a3af687f3d6",
    measurementId: "G-F6R81Y4SGN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

// Google Login Function
const loginWithGoogle = async () => {
    try {
        console.log("Attempting Google Sign-In...");
        const result = await signInWithPopup(auth, provider);
        console.log("Login Successful! User Info:", result.user);
        return result.user;
    } catch (error) {
        console.error("Login Failed:", error.code, error.message);
        alert(`Login Error: ${error.message}`);
    }
};

// Export Firebase modules
export { 
    app, 
    auth, 
    provider, 
    db, 
    storage, 
    collection, 
    addDoc, 
    getDocs, 
    deleteDoc, 
    doc, 
    updateDoc, 
    onSnapshot,
    loginWithGoogle
};
