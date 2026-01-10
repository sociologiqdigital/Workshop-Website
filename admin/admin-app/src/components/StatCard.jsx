// src/components/StatCard.jsx
const StatCard = ({ title, value, icon, colorClass }) => {
  return (
    <div
      className={`relative overflow-hidden bg-white/60 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-xl transition-all hover:scale-[1.02] hover:shadow-2xl`}
    >
      {/* Decorative Glow */}
      <div
        className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 blur-2xl ${colorClass}`}
      ></div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-slate-800 mt-1">{value}</h3>
        </div>
        <div
          className={`p-3 rounded-xl bg-white shadow-sm border border-slate-100 ${colorClass.replace(
            "bg-",
            "text-"
          )}`}
        >
          {icon}
        </div>
      </div>

      <div className="mt-4 flex items-center text-sm">
        <span className="text-emerald-500 font-semibold">↑ 12%</span>
        <span className="text-slate-400 ml-2">from last month</span>
      </div>
    </div>
  );
};

export default StatCard;
