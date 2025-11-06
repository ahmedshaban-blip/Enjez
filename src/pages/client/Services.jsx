// Services page with search and category filtering
import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar.jsx";
import ServiceCard from "../../components/common/ServiceCard.jsx";
import { getAllDocs } from "../../utils/firebaseHelpers.js";

export default function Services() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    async function load() {
      try {
        // Fetch both collections in parallel
        const [svc, cat] = await Promise.all([
          getAllDocs("services"),
          getAllDocs("categories")
        ]);

        // Map category IDs to names
        const categoryMap = Object.fromEntries(
          (cat || []).map(c => [c.id, c.name || ""])
        );

        // Normalize services with category info
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

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by service name..."
            className="mt-5 w-full sm:w-1/2 border rounded p-2 mr-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Category Filter */}
          <select
            className="mt-2 w-full sm:w-1/6 border rounded p-2"
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
        </header>

        {/* Loading / Error / Empty / Grid */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <p className="text-center text-red-600 text-sm sm:text-base">{error}</p>
        ) : filteredServices.length === 0 ? (
          <p className="text-center text-slate-500 text-sm sm:text-base">
            No services found.
          </p>
        ) : (
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}