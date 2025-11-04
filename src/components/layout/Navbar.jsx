import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Navbar() {
  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2">
          <img src={logo} alt="Enjez logo" className="h-9 w-9 object-contain" />
          <span className="text-xl font-bold text-slate-900">Enjez</span>
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `hover:text-blue-600 ${
                isActive ? "text-blue-600 font-semibold" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `hover:text-blue-600 ${
                isActive ? "text-blue-600 font-semibold" : ""
              }`
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/how-it-works"
            className={({ isActive }) =>
              `hover:text-blue-600 ${
                isActive ? "text-blue-600 font-semibold" : ""
              }`
            }
          >
            How It Works
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-blue-600 ${
                isActive ? "text-blue-600 font-semibold" : ""
              }`
            }
          >
            About Us
          </NavLink>
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-2">
          {/* Login: text blue + baby blue background */}
          <Link
            to="/login"
            className="h-10 px-5 rounded-full border border-blue-200 bg-blue-100 text-blue-600 text-sm font-semibold flex items-center justify-center hover:bg-blue-200 transition-colors"
          >
            Log In
          </Link>

          {/* Sign up: white text + blue background */}
          <Link
            to="/signup"
            className="h-10 px-5 rounded-full bg-blue-600 text-white text-sm font-semibold flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
