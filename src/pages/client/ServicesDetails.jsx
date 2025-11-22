// src/pages/client/ServicesDetails.jsx
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Navbar from '../../components/layout/Navbar';
import { useAuth } from '../../context/AuthContext.jsx';
import { useModal } from '../../context/ModalContext.jsx';
import { CheckCircle2, ArrowRight, Star, MapPin, Clock, ShieldCheck } from 'lucide-react';
import Logo from '../../assets/logo2.svg';

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth();
  const { showModal } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchService() {
      if (!id) {
        setError('No service ID provided');
        setLoading(false);
        return;
      }

      try {
        const serviceRef = doc(db, 'services', id);
        const serviceDoc = await getDoc(serviceRef);

        if (serviceDoc.exists()) {
          const serviceData = {
            id: serviceDoc.id,
            ...serviceDoc.data(),
          };
          setService(serviceData);
        } else {
          setError('Service not found');
        }
      } catch (err) {
        console.error('Error details:', err);
        setError('Failed to load service details');
      } finally {
        setLoading(false);
      }
    }

    fetchService();
  }, [id]);

  const handleBookClick = () => {
    const serviceId = service?.id;
    if (!serviceId) return;

    if (!user) {
      showModal({
        title: 'Login Required',
        message: 'You have to log in to book this service.',
        type: 'error',
        actionLabel: 'Go to Login',
        onAction: () => navigate('/login'),
      });
      return;
    }

    navigate(`/booking/${serviceId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-red-100">
          <p className="text-red-600 font-bold text-lg mb-4">{error}</p>
          <Link to="/services" className="text-blue-600 hover:underline">Return to Services</Link>
        </div>
      </div>
    );
  }

  const heroImage = service?.images && service.images.length > 0
    ? service.images[0]
    : "https://images.pexels.com/photos/37347/repair-cell-phone-repairing-fix.jpg";

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
      <Navbar />

      <div className="flex flex-col min-h-screen">
        <main className="flex-1">

          {/* --- Hero Section --- */}
          <div className="relative h-[400px] lg:h-[500px] w-full overflow-hidden">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
              style={{ backgroundImage: `url("${heroImage}")` }}
            ></div>

            {/* Dark Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/30"></div>

            <div className="absolute inset-0 flex flex-col justify-end pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
              {/* Breadcrumbs */}
              <div className="flex flex-wrap gap-2 text-sm font-medium text-slate-300 mb-4">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link to="/services" className="hover:text-white transition-colors">Services</Link>
                <span>/</span>
                <span className="text-blue-400 truncate max-w-[200px]">{service?.name}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 shadow-sm">
                {service?.name || 'Service Details'}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-slate-200 text-sm sm:text-base font-medium">
                {service?.category && (
                  <span className="bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {service.category}
                  </span>
                )}
                <div className="flex items-center gap-1.5">
                  Time Flexable <Clock className="w-4 h-4" />

                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

              {/* --- Left Column: Main Content --- */}
              <div className="lg:col-span-2 space-y-10">

                {/* Overview Card */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-4 flex items-center gap-2">
                    Service Overview
                  </h2>
                  <p className="text-lg leading-relaxed text-slate-600">
                    {service?.longDescription ||
                      service?.description ||
                      'No description available for this service.'}
                  </p>
                </div>

                {/* Tabs / Details */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
                  <div className="border-b border-slate-100 flex gap-6 mb-6 overflow-x-auto">
                    <button className="pb-3 text-base font-bold border-b-2 border-blue-600 text-blue-600 whitespace-nowrap">
                      Description
                    </button>
                    <button className="pb-3 text-base font-bold text-slate-400 hover:text-slate-600 border-b-2 border-transparent transition-colors whitespace-nowrap">
                      What's Included
                    </button>
                    <button className="pb-3 text-base font-bold text-slate-400 hover:text-slate-600 border-b-2 border-transparent transition-colors whitespace-nowrap">
                      FAQ
                    </button>
                  </div>
                  <div className="text-slate-600 leading-relaxed space-y-4">
                    <p>{service?.details || 'Full service details will be listed here to help you understand the process.'}</p>
                  </div>
                </div>

                {/* Gallery Grid */}
                {service?.images && service.images.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-6">
                      Gallery
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {service.images.map((image, index) => (
                        <div key={index} className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-100 cursor-pointer shadow-sm hover:shadow-md transition-all">
                          <img
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            src={image}
                            alt={`${service.name} ${index + 1}`}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews / Testimonial */}
                <div className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100">
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Star className="w-5 h-5 text-blue-600" />
                    Client Stories
                  </h2>
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-blue-200 flex-shrink-0 overflow-hidden">
                      <img src="https://i.pravatar.cc/150?img=32" alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-slate-700 italic text-lg leading-relaxed mb-3">
                        "The team completely transformed our brand's image. The new identity is professional, modern, and perfectly captures our company's spirit."
                      </p>
                      <div>
                        <p className="font-bold text-slate-900">Jane Doe</p>
                        <p className="text-sm text-slate-500">Verified Client</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Right Column: Sticky Sidebar --- */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">

                  {/* Booking Card */}
                  <div className="bg-white rounded-2xl shadow-xl shadow-blue-100/50 border border-slate-100 overflow-hidden">
                    <div className="p-6 sm:p-8">
                      <div className="mb-6">
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Starting from</p>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-4xl font-black text-slate-900">
                            {service?.price ? Number(service.price).toLocaleString() : 'N/A'}
                          </span>
                          <span className="text-lg font-bold text-slate-500">EGP</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleBookClick}
                        className="w-full group relative overflow-hidden rounded-xl bg-slate-900 py-4 px-5 text-white shadow-lg transition-all hover:bg-slate-800 hover:shadow-xl active:scale-95"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2 font-bold text-lg">
                          Book This Service
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </button>

                      <p className="text-xs text-center text-slate-400 mt-4">
                        No hidden fees. Secure payment.
                      </p>
                    </div>

                    <div className="bg-slate-50/80 p-6 border-t border-slate-100">
                      <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Included Features</h3>
                      <ul className="space-y-3">
                        {service?.features ? (
                          service.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3 text-sm text-slate-600">
                              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))
                        ) : (
                          <>
                            <li className="flex items-start gap-3 text-sm text-slate-600">
                              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                              <span>Professional Consultation</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600">
                              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                              <span>Quality Guarantee</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600">
                              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                              <span>24/7 Support</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Help Box */}
                  <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm text-center">
                    <p className="text-sm font-medium text-slate-600 mb-2">Have questions?</p>
                    <Link to="/contact" className="text-blue-600 font-bold hover:underline">
                      Contact Support Team
                    </Link>
                  </div>

                </div>
              </div>

            </div>

            {/* CTA Section */}
            <div className="mt-20 relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-16 sm:px-12 sm:py-20 text-center shadow-2xl">
              {/* Background Gradients */}
              <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>

              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Ready to get started?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
                  Join hundreds of satisfied clients and take your business to the next level today.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                  <button
                    onClick={handleBookClick}
                    className="rounded-xl bg-white px-8 py-3.5 text-base font-bold text-slate-900 shadow-sm hover:bg-slate-100 transition-colors"
                  >
                    Get Started Now
                  </button>
                </div>
              </div>
            </div>

          </div>
        </main>

        {/* --- Footer --- */}
        <footer className="bg-white border-t border-slate-200 mt-20 pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="col-span-2 md:col-span-1 pr-8">
                <div className="flex items-center gap-2 mb-4 text-slate-900">
                  {/* Logo SVG reused */}
                  <img src={Logo} alt="Logo" className="h-10 w-10 rounded-xl object-contain" />
                  <span className="font-bold text-xl tracking-tight">EnjezPlatform</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">
                  High-quality services to help your business grow. Find the right professional for your needs today.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-wider">Company</h3>
                <ul className="space-y-3 text-sm text-slate-500">
                  <li><Link to="../client/About.jsx" className="hover:text-blue-600 transition-colors">About</Link></li>
                  <li><Link to="../client/Services.jsx" className="hover:text-blue-600 transition-colors">Services</Link></li>
                  <li><Link to="../client/Contact.jsx" className="hover:text-blue-600 transition-colors">Contact</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-wider">Legal</h3>
                <ul className="space-y-3 text-sm text-slate-500">
                  <li><Link to="#" className="hover:text-blue-600 transition-colors">Privacy</Link></li>
                  <li><Link to="#" className="hover:text-blue-600 transition-colors">Terms</Link></li>
                </ul>
              </div>
            </div>
            <div className="text-center pt-8 border-t border-slate-100">
              <p className="text-slate-400 text-sm">© 2025 EnjezPlatform. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;