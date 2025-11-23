"use client";
import React, { useState } from "react";
import { serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext.jsx";
import { useLoading } from "../../context/LoadingContext.jsx";
import { useModal } from "../../context/ModalContext.jsx";
import Navbar from "../../components/layout/Navbar.jsx";
import Footer from "../../components/layout/Footer.jsx"; 
import { createMessage } from "../../utils/firebaseHelpers.js";

export default function ContactUs() {
  const { user } = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();

  const [formData, setFormData] = useState({
    fullName: user?.displayName || "",
    email: user?.email || "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.message) {
      showModal({
        title: "Missing Fields",
        message: "Please fill in all required fields before submitting.",
        type: "error",
      });
      return;
    }

    try {
      showLoading("Sending your message...");
      await createMessage({
        ...formData,
        userId: user?.uid || null,
        createdAt: serverTimestamp(),
      });

      hideLoading();
      showModal({
        title: "Message Sent!",
        message: "We received your message and will get back to you soon.",
        type: "success",
      });

      setFormData({
        fullName: user?.displayName || "",
        email: user?.email || "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      hideLoading();
      showModal({
        title: "Error",
        message: "Something went wrong while sending your message.",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-[#111318] dark:text-white font-display">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 md:px-10 py-8 md:py-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black">Contact Our Team</h1>
            <p className="text-[#616f89] dark:text-gray-400 mt-3  mx-auto">
              We'll get back to you within 24 hours. Have a simple question?{" "}
              <a href="#" className="text-primary hover:underline font-medium">
                Check our FAQ first!
              </a>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-3 bg-white dark:bg-background-dark p-6 sm:p-8 rounded-xl border border-[#dbdfe6] dark:border-[#2c3850]">
              <h2 className="text-[22px] font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <label className="flex flex-col">
                    <p className="text-sm font-medium pb-2">Full Name</p>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="h-12 px-4 rounded-lg border border-[#dbdfe6] dark:border-[#334155] bg-white dark:bg-[#1e293b]"
                      required
                    />
                  </label>
                  <label className="flex flex-col">
                    <p className="text-sm font-medium pb-2">Email</p>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="h-12 px-4 rounded-lg border border-[#dbdfe6] dark:border-[#334155] bg-white dark:bg-[#1e293b]"
                      required
                    />
                  </label>
                </div>

                <label className="flex flex-col">
                  <p className="text-sm font-medium pb-2">Subject</p>
                  <input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g., Question about my booking"
                    className="h-12 px-4 rounded-lg border border-[#dbdfe6] dark:border-[#334155] bg-white dark:bg-[#1e293b]"
                  />
                </label>

                <label className="flex flex-col">
                  <p className="text-sm font-medium pb-2">Your Message</p>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please describe your issue or question in detail..."
                    className="min-h-[140px] p-4 rounded-lg border border-[#dbdfe6] dark:border-[#334155] bg-white dark:bg-[#1e293b]"
                  />
                </label>

                <button
                  type="submit"
                  className="h-12 px-6 bg-blue-600 text-white font-bold rounded-lg hover:opacity-90 transition"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-[22px] font-bold">Other Ways to Reach Us</h2>
              <div className="space-y-6">
                <ContactInfo
                  icon="mail"
                  title="Email Us"
                  desc="For general inquiries and support."
                  info="support@enjez.com"
                  href="mailto:support@enjez.com"
                />
                <ContactInfo
                  icon="call"
                  title="Call Us"
                  desc="Sun - Fri, 9am - 5pm EST"
                  info="+201030354268"
                  href="tel:+201030354268"
                />
                <ContactInfo
                  icon="location_on"
                  title="Our Office"
                  desc="Come say hello at our headquarters."
                  info="123 Service Lane, Tech City, 45678"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ContactInfo({ icon, title, desc, info, href }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 size-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-primary/20 text-blue-600">
        <span className="material-symbols-outlined text-xl">{icon}</span>
      </div>
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="text-[#616f89] dark:text-gray-400 text-sm mt-1">{desc}</p>
        {href ? (
          <a
            href={href}
            className="text-blue-600 font-medium text-sm mt-2 block hover:underline"
          >
            {info}
          </a>
        ) : (
          <p className="text-sm font-medium mt-2">{info}</p>
        )}
      </div>
    </div>
  );
}
