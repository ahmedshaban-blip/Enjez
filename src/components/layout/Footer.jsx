import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo2.svg";
import { getAllServices } from "../../utils/firebaseHelpers.js";

export default function Footer({ className = "" }) {
  const [footerServices, setServices] = useState([]);

  useEffect(() => {
    getAllServices().then(s => setServices(s.slice(0, 4))).catch(console.error);
  }, []);

  const LinkList = ({ title, items }) => (
    <div>
      <h3 className="font-bold mb-4 text-inherit">{title}</h3>
      <ul className="space-y-2 text-sm text-inherit/70">
        {items.map((i, idx) => <li key={idx}><Link to={i.to} className="hover:opacity-100">{i.label}</Link></li>)}
      </ul>
    </div>
  );

  return (
    <footer className={`w-full border-t border-border-light dark:border-border-dark mt-20 ${className}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1 mr-5">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Enjez" className="h-8 w-8 object-contain" />
              <h2 className="text-text-light dark:text-text-dark text-lg font-bold">Enjez</h2>
            </div>
            <p className="text-sm text-text-light/70 dark:text-text-dark/70">Your one-stop platform for booking trusted local services.</p>
          </div>

          <LinkList title="Community" items={[{to:"/",label:"Home"},{to:"/services",label:"Services"},{to:"/how-it-works",label:"How It Works"},{to:"/about",label:"About Us"}]} />

          <div>
            <h3 className="font-bold mb-4 text-inherit">Popular Services</h3>
            <ul className="space-y-2 text-sm text-inherit/70">
              {footerServices.length ? footerServices.map(s => (
                <li key={s.id}><Link to={`/services/${s.id}`} className="hover:opacity-100">{s.name}</Link></li>
              )) : <li><span className="opacity-50">Loading...</span></li>}
              <li><Link to="/services" className="font-medium hover:opacity-100 mt-2 inline-block">View All &rarr;</Link></li>
            </ul>
          </div>

          <LinkList title="Support" items={[{to:"/contact",label:"Contact Us"},{to:"#",label:"Help Center"},{to:"#",label:"FAQ"}]} />
          <LinkList title="Legal" items={[{to:"#",label:"Terms of Service"},{to:"#",label:"Privacy Policy"}]} />
        </div>

        <div className="mt-12 pt-8 border-t border-current/20 flex flex-col sm:flex-row justify-between items-center text-sm text-inherit/50">
          <p>© 2024 Enjez. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}