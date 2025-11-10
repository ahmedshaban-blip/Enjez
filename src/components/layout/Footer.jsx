import logo from "../../assets/logo2.svg";

export default function Footer({ className = "" }) {
  return (
    <footer className={`w-full border-t border-border-light dark:border-border-dark mt-20 ${className}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Enjez logo" className="h-8 w-8 object-contain" />
              <h2 className="text-text-light dark:text-text-dark text-lg font-bold">
                Enjez
              </h2>
            </div>
            <p className="text-sm text-text-light/70 dark:text-text-dark/70">
              Your one-stop platform for booking trusted local services.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-inherit">Company</h3>
            <ul className="space-y-2 text-sm text-inherit/70">
              <li><a href="#" className="hover:opacity-100">About Us</a></li>
              <li><a href="#" className="hover:opacity-100">Careers</a></li>
              <li><a href="#" className="hover:opacity-100">Press</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-inherit">Services</h3>
            <ul className="space-y-2 text-sm text-inherit/70">
              <li><a href="#" className="hover:opacity-100">Home Cleaning</a></li>
              <li><a href="#" className="hover:opacity-100">Lawn Care</a></li>
              <li><a href="#" className="hover:opacity-100">Handyman</a></li>
              <li><a href="#" className="hover:opacity-100">View All</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-inherit">Support</h3>
            <ul className="space-y-2 text-sm text-inherit/70">
              <li><a href="#" className="hover:opacity-100">Help Center</a></li>
              <li><a href="#" className="hover:opacity-100">Contact Us</a></li>
              <li><a href="#" className="hover:opacity-100">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-inherit">Legal</h3>
            <ul className="space-y-2 text-sm text-inherit/70">
              <li><a href="#" className="hover:opacity-100">Terms of Service</a></li>
              <li><a href="#" className="hover:opacity-100">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-current/20 flex flex-col sm:flex-row justify-between items-center text-sm text-inherit/50">
          <p>© 2024 Enjez. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">{/* Social icons */}</div>
        </div>
      </div>
    </footer>
  );
}
