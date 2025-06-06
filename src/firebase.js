// Import the Firebase SDK functions you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc
} from "firebase/firestore";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRGvRXK9IkxohVnMbjBe5U_1XqMI5Q4So",
  authDomain: "netflix-clone-d1680.firebaseapp.com",
  projectId: "netflix-clone-d1680",
  storageBucket: "netflix-clone-d1680.appspot.com", // FIXED this line
  messagingSenderId: "492476585614",
  appId: "1:492476585614:web:c71a4fd1b1aaa28eb71bdf",
  measurementId: "G-E9JPVSK0K7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Helper function to validate email
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Sign up new user
const signup = async (name, email, password) => {
  if (!isValidEmail(email)) {
    alert("Invalid email format.");
    return;
  }
  if (password.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Save user info to Firestore
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    
  } catch (error) {
    console.log("Signup Error:", error);
   toast.error("Error signing up: " + error.code.split('/')[1].split('-').join(' '));
   
  }
};

// Login existing user
const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    
  } catch (error) {
    console.log("Login Error:", error);
toast.error("Error signing up: " + error.code.split('/')[1].split('-').join(' '));  }
};

// Logout current user
const logout = () => {
  signOut(auth)
   
    .catch((error) => {
      console.log("Logout Error:", error);
      alert("Error logging out.");
    });
};

// Export functions and instances
export { auth, db, signup, login, logout };
