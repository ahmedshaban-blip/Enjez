import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import useBookingViewedNotifier from "../../hooks/useBookingViewedNotifier.js";
import { Search, MapPin, Calendar, ArrowRight, Star, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import Logo from "../../assets/logo2.svg";
export default function Home() {
  const { currentUser } = useAuth();
  useBookingViewedNotifier(currentUser?.uid);
  const navigate = useNavigate();

  // State for search (optional visual functionality)
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/services?search=${searchTerm}`);
  };

  const categories = [
    { name: "Home Cleaning", img: "https://scrubnbubbles.com/wp-content/uploads/2022/05/cleaning-service.jpeg" },
    { name: "Plumbing", img: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?q=80&w=1000&auto=format&fit=crop" },
    { name: "Electrical", img: "https://swiftcare.pk/wp-content/uploads/2021/12/8-Benefits-of-Electrical-Contractors-for-Your-Company-Featured.jpg" },
    { name: "Moving", img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1000&auto=format&fit=crop" },
    { name: "Painting", img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000&auto=format&fit=crop" },
  ];

  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow">

        {/* --- Hero Section --- */}
        <div className="relative bg-slate-900 pb-32">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop"
              alt="Background"
              className="h-full w-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32 text-center">
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Find the perfect</span>
              <span className="block text-blue-500">professional for you</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
              Get your to-do list done with trusted professionals. From home cleaning to repairs, we've got you covered.
            </p>

            <div className="mt-10 flex justify-center gap-4">
              <button
                onClick={() => navigate('/services')}
                className="px-8 py-3.5 rounded-full bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30"
              >
                Book a Service
              </button>
              <button
                onClick={() => navigate('/how-it-works')}
                className="px-8 py-3.5 rounded-full bg-white/10 backdrop-blur-sm text-white font-bold text-lg hover:bg-white/20 transition-all border border-white/20"
              >
                How it works
              </button>
            </div>
          </div>
        </div>

        {/* --- Floating Search Bar --- */}
        <div className="relative -mt-24 px-4 sm:px-6 lg:px-8 z-20">
          <div className="mx-auto max-w-4xl bg-white rounded-2xl shadow-2xl shadow-slate-900/10 p-2 sm:p-3 border border-slate-100">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">

              {/* Search Input */}
              <div className="flex-1 flex items-center px-4 py-2">
                <Search className="w-5 h-5 text-blue-500 mr-3" />
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">Service</label>
                  <input
                    type="text"
                    placeholder="What help do you need?"
                    className="w-full text-slate-900 font-semibold placeholder:text-slate-300 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Location Input */}
              <div className="flex-1 flex items-center px-4 py-2">
                <MapPin className="w-5 h-5 text-blue-500 mr-3" />
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">Location</label>
                  <input type="text" placeholder="Cairo, Egypt" className="w-full text-slate-900 font-semibold placeholder:text-slate-300 focus:outline-none" />
                </div>
              </div>

              {/* Search Button */}
              <div className="p-2">
                <button type="submit" className="w-full md:w-auto h-full aspect-square bg-slate-900 hover:bg-blue-600 text-white rounded-xl flex items-center justify-center transition-colors">
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* --- Services Categories --- */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Popular Services</h2>
              <p className="mt-4 text-lg text-slate-600">Explore our most requested services by customers like you.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate('/services')}
                  className="group relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <img src={cat.img} alt={cat.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg">{cat.name}</h3>
                    <p className="text-slate-300 text-sm flex items-center gap-1 group-hover:text-blue-400 transition-colors">
                      Book Now <ArrowRight className="w-3 h-3" />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Features / How it works --- */}
        <section className="bg-slate-50 py-20 sm:py-24 border-y border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Why Choose Us?</h2>
              <p className="mt-4 text-lg text-slate-600">We make it easy to get things done.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6 rotate-3 hover:rotate-6 transition-transform">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Verified Professionals</h3>
                <p className="text-slate-600 leading-relaxed">Every pro on our platform is screened, background-checked, and rated by customers.</p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 mb-6 -rotate-3 hover:-rotate-6 transition-transform">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Save Time</h3>
                <p className="text-slate-600 leading-relaxed">Book a service in less than 60 seconds. We handle the scheduling so you can relax.</p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6 rotate-3 hover:rotate-6 transition-transform">
                  <Star className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Satisfaction Guaranteed</h3>
                <p className="text-slate-600 leading-relaxed">We are committed to your happiness. If you are not satisfied, we will make it right.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Testimonial Section --- */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900 rounded-3xl p-8 md:p-16 relative overflow-hidden text-center shadow-2xl">
              {/* Decorative Blobs */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />)}
                  </div>
                </div>
                <blockquote className="text-2xl md:text-3xl font-medium text-white leading-relaxed mb-8">
                  "Using Enjez was a game-changer. I found a fantastic cleaner in minutes and my apartment has never looked better. Highly recommend for anyone with a busy schedule!"
                </blockquote>
                <div className="flex flex-col items-center">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" alt="User" className="w-16 h-16 rounded-full border-4 border-slate-700 object-cover mb-3" />
                  <div className="text-white font-bold text-lg">Sarah Johnson</div>
                  <div className="text-blue-400 text-sm">Marketing Manager</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="pb-20">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl mb-6">Ready to get started?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/services')} className="px-8 py-4 rounded-xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 hover:shadow-blue-500/30 transition-all">
                Browse All Services
              </button>

            </div>
          </div>
        </section>

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
                <li><Link to="/about" className="hover:text-blue-600 transition-colors">About</Link></li>
                <li><Link to="/services" className="hover:text-blue-600 transition-colors">Services</Link></li>
                <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
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
  );
}