import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar.jsx";
import { getAllDocs } from "../../utils/firebaseHelpers.js";
import RecommendationSection from "../../components/Clients/RecommendationSection.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { Search, Filter, Sparkles } from "lucide-react";
import ServiceCard from "../../components/common/ServiceCard.jsx"; 
import Footer from "../../components/layout/Footer.jsx"; 

export default function Services() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { user } = useAuth();

  useEffect(() => {
    Promise.all([getAllDocs("services"), getAllDocs("categories")])
      .then(([svc, cat]) => {
        const catMap = Object.fromEntries(cat.map(c => [c.id, c.name]));
        setServices(svc.map(s => ({ ...s, _catName: catMap[s.categoryId || s.category] || "" })));
        setCategories(cat);
      })
      .catch(() => setError("Failed to load services."))
      .finally(() => setLoading(false));
  }, []);

  const filteredServices = services.filter(s => 
    s.name?.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (selectedCategory === "all" || [s.categoryId, s.category].includes(selectedCategory))
  );

  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
      <Navbar />

      <main className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto pt-12 flex-1">
        {user?.uid && <div className="mb-20"><RecommendationSection userId={user.uid} /></div>}

        <header className="mb-12 mt-5 text-center">
          <div className="relative inline-block mb-3">
             <h1 className="text-3xl md:text-4xl font-black tracking-tight">Explore <span className="text-blue-600">Services</span></h1>
             <Sparkles size={18} className="absolute -top-3 -right-5 text-yellow-400" fill="currentColor" />
          </div>
          <p className="text-sm text-slate-500 max-w-lg mx-auto font-medium mb-8">Book trusted professionals in just a few clicks.</p>

            {/* Control Bar */}
          <div className="mt-8 p-2 bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl shadow-blue-100/50 rounded-2xl flex flex-col sm:flex-row gap-3 items-center justify-between transform transition-all hover:shadow-2xl hover:shadow-blue-100/50">
            
            {/* Search - Blue Focus */}
            <div className="relative w-full sm:w-2/3 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="What are you looking for?"
                className="block w-full pl-9 pr-3 py-2 bg-slate-50 border-transparent focus:bg-white text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder:text-slate-400 font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter - Cyan Focus */}
            <div className="relative w-full sm:w-1/3 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
              </div>
              <select
                className="block w-full pl-9 pr-8 py-2 bg-slate-50 border-transparent focus:bg-white text-slate-700 text-sm rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 font-semibold cursor-pointer appearance-none"
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
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-3 w-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </header>

        {loading ? <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div></div> : 
         error ? <p className="text-center text-red-500 font-bold text-sm py-20">{error}</p> : 
         filteredServices.length === 0 ? <p className="text-center text-slate-400 font-medium text-sm py-20">No services found.</p> :
          <section className="grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-20">
            {filteredServices.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </section>
        }
        
      </main>

      {/* Footer  */}
      <Footer />
    </div>
  );
}