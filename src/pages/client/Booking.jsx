import React, { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import { Timestamp } from "firebase/firestore";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getAllDocs, createBooking } from "../../utils/firebaseHelpers.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useLoading } from "../../context/LoadingContext.jsx";
import { useModal } from "../../context/ModalContext.jsx";
import { Calendar, User, Clock, MapPin, Phone, FileText, ChevronLeft, ArrowRight, Sparkles } from "lucide-react";

export default function RequestBooking() {
  // --- Logic Section (Unchanged) ---
  const { id } = useParams();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const services = await getAllDocs("services");
        const selected = services.find((s) => s.id === id);
        if (!selected) throw new Error("Service not found");
        setService(selected);

        const allAgents = await getAllDocs("agents");
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

  // --- New UI Design ---
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          
          {/* Header Section */}
          <div className="mb-10">
             <Link to={`/services/${id}`} className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors mb-6">
                <ChevronLeft className="w-4 h-4" />
                Back to Service Details
             </Link>

             <div className="flex items-start justify-between">
                <div>
                   <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-2">
                      Book Your Appointment
                   </h1>
                   <p className="text-lg text-slate-600">
                      Complete the form below to schedule <span className="font-bold text-blue-600">{service?.name || "Service"}</span>.
                   </p>
                </div>
                <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600">
                   <Sparkles className="w-6 h-6" />
                </div>
             </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
             
             {/* Progress Bar Decoration */}
             <div className="h-2 bg-slate-100 w-full">
                <div className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-r-full"></div>
             </div>

             <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
                
                {/* Section 1: Schedule */}
                <div className="space-y-6">
                   <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs">1</span>
                      Date & Time
                   </h3>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Date Input */}
                      <div className="space-y-2">
                         <label htmlFor="dateInput" className="text-sm font-bold text-slate-700 ml-1">Select Date</label>
                         <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                               <Calendar className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                               id="dateInput"
                               type="date"
                               className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 font-medium"
                               value={date}
                               onChange={(e) => setDate(e.target.value)}
                               onClick={(e) => e.target.showPicker && e.target.showPicker()}
                            />
                         </div>
                      </div>

                      {/* Time Input */}
                      <div className="space-y-2">
                         <label className="text-sm font-bold text-slate-700 ml-1">Select Time</label>
                         <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                               <Clock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <select
                               className="block w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 font-medium appearance-none cursor-pointer"
                               value={time}
                               onChange={(e) => setTime(e.target.value)}
                            >
                               <option value="">Select a time slot</option>
                               {timeSlots.map((t) => (
                                  <option key={t} value={t}>{t}</option>
                               ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                               <svg className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Section 2: Details */}
                <div className="space-y-6">
                   <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs">2</span>
                      Service Details
                   </h3>

                   <div className="grid grid-cols-1 gap-6">
                       {/* Provider Select */}
                      <div className="space-y-2">
                         <label className="text-sm font-bold text-slate-700 ml-1">Choose Provider</label>
                         <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                               <User className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <select
                               className="block w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 font-medium appearance-none cursor-pointer"
                               value={selectedAgent}
                               onChange={(e) => setSelectedAgent(e.target.value)}
                            >
                               <option value="">Select a professional</option>
                               {agents.map((a) => (
                                  <option key={a.id} value={a.id}>
                                     {a.name || a.email || "Unnamed Agent"}
                                  </option>
                               ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                               <svg className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                         </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                         {/* Address Input */}
                         <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Location Address</label>
                            <div className="relative group">
                               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                  <MapPin className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                               </div>
                               <input
                                  type="text"
                                  className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 font-medium"
                                  placeholder="Street, City, Building..."
                                  value={address}
                                  onChange={(e) => setAddress(e.target.value)}
                               />
                            </div>
                         </div>

                         {/* Phone Input */}
                         <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Contact Number</label>
                            <div className="relative group">
                               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                  <Phone className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                               </div>
                               <input
                                  type="tel"
                                  className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 font-medium"
                                  placeholder="+20 1xx xxx xxxx"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                               />
                            </div>
                         </div>
                      </div>

                      {/* Notes Input */}
                      <div className="space-y-2">
                         <label className="text-sm font-bold text-slate-700 ml-1">Additional Notes</label>
                         <div className="relative group">
                            <div className="absolute top-3.5 left-0 pl-4 flex items-start pointer-events-none">
                               <FileText className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <textarea
                               className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 font-medium min-h-[100px]"
                               placeholder="Any specific instructions or requirements?"
                               value={notes}
                               onChange={(e) => setNotes(e.target.value)}
                            />
                         </div>
                      </div>
                   </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                   <button
                      type="submit"
                      className="w-full group relative overflow-hidden rounded-xl bg-slate-900 py-4 px-5 text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-slate-800 hover:shadow-xl active:scale-[0.99]"
                   >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400 opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
                      <span className="relative flex items-center justify-center gap-2 font-bold text-lg">
                         Confirm Booking Request
                         <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                   </button>
                   <p className="text-center text-xs text-slate-400 mt-4">
                      By clicking confirm, you agree to our terms of service.
                   </p>
                </div>

             </form>
          </div>
        </div>
      </main>
    </div>
  );
}