// src/pages/client/Services.jsx
import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar.jsx";
import ServiceCard from "../../components/common/ServiceCard.jsx";
import { getAllDocs } from "../../utils/firebaseHelpers.js";
import RecommendationSection from "../../components/Clients/RecommendationSection.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { Search, Filter, Sparkles } from "lucide-react"; 

export default function Services() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { user } = useAuth();

  useEffect(() => {
    async function load() {
      try {
        const [svc, cat] = await Promise.all([
          getAllDocs("services"),
          getAllDocs("categories")
        ]);

        const categoryMap = Object.fromEntries(
          (cat || []).map(c => [c.id, c.name || ""])
        );

        const normalized = (svc || []).map(s => ({
          ...s,
          _categoryId: s.categoryId || s.category || "",
          _categoryName: categoryMap[s.categoryId] || s.category || ""
        }));

        setServices(normalized);
        setCategories(cat || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load services. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredServices = services.filter((service) => {
    const name = (service.name || "").toLowerCase();
    if (!name.includes(searchTerm.toLowerCase())) return false;
    if (selectedCategory === "all") return true;

    return [
      service._categoryId,
      service._categoryName,
      service.categoryId,
      service.category
    ]
      .filter(Boolean)
      .map(String)
      .includes(selectedCategory);
  });

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col relative overflow-x-hidden">
      
      {/* Blue Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <Navbar />

      <main className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto py-10 flex-1">
        
        {user && (user.id || user.uid) && (
          <div className="mb-12 animate-fade-in-up">
             <RecommendationSection userId={user.id || user.uid} />
          </div>
        )}

        <header className="mb-12 text-center sm:text-left space-y-6">
          <div className="relative inline-block">
             <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-2">
                Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Professional</span> Services
             </h1>
             <div className="absolute -top-6 -right-8 hidden sm:block text-yellow-400 animate-bounce">
                <Sparkles size={32} fill="currentColor" />
             </div>
          </div>
          
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Find trusted experts. High quality, transparent pricing.
          </p>

          {/* Control Bar */}
          <div className="mt-8 p-4 bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl shadow-blue-100/50 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between transform transition-all hover:shadow-2xl hover:shadow-blue-100/50">
            
            {/* Search - Blue Focus */}
            <div className="relative w-full sm:w-2/3 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="What are you looking for?"
                className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border-transparent focus:bg-white text-slate-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder:text-slate-400 font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter - Cyan Focus */}
            <div className="relative w-full sm:w-1/3 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
              </div>
              <select
                className="block w-full pl-11 pr-10 py-3.5 bg-slate-50 border-transparent focus:bg-white text-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 font-semibold cursor-pointer appearance-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name || "Unnamed Category"}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-20 h-20">
               <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full opacity-50"></div>
               <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="mt-4 text-blue-700 font-medium animate-pulse">Finding best services...</p>
          </div>
        ) : error ? (
             <p>{error}</p>
        ) : filteredServices.length === 0 ? (
             <p>No Services</p>
        ) : (
          <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-20">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}