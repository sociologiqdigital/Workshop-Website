import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Trash2,
  Eye,
  CreditCard,
  Clock,
  Filter,
  ChevronDown,
  Loader2,
} from "lucide-react";
import axios from "../../utilites/axios";

export default function Registrations() {
  const [registrations, setRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/admin/registrations");

      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
        ? res.data.data
        : [];

      setRegistrations(data);
    } catch (err) {
      setError("Failed to load registrations");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- CALCULATIONS ---------------- */
  const statusScoped = useMemo(() => {
    if (statusFilter === "All") return registrations;
    return registrations.filter((r) => r.status === statusFilter);
  }, [registrations, statusFilter]);

  const totalRevenue = useMemo(
    () => statusScoped.reduce((sum, r) => sum + (r.amount || 0), 0),
    [statusScoped]
  );

  const pendingCount = useMemo(
    () => statusScoped.filter((r) => r.status === "Pending").length,
    [statusScoped]
  );

  /* ---------------- FILTER (SEARCH + STATUS) ---------------- */
  const filteredData = useMemo(() => {
    return registrations.filter((r) => {
      const matchesSearch =
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ? true : r.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [registrations, searchTerm, statusFilter]);

  /* ---------------- SELECTION ---------------- */
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredData.map((r) => r._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  /* Clear selection when filters change */
  useEffect(() => {
    setSelectedIds([]);
  }, [searchTerm, statusFilter]);

  /* ---------------- DELETE (OPTIONAL) ---------------- */
  const bulkDelete = async () => {
    if (!window.confirm(`Delete ${selectedIds.length} registrations?`)) return;

    try {
      await axios.post("/admin/registrations/bulk-delete", {
        ids: selectedIds,
      });
      fetchRegistrations();
      setSelectedIds([]);
    } catch {
      alert("Delete failed");
    }
  };

  /* ---------------- LOADING / ERROR ---------------- */
  if (loading) {
    return (
      <div className="flex items-center gap-2 text-slate-500">
        <Loader2 className="animate-spin" size={18} />
        Loading registrations…
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 font-semibold">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard
          icon={<CreditCard size={20} />}
          label="Total Revenue"
          value={`$${totalRevenue}`}
          color="emerald"
        />
        <SummaryCard
          icon={<Clock size={20} />}
          label="Pending Payments"
          value={`${pendingCount} users`}
          color="amber"
        />
      </div>

      {/* ACTION BAR */}
      <div className="flex flex-col md:flex-row justify-between gap-4 bg-white p-4 rounded-2xl border">
        <div className="flex items-center gap-4">
          <SearchInput onChange={setSearchTerm} />

          {selectedIds.length > 0 && (
            <button
              onClick={bulkDelete}
              className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold"
            >
              <Trash2 size={18} /> Delete ({selectedIds.length})
            </button>
          )}
        </div>

        {/* STATUS FILTER */}
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className="flex items-center gap-2 text-slate-600 font-semibold px-4 py-2 border rounded-lg hover:bg-slate-50"
          >
            <Filter size={18} />
            Status: {statusFilter}
            <ChevronDown size={14} />
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg z-10">
              {["All", "Paid", "Pending", "Failed"].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setStatusFilter(status);
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${
                    statusFilter === status
                      ? "font-bold text-blue-600"
                      : "text-slate-600"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={
                    selectedIds.length === filteredData.length &&
                    filteredData.length > 0
                  }
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                User
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredData.map((reg) => (
              <tr key={reg._id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(reg._id)}
                    onChange={() => handleSelectOne(reg._id)}
                  />
                </td>

                <td className="px-6 py-4">
                  <div className="font-bold">{reg.name}</div>
                  <div className="text-xs text-slate-500">{reg.email}</div>
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={reg.status} />
                </td>

                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-blue-600">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredData.length === 0 && (
              <tr>
                <td colSpan="4" className="p-10 text-center text-slate-500">
                  No registrations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatusBadge({ status }) {
  const styles =
    status === "Paid"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Pending"
      ? "bg-amber-100 text-amber-700"
      : "bg-red-100 text-red-700";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles}`}>
      {status}
    </span>
  );
}

function SummaryCard({ icon, label, value, color }) {
  return (
    <div className="bg-white p-4 rounded-2xl border flex items-center gap-4">
      <div className={`bg-${color}-100 text-${color}-600 p-3 rounded-xl`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-500 font-bold uppercase">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function SearchInput({ onChange }) {
  return (
    <div className="relative">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        size={18}
      />
      <input
        type="text"
        placeholder="Search by name or email..."
        className="pl-10 pr-4 py-2 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-64"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
