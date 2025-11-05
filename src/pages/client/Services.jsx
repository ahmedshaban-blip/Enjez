// src/pages/client/Services.jsx

import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar.jsx";
import ServiceCard from "../../components/common/ServiceCard.jsx";
import { getAllDocs } from "../../utils/firebaseHelpers.js";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllDocs("services"); // 👈 collection name
        setServices(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load services. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col">
      <Navbar />

      <main className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto py-10 flex-1">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Browse Services
          </h1>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Find and book trusted professionals for anything you need.
          </p>
        </header>

        {/* Loading / Error / Empty / Grid */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <p className="text-center text-red-600 text-sm sm:text-base">{error}</p>
        ) : services.length === 0 ? (
          <p className="text-center text-slate-500 text-sm sm:text-base">
            No services available yet.
          </p>
        ) : (
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
