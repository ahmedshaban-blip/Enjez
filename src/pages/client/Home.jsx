import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import useBookingViewedNotifier from "../../hooks/useBookingViewedNotifier.js";
import { getAllServices } from "../../utils/firebaseHelpers.js";
import { Search, ArrowRight, Star, ShieldCheck, Clock } from "lucide-react";
import Footer from "../../components/layout/Footer.jsx";
import PopularServices from "../../components/common/PopularServices.jsx";

export default function Home() {
  const { currentUser } = useAuth();
  useBookingViewedNotifier(currentUser?.uid);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [featuredServices, setFeaturedServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    setLoadingServices(true);
    getAllServices()
      .then((data) => {
        setFeaturedServices(data.slice(0, 5));
      })
      .catch(console.error)
      .finally(() => setLoadingServices(false));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/services?search=${searchTerm}`);
  };

  const features = [
    { Icon: ShieldCheck, title: "Verified Professionals", color: "blue", rotate: "rotate-3", desc: "Every pro is screened and rated." },
    { Icon: Clock, title: "Save Time", color: "purple", rotate: "-rotate-3", desc: "Book in seconds. We handle the rest." },
    { Icon: Star, title: "Satisfaction Guaranteed", color: "emerald", rotate: "rotate-3", desc: "Committed to your happiness." },
  ];

  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        {/* --- Hero Section --- */}
        <div className="relative bg-slate-900">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop"
              alt="Bg"
              className="h-full w-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-44 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
              <span className="block">Find the perfect</span>
              <span className="block text-blue-500">professional for you</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 font-medium mb-10">
              Get your to-do list done with trusted professionals. From home cleaning to repairs, we've got you covered.
            </p>

            <div className="flex justify-center gap-4 mb-12">
              <button onClick={() => navigate('/services')} className="px-8 py-3 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg transition-all">
                Book a Service
              </button>
              <button onClick={() => navigate('/how-it-works')} className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white font-bold hover:bg-white/20 border border-white/20 transition-all">
                How it works
              </button>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 px-4 z-20">
            <div className="mx-auto max-w-3xl bg-white rounded-2xl shadow-2xl pr-4 py-1 border border-slate-100 text-left">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <div className="flex-1 flex items-center px-4 py-2">
                  <Search className="w-5 h-5 text-blue-500 mr-3 mt-4" />
                  <div className="flex-1">
                    <label className="block text-xs mb-2 font-bold text-slate-500 uppercase">Service</label>
                    <input
                      type="text"
                      placeholder="What help do you need?"
                      className="w-full text-base font-bold text-slate-900 placeholder:text-slate-300 outline-none mb-2"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" className="h-14 w-14 bg-slate-900 hover:bg-blue-600 text-white rounded-xl flex items-center justify-center transition-colors shadow-md">
                  <ArrowRight className="w-6 h-6" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* --- Popular Services --- */}
        <PopularServices services={featuredServices} loading={loadingServices} />

        {/* --- Features --- */}
        <section className="bg-slate-50 py-20 border-y border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">Why Choose Us?</h2>
              <p className="mt-4 text-lg text-slate-600">We make it easy to get things done.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {features.map(({ Icon, title, desc, color, rotate }, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-2xl bg-${color}-100 text-${color}-600 flex items-center justify-center mb-6 ${rotate} hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Testimonials --- */}
        <section className="py-24">
          <div className="mx-auto max-w-4xl px-4">
            <div className="bg-slate-900 rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-20" />

              <div className="relative z-10">
                <div className="flex justify-center gap-1 mb-6">{[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />)}</div>
                <blockquote className="text-2xl font-medium text-white mb-8">"Using Enjez was a game-changer. I found a fantastic designer in minutes and my apartment has never looked better. Highly recommend for anyone with a busy schedule!""</blockquote>
                <div className="flex flex-col items-center">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150" alt="User" className="w-14 h-14 rounded-full border-2 border-slate-700 mb-2" />
                  <div className="text-white font-bold">Sarah Johnson</div>
                  <div className="text-blue-400 text-sm">Marketing Manager</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA --- */}
        <section className="pb-16 text-center ">
          <h2 className="text-3xl font-black text-slate-900 mb-6">Ready to get started?</h2>
          <button onClick={() => navigate('/services')} className="px-8 py-4 rounded-xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition-all">Browse All Services</button>
        </section>
      </main>

      <Footer />
    </div>
  );
}