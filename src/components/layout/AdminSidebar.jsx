// src/components/layout/AdminSidebar.jsx
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200">
        <img src={logo} alt="Enjez logo" className="h-8 w-8 object-contain" />
        <h1 className="text-xl font-bold text-slate-900">Enjez</h1>
      </div>

      <div className="flex-1 flex flex-col justify-between px-3 py-4">
        {/* main nav */}
        <nav className="flex flex-col gap-1">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <span className="material-symbols-outlined text-2xl">
              dashboard
            </span>
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/bookings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <span className="material-symbols-outlined text-2xl">
              calendar_month
            </span>
            Bookings
          </NavLink>

          <NavLink
            to="/admin/clients"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <span className="material-symbols-outlined text-2xl">group</span>
            Clients
          </NavLink>

          <NavLink
            to="/admin/services"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <span className="material-symbols-outlined text-2xl">work</span>
            Services
          </NavLink>

          <NavLink
            to="/admin/notifications"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <span className="material-symbols-outlined text-2xl">
              notifications
            </span>
            Notifications
          </NavLink>

          <NavLink
            to="/admin/reports"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <span className="material-symbols-outlined text-2xl">
              monitoring
            </span>
            Reports
          </NavLink>
        </nav>

        {/* bottom nav */}
        <div className="flex flex-col gap-1 pb-2">
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <span className="material-symbols-outlined text-2xl">
              settings
            </span>
            Settings
          </NavLink>

          <Link
            to="/login"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-blue-50 hover:text-blue-600"
          >
            <span className="material-symbols-outlined text-2xl">logout</span>
            Logout
          </Link>
        </div>
      </div>
    </aside>
  );
}
