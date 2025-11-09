// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Protected Routes
import AdminRoute from "./components/AdminRoute.jsx";
import ProtectedRoute from "./components/layout/ProtectedRoute.jsx";

// Auth Pages
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";

// Client Pages
import Home from "./pages/client/Home.jsx";
import ClientServices from "./pages/client/Services.jsx";
import ServicesDetails from "./pages/client/ServicesDetails.jsx";
import RequestBooking from "./pages/client/Booking.jsx";
import BookingConfirmation from "./pages/client/Confirmation.jsx";
import MyBookings from "./pages/client/MyBookings.jsx";
import BookingDetails from "./pages/client/BookingDetails.jsx";
import ClientNotifications from "./pages/client/Notifications.jsx";

// Admin Pages
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import Bookings from "./pages/admin/Bookings.jsx";
import Clients from "./pages/admin/Clients.jsx";
import AdminServices from "./pages/admin/Services.jsx";
import Reports from "./pages/admin/Reports.jsx";
import Settings from "./pages/admin/Settings.jsx";
import AddService from "./pages/admin/AddService.jsx";
import NotFound from './pages/NotFound.jsx';
import AdminNotifications from './pages/admin/Notifications.jsx';
import ViewDetails from './pages/admin/ViewDetails.jsx';

function App() {
  return (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />

              <Route path="/home" element={<Home />} />
              <Route path="/services" element={<ClientServices />} />
              <Route path="/services/:id" element={<ServicesDetails />} />

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/booking/:id" element={<RequestBooking />} />
                <Route path="/booking/confirmation/:id" element={<BookingConfirmation />} />
                <Route path="/mybookings/:id" element={<MyBookings />} />
                <Route path="/booking/details/:id" element={<BookingDetails />} />
                <Route path="/notifications" element={<ClientNotifications />} />
              </Route>

              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="bookings" element={<Bookings />} />
                  <Route path="booking/view-details/:id" element={<ViewDetails />} />
                  <Route path="clients" element={<Clients />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="add-service" element={<AddService />} />
                  <Route path="notifications" element={<AdminNotifications />} />
                </Route>
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
  );
}

export default App;
