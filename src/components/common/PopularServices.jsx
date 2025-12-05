// src/components/common/PopularServices.jsx
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PopularServices({ services, loading }) {
  const navigate = useNavigate();

  return (
    <section className="pt-40 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">
            Popular Services
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Explore our most requested services.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-slate-500 py-10">
              Loading popular services...
            </div>
          ) : services.length === 0 ? (
            <div className="col-span-full text-center text-slate-500 py-10">
              No services found.
            </div>
          ) : (
            services.map((s) => (
              <div
                key={s.id}
                onClick={() => navigate(`/services/${s.id}`)}
                className="group relative aspect-[5/6] overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <img
                  src={s.images?.[0]?.url || "https://via.placeholder.com/400"}
                  alt={s.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-0 p-5 w-full">
                  <h3 className="text-white font-bold text-xl mb-1">{s.name}</h3>
                  <p className="text-slate-300 text-sm flex justify-between items-center">
                    <span>From ${s.price}</span>
                    <ArrowRight className="w-4 h-4" />
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}