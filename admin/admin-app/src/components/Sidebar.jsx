import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  FileText,
  LogOut,
  ShieldCheck,
} from "lucide-react";
// Assuming you have an Auth Context as per industry standards
// import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  // const { logout } = useAuth();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin/dashboard",
    },
    {
      name: "Workshops",
      icon: <CalendarDays size={20} />,
      path: "/admin/workshops",
    },
    {
      name: "Registrations",
      icon: <Users size={20} />,
      path: "/admin/registrations",
    },
    { name: "Content", icon: <FileText size={20} />, path: "/admin/content" },
  ];

  const handleLogout = async () => {
    // 1. Clear JWT from Secure Cookie or LocalStorage
    // 2. Clear Axios headers
    // 3. Update Auth State
    // await logout();
    console.log("Securely logging out...");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 h-screen sticky top-0 flex flex-col shadow-2xl z-50">
      {/* Branding with Glow Effect */}
      <div className="p-8 flex items-center gap-3">
        <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/30">
          <ShieldCheck size={24} className="text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">
          Admin<span className="text-blue-500">Hub</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4 px-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive
                  ? "text-white"
                  : "hover:bg-slate-800/50 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active Indicator Background */}
                {isActive && (
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl -z-10 shadow-lg shadow-blue-600/20 transition-all duration-200" />
                )}

                <span
                  className={`${
                    isActive
                      ? "text-white"
                      : "group-hover:scale-110 transition-transform"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-medium">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 bg-slate-950/50 backdrop-blur-sm border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="group flex items-center gap-3 p-3 w-full rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 font-medium"
        >
          <LogOut
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
