import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CandidateDashboard from "./pages/CandidateDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/candidate-dashboard"
        element={<CandidateDashboard />}
      />

      <Route
        path="/recruiter-dashboard"
        element={<RecruiterDashboard />}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;