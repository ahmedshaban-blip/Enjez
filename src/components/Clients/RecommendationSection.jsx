import { useState, useEffect } from "react";
import ServiceCard from "../common/ServiceCard.jsx";
import { getAllDocs, getUserBookings } from "../../utils/firebaseHelpers.js";
import { Sparkles, Heart, TrendingUp } from 'lucide-react';

export default function RecommendationSection({ userId }) {
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setRecommended([]);
            setLoading(false);
            return;
        }

        async function fetchRecommendations() {
            try {
                const [services, categories] = await Promise.all([
                    getAllDocs("services"),
                    getAllDocs("categories"),
                ]);

                const userBookings = await getUserBookings(userId);

                if (!userBookings.length) {
                    setRecommended([]);
                    return;
                }

                const freqMap = {};
                userBookings.forEach((b) => {
                    if (!b.serviceId) return;
                    freqMap[b.serviceId] = (freqMap[b.serviceId] || 0) + 1;
                });

                const sortedServiceIds = Object.entries(freqMap)
                    .sort((a, b) => b[1] - a[1])
                    .map(([id]) => id);

                const sortedServices = services
                    .filter((svc) => sortedServiceIds.includes(svc.id))
                    .sort(
                        (a, b) =>
                            sortedServiceIds.indexOf(a.id) - sortedServiceIds.indexOf(b.id)
                    );

                const servicesWithCategoryName = sortedServices.map((service) => {
                    const category = categories.find((c) => c.id === service.categoryId);

                    return {
                        ...service,
                        categoryName: category ? category.name : "Uncategorized",
                    };
                });

                // Get top 4 instead of 3 to fill the grid nicely if screen is large
                const topServices = servicesWithCategoryName.slice(0, 4);

                setRecommended(topServices);
            } catch (err) {
                console.error("Error in fetchRecommendations:", err);
                setRecommended([]);
            } finally {
                setLoading(false);
            }
        }

        fetchRecommendations();
    }, [userId]);

    if (loading) return null;
    if (!recommended.length) return null;

    return (
        <section className="relative mb-12 group">
            {/* Blue Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-100/50 via-blue-50/50 to-transparent rounded-3xl -z-10 border border-sky-100"></div>
            
            <div className="p-6 sm:p-8 rounded-3xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Sparkles className="w-6 h-6 text-cyan-500 animate-pulse" />
                            <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">
                                Picked Just for You
                            </h2>
                        </div>
                        <p className="text-slate-600 font-medium pl-1">
                            Based on your recent bookings and preferences.
                        </p>
                    </div>

                    <div className="px-4 py-1.5 bg-white/60 backdrop-blur-md border border-white/50 rounded-full shadow-sm">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider">
                            <Heart className="w-3 h-3 fill-blue-600 text-blue-600" />
                            Personalized
                        </span>
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {recommended.map((service) => (
                        <div key={service.id} className="transform hover:-translate-y-1 transition-transform duration-300">
                            <ServiceCard service={service} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}