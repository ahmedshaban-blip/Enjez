import React from "react";
import Navbar from "../../components/layout/Navbar";
import { useNavigate } from "react-router-dom";

export default function BookingConfirmation() {
    const navigate = useNavigate();
  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-[#111318] dark:text-white flex flex-col">
      <Navbar />
      {/* Main content */}
      <main className="flex flex-1 justify-center  px-4">
        <div className="flex flex-col w-full max-w-[720px] items-center gap-8">
          {/* Success message */}
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex items-center justify-center size-20 rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
              <span className="material-symbols-outlined text-5xl">
                task_alt
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-4xl sm:text-5xl font-black">
                Thank You! We've Received Your Request
              </p>
              <p className="text-[#616f89] dark:text-gray-400 text-base max-w-lg mx-auto">
                Your booking is now pending review. We've sent a confirmation to
                your email and will notify you once the provider confirms the
                appointment.
              </p>
            </div>
          </div>

          {/* Booking details */}
          <div className="w-full bg-white dark:bg-background-dark/50 p-6 sm:p-8 rounded-xl border border-black/10 dark:border-white/10 flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
              <p className="text-lg font-bold">Booking Details</p>
              <div className="flex items-center gap-2 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-300 px-3 py-1 text-sm font-medium">
                <span className="material-symbols-outlined text-base">
                  hourglass_top
                </span>
                <span>Pending Review</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-4 gap-y-5 border-t border-black/10 dark:border-white/10 pt-6">
              {[
                ["Service", "Deep Tissue Massage (60 min)"],
                ["Date & Time", "October 26, 2024 at 2:00 PM"],
                ["Provider", "Tranquil Spa & Wellness"],
                ["Reference ID", "BK-8675309"],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1">
                  <p className="text-[#616f89] dark:text-gray-400 text-sm">
                    {label}
                  </p>
                  <p className="text-base font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button onClick={() => navigate("/mybookings")} className="min-w-[180px] w-full sm:w-auto h-12 px-6 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition">
              View My Bookings
            </button>
            <button onClick={() => navigate("/")} className="min-w-[180px] w-full sm:w-auto h-12 px-6 rounded-lg bg-gray-200 dark:bg-white/10 text-gray-800 dark:text-white font-bold hover:bg-gray-300 dark:hover:bg-white/20 transition">
              Return to Homepage
            </button>
          </div>

          {/* Footer links */}
          <div className="w-full border-t border-black/10 dark:border-white/10 mt-6 pt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {[
              ["event", "Add to Calendar"],
              ["print", "Print Confirmation"],
              ["contact_support", "Contact Support"],
            ].map(([icon, text]) => (
              <a
                key={text}
                href="#"
                className="flex items-center gap-2 text-sm font-medium text-[#616f89] dark:text-gray-400 hover:text-primary dark:hover:text-white transition"
              >
                <span className="material-symbols-outlined text-lg">{icon}</span>
                {text}
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
