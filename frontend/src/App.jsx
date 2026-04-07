import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import GraphView from "./pages/GraphView";

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#071952", color: "white" }}>
      <nav style={{ padding: "16px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <Link to="/" style={{ color: "#97FEED", marginRight: "16px" }}>Dashboard</Link>
        <Link to="/courses" style={{ color: "#97FEED", marginRight: "16px" }}>Courses</Link>
        <Link to="/graph/1" style={{ color: "#97FEED" }}>Graph</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/graph/:courseId" element={<GraphView />} />
      </Routes>
    </div>
  );
}