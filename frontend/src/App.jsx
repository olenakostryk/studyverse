import { Routes, Route, Link, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import GraphView from "./pages/GraphView";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";

export default function App() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div style={{ minHeight: "100vh", background: "#071952", color: "white" }}>
      
      {/* Navbar only if logged in */}
      {token && !isAuthPage && (
        <nav style={{ padding: "16px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
         <Link to="/dashboard" style={{ color: "#97FEED", marginRight: "16px" }}>
  Dashboard
</Link>
          <Link to="/courses" style={{ color: "#97FEED", marginRight: "16px" }}>Courses</Link>
          <Link to="/graph" style={{ color: "#97FEED" }}>Graph</Link>
        </nav>
      )}

    <Routes>
  {/* Public */}
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* Protected */}
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/courses"
    element={
      <ProtectedRoute>
        <Courses />
      </ProtectedRoute>
    }
  />

  <Route
    path="/graph"
    element={
      <ProtectedRoute>
        <GraphView />
      </ProtectedRoute>
    }
  />
</Routes>
    </div>
  );
}