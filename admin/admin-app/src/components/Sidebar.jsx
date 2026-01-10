import {
  LayoutDashboard,
  CalendarDays,
  Users,
  FileText,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
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

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen sticky top-0 flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-slate-800">
        Admin<span className="text-blue-500">Panel</span>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 p-3 w-full text-slate-400 hover:text-red-400 transition-colors">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
