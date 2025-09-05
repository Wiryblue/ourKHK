import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.tsx'
import Login from './Login.tsx'
import Signup from './Signup.tsx' 
import NavBar from './components/Navbar.tsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AuthRoute from './AuthRoute.tsx'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; 
import { getFirestore } from "firebase/firestore";
import PostsPage from './Posts.tsx'
import EventPage from './Events.tsx'
import MemberPage from './Members.tsx'
import LoggedHome from './LoggedHome.tsx'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA24R0NTm4FXwUFV9etUNZLQSEWT2tQQB4",
  authDomain: "authentication-691f5.firebaseapp.com",
  projectId: "authentication-691f5",
  storageBucket: "authentication-691f5.firebasestorage.app",
  messagingSenderId: "413134776737",
  appId: "1:413134776737:web:a4f2397ca6fb57653283e0",
  measurementId: "G-BW7LL81XG9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<PostsPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/members" element={<MemberPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/**Need to remove THIS navbar from showing up in the logged in sections. They'll have a separate navbar */}
        <Route path="/userhome" element={<AuthRoute><LoggedHome /></AuthRoute>} />
        <Route path="*"element={<Navigate to="/" />} />
      </Routes>
    </Router>
  </StrictMode>
)
