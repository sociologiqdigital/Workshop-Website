import { Routes, Route, Navigate } from "react-router-dom";

// 1. Import Layouts & Auth
import AdminLayout from "./components/Layout/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

// 2. Import Pages
import Login from "./components/pages/Login";
import DashboardOverview from "./components/pages/DashboardOverview";
import WorkshopManagement from "./components/pages/WorkshopManagement ";
import Registrations from "./components/pages/Registrations";
import ContentManagement from "./components/pages/ContentManagement ";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Redirect root to dashboard or login */}
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<DashboardOverview />} />
          <Route path="/admin/workshops" element={<WorkshopManagement />} />
          <Route path="/admin/registrations" element={<Registrations />} />
          <Route path="/admin/content" element={<ContentManagement />} />
        </Route>
      </Route>

      {/* Catch-all 404 */}
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}
