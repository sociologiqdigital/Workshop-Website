// src/pages/DashboardOverview.jsx
import { Presentation, Users, UserPlus, TrendingUp } from "lucide-react";
import StatCard from "../StatCard";

export default function DashboardOverview() {
  // These values would normally come from an API call (useEffect)
  const stats = [
    {
      title: "Total Workshops",
      value: "24",
      icon: <Presentation size={24} />,
      colorClass: "bg-blue-500",
    },
    {
      title: "Total Registrations",
      value: "1,284",
      icon: <Users size={24} />,
      colorClass: "bg-purple-500",
    },
    {
      title: "Today's Signups",
      value: "+18",
      icon: <UserPlus size={24} />,
      colorClass: "bg-pink-500",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">System Overview</h2>
        <p className="text-slate-500">
          Here is what is happening with your workshops today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions / Recent Activity Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">
            Recent Registrations
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition"
              >
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                  JD
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-slate-500">
                    Registered for "React Pro Workshop"
                  </p>
                </div>
                <span className="text-xs text-slate-400">2 mins ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
