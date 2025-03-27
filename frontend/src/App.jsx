import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginPage from "./page/Auth/Login.jsx";
import Dashboard from "./page/DashBoard.jsx";
import AdminDashboard from "./page/Admin/AdminDashboard.jsx";
import SignupPage from "./page/Auth/Singup.jsx";
import LandingPage from "./page/LandingPage.jsx";
import RouteUser from "./page/route/routeUser.jsx";
import FleetManagement from "./page/Fleet/FleetManage.jsx";
import ProfileUser from "./page/profile/profileUser.jsx";

const App = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem("role"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  

  useEffect(() => {
    const updateAuthState = () => {
      setUserRole(localStorage.getItem("role"));
      setIsAuthenticated(!!localStorage.getItem("token"));
    };
  
    window.addEventListener("storage", updateAuthState);
  
    // Manually update state on component mount
    updateAuthState();
  
    return () => window.removeEventListener("storage", updateAuthState);
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to={userRole === "admin" ? "/admin" : "/dashboard"} /> : <LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={isAuthenticated && userRole === "user" ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/profileUser" element={<ProfileUser />} />
        <Route path="/routeUser" element={<RouteUser />} />
        <Route path="/vehicle" element={<FleetManagement/>} />
        <Route path="/admin" element={isAuthenticated && userRole === "admin" ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? (userRole === "admin" ? "/admin" : "/dashboard") : "/login"} />} />
      
      </Routes>
    </Router>
  );
};
export default App;