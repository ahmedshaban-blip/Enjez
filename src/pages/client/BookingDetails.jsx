import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDocById } from "../../utils/firebaseHelpers";
import { useLoading } from "../../context/LoadingContext";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer"; // Imported Footer

export default function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [service, setService] = useState(null);
  const [agent, setAgent] = useState(null);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      showLoading("Loading booking details...");
      try {
        // 1. Fetch booking
        const bookingDoc = await getDocById("bookings", id);
        if (!bookingDoc) return;

        setBooking(bookingDoc);

        // 2. Fetch service info
        if (bookingDoc.serviceId) {
          const serviceDoc = await getDocById("services", bookingDoc.serviceId);
          setService(serviceDoc);
        }

        // 3. Fetch agent info
        if (bookingDoc.agentId) {
          const agentDoc = await getDocById("agents", bookingDoc.agentId);
          setAgent(agentDoc);
        }
      } catch (err) {
        console.error(err);
      } finally {
        hideLoading();
      }
    };

    fetchData();
  }, [id]);

  if (!booking) return null;

  // Status colors
  const statusColors = {
    pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
    confirmed:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
    completed:
      "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  };

  return (
    <div className="min-h-screen flex flex-col font-display bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <Navbar />
      
      <main className="flex-grow py-6 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap gap-2 pb-2">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          >
            My Bookings
          </button>
          <span className="text-gray-500 dark:text-gray-400">/</span>
          <span className="font-medium">
            {service?.name || "Booking Details"}
          </span>
        </div>

        {/* Heading */}
        <div className="flex flex-wrap justify-between items-start gap-4 p-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-black">
              {service?.name || "Service Name"} ({service?.durationValue || "-"}{" "}
              {service?.durationUnit || "-"})
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Booking ID: {booking.referenceID}
            </p>
          </div>

          {/* Status Chip */}
          <div
            className={`flex h-9 items-center justify-center gap-x-2 rounded-full px-4 ${statusColors[booking.status]}`}
          >
            <p className="text-sm font-medium capitalize">
              {booking.status === "pending"
                ? "Request Received"
                : booking.status}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column: Booking Details */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-6">Booking Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                {[
                  ["Date", booking.date],
                  ["Time", booking.time],
                  ["Service Provider", agent?.name || "N/A"],
                  ["Location", booking.address || "N/A"],
                  ["Notes", booking.notes || "No notes"],
                ].map(([label, value], idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col gap-1 border-t border-gray-200 dark:border-gray-700 py-4 ${label === "Notes" ? "sm:col-span-2" : ""}`}
                  >
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {label}
                    </p>
                    <p className="text-gray-900 dark:text-gray-200 text-base font-medium">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Alert Box */}
            <div className="bg-blue-100 dark:bg-blue-900/40 border-l-4 border-blue-600 dark:border-blue-400 p-4 rounded-lg">
              <div className="flex items-start">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-300 text-xl">
                  info
                </span>
                <p className="ml-3 text-sm text-blue-800 dark:text-blue-200">
                  You can reschedule or cancel this booking free of charge up to
                  24 hours before the appointment time.
                </p>
              </div>
            </div>
          </div>
          {/* Right Column: Progress Tracker & Actions */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-6">Booking Progress</h2>

              <div className="grid grid-cols-[32px_1fr] gap-x-4">
                {[
                  {
                    title: "Request Received",
                    date: booking.createdAt?.toDate?.()?.toDateString(),
                    icon: "check",
                    key: "pending",
                  },
                  {
                    title: "Booking Confirmed",
                    date: booking.confirmedDate
                      ? booking.confirmedDate.toDate().toDateString()
                      : "-",
                    icon: "check",
                    key: "confirmed",
                  },
                  {
                    title: "Service In Progress",
                    date: booking.inProgressDate
                      ? booking.inProgressDate.toDate().toDateString()
                      : "-",
                    icon: "hourglass_empty",
                    key: "inProgress",
                  },
                  {
                    title: "Completed",
                    date: booking.completedDate
                      ? booking.completedDate.toDate().toDateString()
                      : "-",
                    icon: "rate_review",
                    key: "completed",
                  },
                ].map(({ title, date, icon, key }, idx) => {
                  const isActive = (() => {
                    switch (key) {
                      case "pending":
                        return true; // always active
                      case "confirmed":
                        return (
                          booking.status === "confirmed" ||
                          booking.status === "inProgress" ||
                          booking.status === "completed"
                        );
                      case "inProgress":
                        return (
                          booking.status === "inProgress" ||
                          booking.status === "completed"
                        );
                      case "completed":
                        return booking.status === "completed";
                      default:
                        return false;
                    }
                  })();

                  const bgColor = isActive
                    ? key === "pending"
                      ? "bg-green-500 text-white"
                      : key === "confirmed"
                        ? "bg-blue-500 text-white"
                        : "bg-yellow-500 text-white"
                    : "bg-gray-300 text-gray-600 dark:bg-gray-600 dark:text-gray-400";

                  return (
                    <React.Fragment key={idx}>
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className={`flex items-center justify-center rounded-full h-8 w-8 ${bgColor}`}
                        >
                          <span className="material-symbols-outlined text-base">
                            {icon}
                          </span>
                        </div>
                        {idx < 3 && (
                          <div className="w-0.5 h-full grow bg-gray-300 dark:bg-gray-600"></div>
                        )}
                      </div>
                      <div className="flex flex-col pb-6">
                        <p
                          className={
                            isActive
                              ? "text-gray-900 dark:text-gray-200"
                              : "text-gray-500 dark:text-gray-400"
                          }
                        >
                          {title}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          {date}
                        </p>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
            {/* Action Buttons */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col gap-3">
              <button className="w-full h-11 flex items-center justify-center px-6 text-base font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600">
                Reschedule
              </button>
              <button className="w-full h-11 flex items-center justify-center px-6 text-base font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600">
                Cancel Request
              </button>
              <a
                href="#"
                className="text-center text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mt-2"
              >
                Need help? Contact Us
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}