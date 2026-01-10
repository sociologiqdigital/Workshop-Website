import { useState } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Calendar } from "lucide-react";
import { useForm } from "react-hook-form";

export default function WorkshopManagement() {
  const [workshops, setWorkshops] = useState([
    {
      id: 1,
      title: "React Pro Masterclass",
      price: 49,
      date: "2024-06-15",
      status: "Active",
    },
    {
      id: 2,
      title: "Tailwind CSS UI Design",
      price: 29,
      date: "2024-06-20",
      status: "Inactive",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState(null);

  const { register, handleSubmit, reset, setValue } = useForm();

  const openModal = (workshop = null) => {
    if (workshop) {
      setEditingWorkshop(workshop);
      Object.keys(workshop).forEach((key) => setValue(key, workshop[key]));
    } else {
      setEditingWorkshop(null);
      reset({
        title: "",
        price: "",
        date: new Date().toISOString().split("T")[0],
        status: "Active",
      });
    }
    setIsModalOpen(true);
  };

  const onSubmit = (data) => {
    if (editingWorkshop) {
      setWorkshops(
        workshops.map((w) =>
          w.id === editingWorkshop.id ? { ...data, id: w.id } : w
        )
      );
    } else {
      setWorkshops([...workshops, { ...data, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const deleteWorkshop = (id) => {
    if (window.confirm("Are you sure you want to delete this workshop?")) {
      setWorkshops(workshops.filter((w) => w.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Workshops</h2>
          <p className="text-slate-500 text-sm">
            Manage scheduling and pricing.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg active:scale-95"
        >
          <Plus size={20} /> Add Workshop
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs uppercase tracking-wider font-bold text-slate-500">
                Workshop
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider font-bold text-slate-500">
                Price
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider font-bold text-slate-500">
                Date
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider font-bold text-slate-500">
                Status
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider font-bold text-slate-500 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {workshops.map((w) => (
              <tr key={w.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-800">
                  {w.title}
                </td>
                <td className="px-6 py-4 text-slate-600 font-medium">
                  ₹{w.price}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-slate-400" />
                    {w.date}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ₹{
                      w.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {w.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openModal(w)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteWorkshop(w.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-xl font-bold text-slate-800">
                {editingWorkshop ? "Edit Workshop" : "New Workshop"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-200 rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Workshop Title
                </label>
                <input
                  {...register("title")}
                  required
                  placeholder="e.g. Master React in 30 Days"
                  className="w-full p-2.5 border border-slate-300 rounded-xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    {...register("price")}
                    required
                    className="w-full p-2.5 border border-slate-300 rounded-xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Initial Status
                  </label>
                  <select
                    {...register("status")}
                    className="w-full p-2.5 border border-slate-300 rounded-xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Workshop Date
                </label>
                <input
                  type="date"
                  {...register("date")}
                  required
                  className="w-full p-2.5 border border-slate-300 rounded-xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                >
                  {editingWorkshop ? "Save Changes" : "Create Workshop"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
