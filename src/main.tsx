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
  apiKey: "AIzaSyCME_X86gEQYJBu9v-n0tY_Sh_y5N2h4Q0",
  authDomain: "ourkhk-af04e.firebaseapp.com",
  projectId: "ourkhk-af04e",
  storageBucket: "ourkhk-af04e.firebasestorage.app",
  messagingSenderId: "342932836626",
  appId: "1:342932836626:web:b06b123dd85a17d40523cb",
  measurementId: "G-5RJ7KQZ5QM"
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
