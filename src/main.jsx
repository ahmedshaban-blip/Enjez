import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "./App.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import "./index.css";

import Home from "./pages/client/Home.jsx";
import ClientServices from "./pages/client/Services.jsx";
import ServicesDetails from "./pages/client/ServicesDetails.jsx";

import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import Bookings from "./pages/admin/Bookings.jsx";
import Clients from "./pages/admin/Clients.jsx";
import AdminServices from "./pages/admin/Services.jsx";
import Reports from "./pages/admin/Reports.jsx";
import Settings from "./pages/admin/Settings.jsx";
import AddService from "./pages/admin/AddService.jsx";

import { LoadingProvider } from "./context/LoadingContext.jsx";
import { ModalProvider } from "./context/ModalContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

import RequestBooking from "./pages/client/Booking.jsx";
import BookingConfirmation from "./pages/client/Confirmation.jsx";
import MyBookings from "./pages/client/MyBookings.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LoadingProvider>
          <ModalProvider>
            <Routes>
              {/* redirect root to /home */}
              <Route path="/" element={<Navigate to="/home" replace />} />

              {/* client pages */}
              <Route path="/home" element={<Home />} />
              <Route path="/services" element={<ClientServices />} />
              <Route path="/services/:id" element={<ServicesDetails />} />
              <Route path="/booking/:id" element={<RequestBooking />} />
              <Route
                path="/booking/confirmation/:id"
                element={<BookingConfirmation />}
              />
              <Route path="/mybookings/:id" element={<MyBookings />} />

              {/* login & signup */}
              <Route path="/login" element={<App />} />
              <Route path="/signup" element={<Signup />} />

              {/* Admin layout + pages */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="clients" element={<Clients />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
                <Route path="add-service" element={<AddService />} />
              </Route>
            </Routes>
          </ModalProvider>
        </LoadingProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
