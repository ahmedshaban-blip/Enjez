import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { useNavigate } from "react-router-dom";

export default function RequestBooking() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  function handleSubmit(e) {
    e.preventDefault();
    if (!date || !time || !address || !phone) {
      // simple client-side validation
      alert("Please add a date, time slot, address and phone.");
      return;
    }
    // هنا ممكن تبعتي البيانات للسيرفر عبر fetch/axios
    // مثال: await fetch('/api/bookings', { method: 'POST', body: JSON.stringify({date, time, notes}) })
    setSubmitted(true);
    navigate("/booking/confirmation");
    // لو عايزة تصفي الفورم بعد الإرسال
    setDate("");
    setTime("");
    setNotes("");
    setAddress("");
    setPhone("");
  }

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-3 ">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-black tracking-tighter sm:text-5xl">
                Request a Service Booking
              </h1>
              <p className="mt-4 text-lg text-text-secondary-light dark:text-text-secondary-dark">
                Fill out the details below, and we will contact you to confirm
                your appointment.
              </p>
            </div>

            <div className="rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-sm">
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <label className="flex flex-col">
                    <p className="text-base font-medium pb-2">Requested Date</p>
                    <div className="relative flex w-full items-stretch">
                      <input
                        id="dateInput"
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg rounded-r-none border-r-0 text-text-primary-light dark:text-text-primary-dark border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary dark:focus:border-primary h-12 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark p-3 text-base focus:ring-2 focus:ring-primary/20"
                        placeholder="Select a date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={{
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                          appearance: "none",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("dateInput").showPicker?.()
                        }
                        className="text-text-secondary-light dark:text-text-secondary-dark flex border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark items-center justify-center px-3 rounded-r-lg border-l-0"
                      >
                        <span className="material-symbols-outlined text-xl">
                          calendar_today
                        </span>
                      </button>
                    </div>
                  </label>

                  <label className="flex flex-col">
                    <p className="text-base font-medium pb-2">Requested Time</p>
                    <select
                      className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-light dark:text-text-primary-dark border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary dark:focus:border-primary h-12 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark p-3 text-base focus:ring-2 focus:ring-primary/20"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    >
                      <option value="">Select a time slot</option>
                      {timeSlots.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <label className="flex flex-col">
                    <p className="text-base font-medium pb-2">Address</p>
                    <div className="relative flex w-full items-stretch">
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-light dark:text-text-primary-dark border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary dark:focus:border-primary h-12 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark p-3 text-base focus:ring-2 focus:ring-primary/20"
                        placeholder="ex: 123 Main St, City, State"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </label>

                  <label className="flex flex-col">
                    <p className="text-base font-medium pb-2">Phone Number</p>
                    <input
                      className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-light dark:text-text-primary-dark border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:border-primary dark:focus:border-primary h-12 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark p-3 text-base focus:ring-2 focus:ring-primary/20"
                      type="tel"
                      value={phone}
                      placeholder="ex: +1 (555) 123-4567"
                      onChange={(e) => setPhone(e.target.value)}
                    ></input>
                  </label>
                </div>

                <label className="flex flex-col">
                  <p className="text-base font-medium pb-2">Additional Notes</p>
                  <textarea
                    className="form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-text-primary-light dark:text-text-primary-dark border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark min-h-32 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark p-3 text-base focus:border-primary dark:focus:border-primary focus:ring-2 focus:ring-blue-200"
                    placeholder="Please provide any details that will help us prepare for your service..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-2">
                    Example: "We have a large dog, please let us know if we need
                    to secure it."
                  </p>
                </label>

                <div className="pt-2">
                  <button
                    className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-blue-600 text-white text-base font-bold leading-normal tracking-wide hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-surface-dark"
                    type="submit"
                  >
                    <span className="truncate">Submit Booking Request</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
