import React, { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import { Timestamp } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { getAllDocs, createBooking } from "../../utils/firebaseHelpers.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useLoading } from "../../context/LoadingContext.jsx";
import { useModal } from "../../context/ModalContext.jsx";

export default function RequestBooking() {
  const { id } = useParams(); // service id
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();
  const [service, setService] = useState(null);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
  ];

  // Fetch service details + related agents
  useEffect(() => {
    const fetchData = async () => {
      try {
        const services = await getAllDocs("services");
        const selected = services.find((s) => s.id === id);
        if (!selected) throw new Error("Service not found");
        setService(selected);

        // Get all agents from Firestore
        const allAgents = await getAllDocs("agents");

        // Filter only those whose IDs exist in service.agents array
        const relatedAgents = allAgents.filter((a) =>
          selected.agents?.includes(a.id)
        );
        setAgents(relatedAgents);
      } catch (err) {
        console.error(err);
        showModal({
          title: "Error",
          message: "Failed to load service or providers.",
          type: "error",
        });
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !time || !address || !phone || !selectedAgent) {
      showModal({
        title: "Missing Fields",
        message: "Please fill in all required fields including provider.",
        type: "error",
      });
      return;
    }

    if (!user) {
      showModal({
        title: "Not Logged In",
        message: "Please log in to book this service.",
        type: "error",
      });
      navigate("/login");
      return;
    }

    showLoading("Creating your booking...");

    const referenceID = `BKG-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    const bookingData = {
      userId: user.uid,
      serviceId: id,
      agentId: selectedAgent,
      date,
      time,
      address,
      phone,
      notes,
      status: "pending",
      referenceID,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    try {
      const bookingId = await createBooking(bookingData);
      hideLoading();
      navigate(`/booking/confirmation/${bookingId}`);
    } catch (error) {
      hideLoading();
      console.error(error);
      showModal({
        title: "Error",
        message: "Something went wrong while booking. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container  px-4 py-3">
          <div className="mx-auto max-w-3xl">
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

                {/* DATE / PROVIDER / TIME */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* DATE */}
                  <label className="flex flex-col">
                    <p className="text-base font-medium pb-2">Requested Date</p>
                    <div className="relative flex w-full items-stretch">
                      <input
                        id="dateInput"
                        className="flex w-full rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-3 text-base focus:ring-2 focus:ring-primary/20"
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
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        <span className="material-symbols-outlined text-xl">
                          calendar_today
                        </span>
                      </button>
                    </div>
                  </label>

                  {/* PROVIDER */}
                  <label className="flex flex-col">
                    <p className="text-base font-medium pb-2">Provider</p>
                    <select
                      className="form-select w-full rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-3 text-base focus:ring-2 focus:ring-primary/20"
                      value={selectedAgent}
                      onChange={(e) => setSelectedAgent(e.target.value)}
                    >
                      <option value="">Select a provider</option>
                      {agents.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name || a.email || "Unnamed Agent"}
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* TIME */}
                  <label className="flex flex-col">
                    <p className="text-base font-medium pb-2">Requested Time</p>
                    <select
                      className="form-select w-full rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-3 text-base focus:ring-2 focus:ring-primary/20"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    >
                      <option value="">Select a time slot</option>
                      {timeSlots.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                </div>

                {/* ADDRESS & PHONE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <label className="flex flex-col">
                    <p className="text-base font-medium pb-2">Address</p>
                    <input
                      className="w-full rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-3 text-base focus:ring-2 focus:ring-primary/20"
                      placeholder="ex: 123 Main St, City, State"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </label>

                  <label className="flex flex-col">
                    <p className="text-base font-medium pb-2">Phone Number</p>
                    <input
                      className="w-full rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-3 text-base focus:ring-2 focus:ring-primary/20"
                      type="tel"
                      placeholder="ex: +1 (555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </label>
                </div>

                {/* NOTES */}
                <label className="flex flex-col">
                  <p className="text-base font-medium pb-2">Additional Notes</p>
                  <textarea
                    className="w-full rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-3 text-base focus:ring-2 focus:ring-primary/20"
                    placeholder="Please provide any details..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </label>

                {/* SUBMIT */}
                <div className="pt-2">
                  <button
                    className="w-full rounded-lg h-12 bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
                    type="submit"
                  >
                    Submit Booking Request
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