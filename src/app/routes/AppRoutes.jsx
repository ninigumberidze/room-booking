import { Routes, Route } from "react-router-dom";

import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Dashboard from "../../pages/Dashboard";

import StudentDashboard from "../../pages/StudentDashboard";
import StudentProfile from "../../pages/StudentProfile";

import AdminDashboard from "../../pages/AdminDashboard";
import AdminProfile from "../../pages/AdminProfile";

import LecturerDashboard from "../../pages/LecturerDashboard";
import LecturerProfile from "../../pages/LecturerProfile";

import ForgotPassword from "../../pages/ForgotPassword";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/student-dashboard"
        element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student-profile"
        element={
          <ProtectedRoute>
            <StudentProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-profile"
        element={
          <ProtectedRoute>
            <AdminProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/lecturer-dashboard"
        element={
          <ProtectedRoute>
            <LecturerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/lecturer-profile"
        element={
          <ProtectedRoute>
            <LecturerProfile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
