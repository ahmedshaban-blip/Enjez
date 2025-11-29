import { Link, NavLink } from "react-router-dom";

export default function MobileMenuDrawer({ isOpen, onClose, links, user, onLogout }) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-xl flex flex-col p-4 space-y-4 animate-in slide-in-from-top-5 z-40">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          onClick={onClose}
          className={({ isActive }) =>
            `px-4 py-3 rounded-xl text-base font-bold transition-all ${
              isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}

      <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
        {!user ? (
          <>
            <Link to="/login" onClick={onClose} className="w-full py-3 rounded-xl text-center text-slate-600 font-bold bg-slate-50 hover:bg-slate-100">Log In</Link>
            <Link to="/signup" onClick={onClose} className="w-full py-3 rounded-xl text-center bg-blue-600 text-white font-bold hover:bg-blue-700">Sign Up</Link>
          </>
        ) : (
          <button
            onClick={() => { onLogout(); onClose(); }}
            className="w-full py-3 rounded-xl text-center text-red-600 font-bold bg-red-50 hover:bg-red-100"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}