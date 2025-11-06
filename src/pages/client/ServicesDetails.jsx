import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Navbar from '../../components/layout/Navbar';
import { useAuth } from '../../components/authContext.jsx';
import { useModal } from '../../context/ModalContext.jsx';

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
      console.log('Current ID from params:', id);

      if (!id) {
        console.log('No ID provided');
        setError('No service ID provided');
        setLoading(false);
        return;
      }

      try {
        console.log('Attempting to fetch service from Firestore...');
        const serviceRef = doc(db, 'services', id);
        console.log('Service reference created');

        const serviceDoc = await getDoc(serviceRef);
        console.log('Got response from Firestore');

        if (serviceDoc.exists()) {
          const serviceData = {
            id: serviceDoc.id,
            ...serviceDoc.data(),
          };
          console.log('Found service data:', serviceData);
          setService(serviceData);
        } else {
          console.log('No service found with ID:', id);
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
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <Navbar />
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="flex flex-wrap gap-2 pb-6">
              <Link
                className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal hover:text-primary"
                to="/"
              >
                Home
              </Link>
              <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">
                /
              </span>
              <Link
                className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal hover:text-primary"
                to="/services"
              >
                Services
              </Link>
              <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">
                /
              </span>
              <span className="text-text-light dark:text-text-dark text-sm font-medium leading-normal">
                {service?.name || 'Service Details'}
              </span>
            </div>
            {/* Hero Section */}
            <div
              className="relative bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-80"
              style={{
                backgroundImage:
                  service?.images && service.images.length > 0
                    ? `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 40%), url("${service.images[0]}")`
                    : 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 40%), url("https://images.pexels.com/photos/37347/repair-cell-phone-repairing-fix.jpg")',
              }}
            >
              <div className="flex flex-col p-6 md:p-8 text-white">
                <h1 className="tracking-tight text-4xl md:text-5xl font-bold leading-tight">
                  {service?.name || 'Service Details'}
                </h1>
                <p className="mt-2 text-lg md:text-xl text-gray-200">
                  {service?.description || 'Service description'}
                </p>
              </div>
            </div>
            {/* Main Content & CTA */}
            <div className="mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2 space-y-10">
                {/* Overview Section */}
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-primary">
                    Service Overview
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-300">
                    {service?.longDescription ||
                      service?.description ||
                      'No description available'}
                  </p>
                </div>
                {/* Tabbed Content */}
                <div className="w-full">
                  <div className="border-b border-border-light dark:border-border-dark flex space-x-6">
                    <button className="py-3 px-1 text-base font-semibold border-b-2 border-primary text-primary">
                      Description
                    </button>
                    <button className="py-3 px-1 text-base font-semibold text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary border-b-2 border-transparent hover:border-primary/50 transition-colors">
                      What's Included
                    </button>
                    <button className="py-3 px-1 text-base font-semibold text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary border-b-2 border-transparent hover:border-primary/50 transition-colors">
                      FAQ
                    </button>
                  </div>
                  <div className="pt-6 text-base text-gray-600 dark:text-gray-300">
                    <p>{service?.details || 'Service details will be listed here.'}</p>
                  </div>
                </div>
                {/* Gallery Section */}
                {service?.images && service.images.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-primary">
                      Service Gallery
                    </h2>
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                      {service.images.map((image, index) => (
                        <img
                          key={index}
                          className="rounded-lg object-cover aspect-square hover:opacity-90 transition-opacity cursor-pointer"
                          alt={`${service.name} - Image ${index + 1}`}
                          src={image}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {/* Testimonial Section */}
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-primary">
                    What Our Clients Say
                  </h2>
                  <div className="mt-4 p-6 bg-white dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg">
                    <div className="flex items-center">
                      <img
                        className="size-12 rounded-full object-cover"
                        alt="Portrait of Jane Doe"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqyIqr652iKeHN-_lxQYmsCoY2uVwHpQP_kGo63HrDZi86SsZBDD25ikEoU6z4kWs_wwV0ZXhyboVg0iG6Txl6m8MouzdJpomxeIZ2878QHl9wUiidrPQvgMkiWgjlIl5Rgp1c24eMImPV5edNQprhXNHrUWS0SNdoIVoUmuEdmB28GZTW78m7n0c3UGCo7MZPPTgNVTisw7GlnExaG45nVWHflJ5DFGxkLWcV0gTl-W3rSY0FDrxAUZ27etsZqY0jRN7M6At0Z5pC"
                      />
                      <div className="ml-4">
                        <p className="font-bold text-text-light dark:text-text-dark">
                          Jane Doe
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          CEO, Innovate Co.
                        </p>
                      </div>
                    </div>
                    <blockquote className="mt-4 text-gray-600 dark:text-gray-300 italic">
                      "The team completely transformed our brand's image. The
                      new identity is professional, modern, and perfectly
                      captures our company's spirit. We've seen a significant
                      increase in engagement since the launch!"
                    </blockquote>
                  </div>
                </div>
              </div>
              {/* Sticky Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <div className="border border-border-light dark:border-border-dark rounded-xl bg-white dark:bg-background-dark shadow-sm">
                    <div className="p-6">
                      <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">
                        Starting from
                      </p>
                      <p className="text-4xl font-bold text-text-light dark:text-text-dark tracking-tight mt-1">
                        {service?.price ? `${service.price} EGP` : 'Price on request'}
                      </p>
                      <button
                        type="button"
                        onClick={handleBookClick}
                        className="w-full mt-6 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-blue-600 text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-blue-700 transition-colors"
                      >
                        <span className="truncate">Book This Service</span>
                      </button>
                    </div>
                    <div className="border-t border-border-light dark:border-border-dark p-6 space-y-4">
                      <h3 className="text-base font-semibold">Key Features</h3>
                      <ul className="space-y-3">
                        {service?.features ? (
                          service.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-3">
                              <span className="material-symbols-outlined text-secondary text-xl">
                                verified
                              </span>
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))
                        ) : (
                          <>
                            <li className="flex items-center gap-3">
                              <span className="material-symbols-outlined text-secondary text-xl">
                                verified
                              </span>
                              <span className="text-sm">Professional Service</span>
                            </li>
                            <li className="flex items-center gap-3">
                              <span className="material-symbols-outlined text-secondary text-xl">
                                verified
                              </span>
                              <span className="text-sm">Quality Guaranteed</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Have questions?{' '}
                      <Link
                        className="font-semibold text-primary hover:underline"
                        to="/contact"
                      >
                        Contact Us
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Call to Action Section */}
            <div className="mt-16 md:mt-24 py-12 px-8 bg-[#1e293b] text-white rounded-2xl text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Ready to Build Your Brand?
                </h2>
                <p className="mt-3 max-w-2xl mx-auto text-base md:text-lg text-gray-300">
                  Let's create a brand identity that tells your story and connects with your audience.
                </p>
                <div className="mt-8">
                  <Link
                    to={`/booking/${service?.id}`}
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-lg text-black bg-white hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Get Started Today
                  </Link>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary/10 to-transparent"></div>
            </div>
          </div>
        </main>
      </div>
      <footer className="bg-white dark:bg-background-dark border-t border-border-light dark:border-border-dark mt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3">
                <div className="size-6 text-primary">
                  {/* SVG Logo */}
                  <svg
                    fill="none"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"
                      fill="currentColor"
                    ></path>
                    <path
                      clipRule="evenodd"
                      d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z"
                      fill="currentColor"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-text-light dark:text-text-dark">
                  ServicePlatform
                </h2>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                High-quality services to help your business grow.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-500 dark:text-gray-400">
                Services
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    className="text-base text-gray-600 dark:text-gray-300 hover:text-primary"
                    to="#"
                  >
                    Brand Design
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base text-gray-600 dark:text-gray-300 hover:text-primary"
                    to="#"
                  >
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base text-gray-600 dark:text-gray-300 hover:text-primary"
                    to="#"
                  >
                    Marketing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-500 dark:text-gray-400">
                About
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    className="text-base text-gray-600 dark:text-gray-300 hover:text-primary"
                    to="#"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base text-gray-600 dark:text-gray-300 hover:text-primary"
                    to="#"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base text-gray-600 dark:text-gray-300 hover:text-primary"
                    to="#"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-500 dark:text-gray-400">
                Legal
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    className="text-base text-gray-600 dark:text-gray-300 hover:text-primary"
                    to="#"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base text-gray-600 dark:text-gray-300 hover:text-primary"
                    to="#"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border-light dark:border-border-dark text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 ServicePlatform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServiceDetailsPage;
