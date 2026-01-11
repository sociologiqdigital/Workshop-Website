import { useEffect, useState } from "react";
import { Presentation, Users, UserPlus } from "lucide-react";
import StatCard from "../StatCard";
import axios from "../../utilites/axios"; // axios instance with JWT

export default function DashboardOverview() {
  const [stats, setStats] = useState(null);
  const [recentRegs, setRecentRegs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ---------------- FETCH DASHBOARD DATA ---------------- */
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // parallel API calls
      const [statsRes, recentRes] = await Promise.all([
        axios.get("/admin/stats"),
        axios.get("/admin/registrations"),
      ]);

      setStats(statsRes.data);
      setRecentRegs(recentRes.data?.data?.slice(0, 5) ?? []);
    } catch (err) {
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- LOADING STATE ---------------- */
  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">System Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 bg-slate-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  /* ---------------- ERROR STATE ---------------- */
  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-6 rounded-xl font-semibold">
        {error}
      </div>
    );
  }

  /* ---------------- STATS CONFIG ---------------- */
  const statCards = [
    {
      title: "Total Workshops",
      value: stats.totalWorkshops,
      icon: <Presentation size={24} />,
      colorClass: "bg-blue-500",
    },
    {
      title: "Total Registrations",
      value: stats.totalRegistrations,
      icon: <Users size={24} />,
      colorClass: "bg-purple-500",
    },
    {
      title: "Total Inquiries",
      value: stats.totalInquiries,
      icon: <UserPlus size={24} />,
      colorClass: "bg-pink-500",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">System Overview</h2>
        <p className="text-slate-500">
          Here is what is happening with your workshops today.
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* RECENT REGISTRATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">
            Recent Registrations
          </h3>

          {recentRegs.length === 0 ? (
            <p className="text-slate-500 text-sm">No recent registrations</p>
          ) : (
            <div className="space-y-4">
              {recentRegs.map((reg) => (
                <div
                  key={reg._id}
                  className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition"
                >
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                    {reg.name?.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{reg.name}</p>
                    <p className="text-xs text-slate-500">
                      Registered for "{reg.workshopTitle}"
                    </p>
                  </div>
                  <span className="text-xs text-slate-400">
                    {new Date(reg.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
