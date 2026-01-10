import { useState } from "react";
import {
  Download,
  Search,
  CheckCircle,
  Clock,
  Trash2,
  Eye,
  X,
  CreditCard,
  Filter,
  ChevronDown,
} from "lucide-react";

export default function Registrations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReg, setSelectedReg] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]); // For Bulk Actions

  const [registrations, setRegistrations] = useState([
    {
      id: "TXN-9901",
      name: "Arjun Mehta",
      email: "arjun@example.com",
      workshop: "React Pro Masterclass",
      status: "Paid",
      date: "2024-05-10",
      amount: 49,
    },
    {
      id: "TXN-9902",
      name: "Sarah Chen",
      email: "sarah.c@example.com",
      workshop: "Tailwind CSS UI",
      status: "Pending",
      date: "2024-05-11",
      amount: 29,
    },
    {
      id: "TXN-9903",
      name: "Mike Ross",
      email: "mike@pearson.com",
      workshop: "React Pro Masterclass",
      status: "Paid",
      date: "2024-05-12",
      amount: 49,
    },
  ]);

  // --- Calculations ---
  const totalRevenue = registrations
    .filter((r) => r.status === "Paid")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const pendingCount = registrations.filter(
    (r) => r.status === "Pending"
  ).length;

  // --- Handlers ---
  const handleSelectAll = (e) => {
    if (e.target.checked) setSelectedIds(registrations.map((r) => r.id));
    else setSelectedIds([]);
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const bulkDelete = () => {
    if (window.confirm(`Delete ${selectedIds.length} registrations?`)) {
      setRegistrations((prev) =>
        prev.filter((r) => !selectedIds.includes(r.id))
      );
      setSelectedIds([]);
    }
  };

  const togglePaymentStatus = (id) => {
    setRegistrations((prev) =>
      prev.map((reg) =>
        reg.id === id
          ? { ...reg, status: reg.status === "Paid" ? "Pending" : "Paid" }
          : reg
      )
    );
  };

  const filteredData = registrations.filter(
    (reg) =>
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 1. Quick Info Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4">
          <div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl">
            <CreditCard size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase">
              Total Revenue
            </p>
            <p className="text-xl font-bold">${totalRevenue}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4">
          <div className="bg-amber-100 text-amber-600 p-3 rounded-xl">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase">
              Pending Payments
            </p>
            <p className="text-xl font-bold">{pendingCount} users</p>
          </div>
        </div>
      </div>

      {/* 2. Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Filter by name..."
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-64"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {selectedIds.length > 0 && (
            <button
              onClick={bulkDelete}
              className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-100 transition"
            >
              <Trash2 size={18} /> Delete ({selectedIds.length})
            </button>
          )}
        </div>
        <button
          onClick={() => {}}
          className="flex items-center gap-2 text-slate-600 font-semibold px-4 py-2 border rounded-lg hover:bg-slate-50"
        >
          <Filter size={18} /> Status: All <ChevronDown size={14} />
        </button>
      </div>

      {/* 3. Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedIds.length === registrations.length}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
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
          <tbody className="divide-y divide-slate-100">
            {filteredData.map((reg) => (
              <tr
                key={reg.id}
                className={`${
                  selectedIds.includes(reg.id) ? "bg-blue-50/50" : ""
                } hover:bg-slate-50/50 transition-colors`}
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(reg.id)}
                    onChange={() => handleSelectOne(reg.id)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-800">{reg.name}</div>
                  <div className="text-xs text-slate-500">{reg.email}</div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => togglePaymentStatus(reg.id)}
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      reg.status === "Paid"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {reg.status}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setSelectedReg(reg)}
                    className="p-2 text-slate-400 hover:text-blue-600"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
