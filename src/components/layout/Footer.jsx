import logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-100 dark:bg-neutral-900 border-t border-border-light dark:border-border-dark mt-20">
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
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-text-light/70 dark:text-text-dark/70">
              <li><a href="#" className="hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary">Careers</a></li>
              <li><a href="#" className="hover:text-primary">Press</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-text-light/70 dark:text-text-dark/70">
              <li><a href="#" className="hover:text-primary">Home Cleaning</a></li>
              <li><a href="#" className="hover:text-primary">Lawn Care</a></li>
              <li><a href="#" className="hover:text-primary">Handyman</a></li>
              <li><a href="#" className="hover:text-primary">View All</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-text-light/70 dark:text-text-dark/70">
              <li><a href="#" className="hover:text-primary">Help Center</a></li>
              <li><a href="#" className="hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-text-light/70 dark:text-text-dark/70">
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-light dark:border-border-dark flex flex-col sm:flex-row justify-between items-center text-sm text-text-light/50 dark:text-text-dark/50">
          <p>© 2024 Enjez. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">{/* Social icons */}</div>
        </div>
      </div>
    </footer>
  );
}
