import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar.jsx";
import Footer from "../../components/layout/Footer.jsx";

const steps = [
  { title: "Sign up or log in", description: "Create your account or sign in with your existing credentials to personalize your experience." },
  { title: "Explore services", description: "Browse curated categories and find vetted professionals who match your exact needs." },
  { title: "Share booking details", description: "Enter the location, schedule, and preferences so providers know exactly what to deliver." },
  { title: "Get confirmed", description: "Sit tight while we notify the provider and send you real-time updates on approval." },
  { title: "Track and enjoy", description: "Manage every appointment from your dashboard and focus on what matters most." },
];

export default function HowItWorks() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-background-dark dark:text-white flex flex-col">
      <Navbar />
      <main className="flex-1 w-full">
        <section className="relative overflow-hidden">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }} className="bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-blue-900/40 dark:via-slate-900 dark:to-blue-800/30">
            <div className="max-w-5xl mx-auto px-6 sm:px-8 py-20 flex flex-col items-center text-center gap-6">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-4">
                <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold">The Enjez Journey</p>
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 dark:text-white">How Enjez Works</h1>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Book any service in a few simple steps. Transparent, fast, and tailored to your schedule.</p>
              </motion.div>
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex items-center justify-center gap-3 mt-4">
                <button onClick={() => navigate("/services")} className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-lg shadow-blue-600/20 transition-transform hover:-translate-y-0.5">
                  Get Started <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </motion.div>
            </div>
            <div className="pointer-events-none absolute inset-0">
              <motion.span className="absolute -top-10 right-12 size-48 bg-blue-200/50 rounded-full blur-3xl" animate={{ y: [0, 20, 0] }} transition={{ duration: 6, repeat: Infinity }} />
              <motion.span className="absolute bottom-0 left-8 size-60 bg-blue-300/40 rounded-full blur-3xl" animate={{ y: [0, -15, 0] }} transition={{ duration: 7, repeat: Infinity }} />
            </div>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-6 sm:px-8 py-16 space-y-16">
          <div className="text-center">
            <p className="text-blue-600 font-semibold uppercase tracking-[0.3em]">From start to service</p>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4 text-gray-900 dark:text-white">Your step-by-step path</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Each milestone is designed to keep you informed and confident.</p>
          </div>
          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div key={step.title} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}
                initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.15 }} viewport={{ once: true, amount: 0.3 }}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-blue-600 font-semibold">
                    <span className="inline-flex size-12 rounded-2xl bg-blue-100 text-blue-600 text-lg font-bold items-center justify-center">{i + 1}</span>
                    <span className="uppercase tracking-wide text-xs">Step {i + 1}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
                <motion.div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-blue-900/30 border border-blue-100/60 dark:border-slate-800 shadow-lg min-h-[220px] flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 + i * 0.05 }} viewport={{ once: true }}>
                  <div className="text-center px-6">
                    <p className="text-sm uppercase tracking-[0.2em] text-blue-500 mb-2">Preview</p>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">{step.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Visual walkthrough of the step in your dashboard.</p>
                  </div>
                  <motion.span className="absolute -bottom-10 -right-6 size-40 rounded-full bg-blue-200/50 blur-3xl" animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.1, 1] }} transition={{ duration: 5, repeat: Infinity }} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="px-6 sm:px-8 pb-16">
          <motion.div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white p-10 sm:p-14 text-center shadow-xl"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h3 className="text-3xl font-bold">Ready to get started?</h3>
            <p className="mt-4 text-blue-50 max-w-2xl mx-auto">Tap into trusted professionals across every category. Book in minutes and track every detail with Enjez.</p>
            <button onClick={() => navigate("/services")} className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-semibold rounded-2xl shadow-md transition-transform hover:scale-[1.02]">
              Explore Services <span className="material-symbols-outlined text-lg">north_east</span>
            </button>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
