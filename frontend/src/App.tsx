import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import Events from "./pages/Events";
import Financial from "./pages/Financial";
import KHKMaterials from "./pages/KHKMaterials";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/events" element={<Events />} />
            <Route path="/financial" element={<Financial />} />
            <Route path="/materials" element={<KHKMaterials />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
