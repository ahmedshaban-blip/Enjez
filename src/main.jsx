import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import "./index.css";
import Home from "./pages/client/Home.jsx";

import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import Bookings from "./pages/admin/Bookings.jsx";
import Clients from "./pages/admin/Clients.jsx";
import Services from "./pages/admin/Services.jsx";
import Reports from "./pages/admin/Reports.jsx";
import Settings from "./pages/admin/Settings.jsx";
import AddService from "./pages/admin/AddService.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";
import { ModalProvider } from "./context/ModalContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoadingProvider>
      <ModalProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Home" replace />} />

        <Route path="/home" element={<Home />} />

        {/* login & signup */}
        <Route path="/login" element={<App />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin layout + pages */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="clients" element={<Clients />} />
          <Route path="services" element={<Services />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="add-service" element={<AddService />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ModalProvider>
    </LoadingProvider>
  </React.StrictMode>
);
