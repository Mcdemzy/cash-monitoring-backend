import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import LandingPage from "./pages/landing/LandingPage";
import LoginPage from "./pages/auth/Login";
import RequestPage from "./pages/requests/RequestPage";
import RequestHistory from "./pages/requests/RequestHistory";
import RetirementPage from "./pages/retirement/RetirementPage";
import ApprovalDashboard from "./pages/approval/ApprovalDashboard";
import ReportsPage from "./pages/reports/ReportsPage";
import SignupPage from "./pages/auth/Signup";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Dashboard routes wrapped in the layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="request" element={<RequestPage />} />
          <Route path="requests" element={<RequestHistory />} />
          <Route path="retirement" element={<RetirementPage />} />
          <Route path="approvals" element={<ApprovalDashboard />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>

        {/* More routes will come later */}
      </Routes>
    </Router>
  );
}
