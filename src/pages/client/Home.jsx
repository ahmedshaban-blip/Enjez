import Navbar from "../../components/layout/Navbar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import useBookingViewedNotifier from "../../hooks/useBookingViewedNotifier.js";

export default function Home() {
  const heroStyle = {
    backgroundImage:
      'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAw0irDX_ibvTRay1rtdL37gjx3YIhHR92OE8x-qHE8l5hUhxh5ncxrJQ6R84woxovqFOoC79I34SdZRuXzLN_XKtxO_YfFuS1byXqZO_LoR5icareNUBRfg11wbgjI9BTkBAIZLbGXg1tJqVwgzqmorsh2ftU15REDRN7Sdig2cmh0iWsyt5b76NmnV_MDDXIjtsYwsG4osuNFHS1XarYv7qFiacSiiNlmJ7DkqXWvy523p1Y5eyg1441qh4eYyWB4ZEaDvQlmnnxE")',
  };

  const { currentUser } = useAuth();
  useBookingViewedNotifier(currentUser?.uid);
  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      <main className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Hero */}
        <section className="w-full py-20 sm:py-28 md:py-32">
          <div className="relative @container">
            <div
              className="flex min-h-[480px] flex-col gap-6 rounded-xl bg-cover bg-center bg-no-repeat items-start justify-end px-6 pb-10 @[480px]:px-10 @[768px]:items-center @[768px]:text-center"
              style={heroStyle}
            >
              <div className="flex flex-col gap-4 max-w-2xl">
                <h1 className="text-white text-4xl font-black leading-tight tracking-tight @[480px]:text-5xl @[768px]:text-6xl">
                  Effortless Booking for Any Service You Need
                </h1>
                <h2 className="text-white/90 text-base font-normal leading-normal @[480px]:text-lg">
                  Find and book trusted professionals for everything on your
                  to-do list.
                </h2>
              </div>
              <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-blue-600 text-white text-base font-bold leading-normal tracking-wide hover:bg-blue-700 transition-colors">
                <span className="truncate">Browse Services</span>
              </button>
            </div>
          </div>
        </section>

        {/* Search bar */}
        <section className="w-full -mt-16 sm:-mt-20 md:-mt-24 pb-16">
          <div className="bg-white p-2 rounded-xl shadow-lg border border-slate-200 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {/* Service */}
              <label className="flex flex-col w-full">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-12">
                  <div className="text-slate-500 flex bg-white items-center justify-center pl-4 rounded-l-lg border border-r-0 border-slate-200">
                    <span className="material-symbols-outlined">
                      design_services
                    </span>
                  </div>
                  <input
                    className="flex w-full min-w-0 flex-1 overflow-hidden rounded-lg text-slate-900 focus:outline-0 focus:ring-2 focus:ring-blue-500/40 border bg-white border-slate-200 h-full placeholder:text-slate-400 px-4 rounded-l-none border-l-0 pl-2 text-base"
                    placeholder="What service?"
                  />
                </div>
              </label>

              {/* Location */}
              <label className="flex flex-col w-full">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-12">
                  <div className="text-slate-500 flex bg-white items-center justify-center pl-4 rounded-l-lg border border-r-0 border-slate-200">
                    <span className="material-symbols-outlined">
                      location_on
                    </span>
                  </div>
                  <input
                    className="flex w-full min-w-0 flex-1 overflow-hidden rounded-lg text-slate-900 focus:outline-0 focus:ring-2 focus:ring-blue-500/40 border bg-white border-slate-200 h-full placeholder:text-slate-400 px-4 rounded-l-none border-l-0 pl-2 text-base"
                    placeholder="Location"
                  />
                </div>
              </label>

              {/* Date */}
              <label className="flex flex-col w-full">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-12">
                  <div className="text-slate-500 flex bg-white items-center justify-center pl-4 rounded-l-lg border border-r-0 border-slate-200">
                    <span className="material-symbols-outlined">
                      calendar_month
                    </span>
                  </div>
                  <input
                    type="date"
                    className="flex w-full min-w-0 flex-1 overflow-hidden rounded-lg text-slate-900 focus:outline-0 focus:ring-2 focus:ring-blue-500/40 border bg-white border-slate-200 h-full placeholder:text-slate-400 px-4 rounded-l-none border-l-0 pl-2 text-base"
                  />
                </div>
              </label>
            </div>
          </div>
        </section>

        {/* Explore Services */}
        <section className="w-full py-16">
          <h2 className="text-slate-900 text-3xl font-bold leading-tight tracking-tight text-center px-4 pb-12">
            Explore Our Services
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {/* Home Cleaning */}
            <div className="flex flex-col items-center text-center gap-3 p-4 rounded-xl hover:bg-slate-50 transition-colors">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCxdjTp1eOz0Wk5P1qUmHWO2VWmQABGMM6mmAZyIMrCN83RI63Tr2ygs49g_KHlqbB8WOEHvJhqOK-hjsgWQpbYR590UeBWZzL8y3c8MX44PU1rP_GixBSKZRWHLX3Ekme0i_BEDkUqu2axW-leLMD0kcqVoXlZvQB_P6CPBRke3YEm52yqSwXplxJyldBog1OtmykkRggXMflsXqazb4rj7vIffFknXPmPClr6h1MpllefO3u2ui1yQsIRvjrs5pE-HjBMONvlbsiX")',
                }}
              />
              <p className="text-base font-medium leading-normal">
                Home Cleaning
              </p>
            </div>

            {/* Tutoring */}
            <div className="flex flex-col items-center text-center gap-3 p-4 rounded-xl hover:bg-slate-50 transition-colors">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDCdeq2pvOLGkYmJZuybVXUKBkgmy9CZO9atCNxi7dWaKJop3DoVrg9_sTUCU91JZtbl-mzHL65Bbd-_aNbG_090RfonaJPV1qr3roweuEb8RB-hFKNxegf3NB7MlIDb_2wMvbOUVZGzEo93eDBJEhLICXSX-7CqKiNYjeUrXfbI0GKiACZM_rt8LLug9Vl4-g5EggzXjevyWOiECsi6-mLUulZt96ui_IlGTwBvv6aW-hwFKqPtJWDUkZqN_Q3YmzBrjy3-zpL3kgQ")',
                }}
              />
              <p className="text-base font-medium leading-normal">Tutoring</p>
            </div>

            {/* Handyman */}
            <div className="flex flex-col items-center text-center gap-3 p-4 rounded-xl hover:bg-slate-50 transition-colors">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAvbGTFJGxUYNyjXhlPHOWS6sjOEy6TGN7uZno6HkAZtVzr06eaJQXzoiGNoGVrmTteSkrGoTzHCsZAAaA2Wi7joVp-ApnWPqX8KJvPEkhBIlcNFXkkiSCmGdbj9TQ-v5Fr-KoW99okSJZ7wG_-Ez-T6bSjDuPpvoU84k0De568UKf1ZI3iK9SyLbuMgu7WPvNRRtlTPjETa7Q8lv02Mga4vZWzjuk6hSGGsAVHQDxsSeYLGz_417fnrm-de9IYasvtxLj4hDBcQ9wg")',
                }}
              />
              <p className="text-base font-medium leading-normal">Handyman</p>
            </div>

            {/* Lawn Care */}
            <div className="flex flex-col items-center text-center gap-3 p-4 rounded-xl hover:bg-slate-50 transition-colors">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDG0aPnJ1dHc9qLbRQIXKuKYTc5fWoNuEBW6dBKtgwL5LUSOeKmbKeRntKBVBRBWgysKLKtR3r1D_gNCg8YNoiJRKzK0uWA8kJbPP-zjvh-kCcx0Er3PiY6PWEMyVbZ6E93QN1doCIEJ6aseH1c4V-WlNVpHjexZMKeS7qJjw6egavchTy32HAkmYi0DBmYAZ6_qB1u5x4g5oXdmx84xLwBhN13LmkdooDHm7A4UGUhWmaqPywHts8o9FxdT4BqXSCLq5uDSbQCuIQ_")',
                }}
              />
              <p className="text-base font-medium leading-normal">Lawn Care</p>
            </div>

            {/* Pet Grooming */}
            <div className="flex flex-col items-center text-center gap-3 p-4 rounded-xl hover:bg-slate-50 transition-colors">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBog4oEYfqC7Ib0W_EZHXOAkL9Zv5AIJu9aSrzztpIDdvzbXFMeKaxBUqdiQJ7JnagnasnsgFSfIkaZr0cB21CnNDG9z7-WsHD1iqCiq8eb6fnI-2BN2ahzl7ZzR0FyRW6lHiLEPHZy9UulyJcY35KhFQXHNgp1uQ6yHAy4q5ARms2vBhIurbyAAxiT1hbIsrNfSrtKnR-d-TaCiTvJPWU0cQxt_GsVefqA4O65mmlJYOnvweBo-VHCdVXvtleDyJrVlYoYzfeY6TG6")',
                }}
              />
              <p className="text-base font-medium leading-normal">
                Pet Grooming
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="w-full py-16">
          <h2 className="text-slate-900 text-3xl font-bold leading-tight tracking-tight text-center px-4 pb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-4 p-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600">
                <span className="material-symbols-outlined text-4xl">
                  search
                </span>
              </div>
              <h3 className="text-xl font-bold">1. Find a Service</h3>
              <p className="text-slate-500">
                Browse categories or search for the exact professional you need.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 p-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600">
                <span className="material-symbols-outlined text-4xl">
                  calendar_add_on
                </span>
              </div>
              <h3 className="text-xl font-bold">2. Book with Ease</h3>
              <p className="text-slate-500">
                Select a date and time that works for you and confirm your
                booking instantly.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 p-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600">
                <span className="material-symbols-outlined text-4xl">
                  relax
                </span>
              </div>
              <h3 className="text-xl font-bold">3. Relax &amp; Enjoy</h3>
              <p className="text-slate-500">
                A trusted professional arrives to get the job done right.
                It&apos;s that simple.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="w-full py-16">
          <div className="bg-slate-50 rounded-xl p-8 md:p-12 lg:p-16">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
              <img
                className="w-20 h-20 rounded-full object-cover mb-6"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1coKpBmd4gxF3oL7nR2pB_dvGDEQ7YdV8yNvR3BqFYdZIy21lOxliNXEGKF2vIVKfWFN6M_qRKEPOh99iDIJ2bYZSdYHwAftvawCx3JoOIEyfi8qH2Eq0qKsc7k7Y3H55xlzYmKdglCuHSi9IBNoolql9V9lU7tuYXRPa0GemoK3uHCrfzLoNeoO01Q4zCk0fHJtAzKlKgF8QwN3MayIGjQG9Xp9ca-DriXgjK-b6QjSnhD9vFGyyiZ1mwY5mTjj44rDFMLjX_F0q"
                alt="Happy customer"
              />
              <blockquote className="text-xl md:text-2xl font-medium italic text-slate-800">
                “Using Enjez was a game-changer. I found a fantastic
                cleaner in minutes and my apartment has never looked better.
                Highly recommend for anyone with a busy schedule!”
              </blockquote>
              <p className="mt-6 text-base font-bold text-slate-600">
                Sarah K. - Happy Customer
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full py-16">
          <div className="text-center">
            <h2 className="text-slate-900 text-3xl font-bold leading-tight tracking-tight px-4 pb-4">
              Ready to get started?
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto pb-8">
              Join thousands of happy customers and take the hassle out of your
              to-do list.
            </p>
            <button className="flex mx-auto min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-blue-600 text-white text-base font-bold leading-normal tracking-wide hover:bg-blue-700 transition-colors">
              <span className="truncate">Find Your Pro Today</span>
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-8 border-t border-slate-200 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-blue-600 text-2xl">
                  book_online
                </span>
                <h2 className="text-slate-900 text-lg font-bold">
                  Enjez
                </h2>
              </div>
              <p className="text-sm text-slate-500">
                Your one-stop platform for booking trusted local services.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-slate-900 text-sm">
                Company
              </h3>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-slate-900 text-sm">
                Services
              </h3>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>Home Cleaning</li>
                <li>Lawn Care</li>
                <li>Handyman</li>
                <li>View All</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-slate-900 text-sm">
                Support
              </h3>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>FAQ</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-slate-900 text-sm">Legal</h3>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400">
            <p>© 2025 Enjez. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
