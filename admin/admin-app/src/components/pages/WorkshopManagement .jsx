import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Calendar,
  IndianRupee,
  Users,
} from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "../../utilites/axios";

export default function WorkshopManagement() {
  const token = localStorage.getItem("adminToken");

  /* ---------------- WORKSHOPS ---------------- */
  const [workshops, setWorkshops] = useState([]);
  const [selectedWorkshopId, setSelectedWorkshopId] = useState("all");

  /* ---------------- REGISTRATIONS (TEMP / API LATER) ---------------- */
  const [registrations] = useState([
    {
      id: 1,
      name: "Chaitanya Khotele",
      email: "ckhotele01@gmail.com",
      workshopId: 1,
      amount: 1000,
      status: "Success",
    },
    {
      id: 2,
      name: "Umang Kolhe",
      email: "umangkolhe@gmail.com",
      workshopId: 1,
      amount: 200,
      status: "Success",
    },
  ]);

  /* ---------------- MODAL ---------------- */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState(null);

  const { register, handleSubmit, reset, setValue } = useForm();

  /* ---------------- FETCH WORKSHOPS ---------------- */
  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/workshops", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWorkshops(res.data);
    } catch (err) {
      console.error("Failed to load workshops");
    }
  };

  /* ---------------- OPEN MODAL ---------------- */
  const openModal = (workshop = null) => {
    if (workshop) {
      setEditingWorkshop(workshop);
      setValue("title", workshop.title);
      setValue("price", workshop.price);
      setValue("date1", workshop.availableDates?.[0]?.split("T")[0]);
      setValue("date2", workshop.availableDates?.[1]?.split("T")[0]);
      setValue("status", workshop.status);
    } else {
      setEditingWorkshop(null);
      reset({
        title: "",
        price: "",
        date1: "",
        date2: "",
        status: "Active",
      });
    }
    setIsModalOpen(true);
  };

  /* ---------------- SUBMIT (CREATE / UPDATE) ---------------- */
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("availableDates", JSON.stringify([data.date1, data.date2]));
    formData.append("status", data.status);
    if (data.image?.[0]) formData.append("image", data.image[0]);

    try {
      if (editingWorkshop) {
        await axios.put(
          `http://localhost:5000/api/admin/workshops/${editingWorkshop._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/admin/workshops",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      setIsModalOpen(false);
      fetchWorkshops();
    } catch {
      alert("Workshop save failed");
    }
  };

  /* ---------------- DELETE ---------------- */
  const deleteWorkshop = async (id) => {
    if (!window.confirm("Delete this workshop?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/workshops/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchWorkshops();
    } catch {
      alert("Delete failed");
    }
  };

  /* ---------------- FILTER REGISTRATIONS ---------------- */
  const filteredRegistrations = useMemo(() => {
    if (selectedWorkshopId === "all") return registrations;
    return registrations.filter(
      (r) => r.workshopId === Number(selectedWorkshopId)
    );
  }, [selectedWorkshopId, registrations]);

  /* ---------------- REVENUE ---------------- */
  const totalRevenue = useMemo(
    () =>
      filteredRegistrations
        .filter((r) => r.status === "Success")
        .reduce((sum, r) => sum + r.amount, 0),
    [filteredRegistrations]
  );

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Workshop Management</h2>
          <p className="text-slate-500 text-sm">
            Manage workshops and track revenue
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl"
        >
          <Plus size={18} /> Add Workshop
        </button>
      </div>

      {/* SELECT + METRICS */}
      <div className="flex items-center gap-4">
        <select
          value={selectedWorkshopId}
          onChange={(e) => setSelectedWorkshopId(e.target.value)}
          className="px-4 py-2 border rounded-xl"
        >
          <option value="all">All Workshops</option>
          {workshops.map((w) => (
            <option key={w._id} value={w.id}>
              {w.title}
            </option>
          ))}
        </select>

        <RevenueCard
          icon={<IndianRupee size={18} />}
          label="Total Revenue"
          value={`₹${totalRevenue}`}
        />
        <RevenueCard
          icon={<Users size={18} />}
          label="Registrations"
          value={filteredRegistrations.length}
        />
      </div>

      {/* WORKSHOPS TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-4">Workshop</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Dates</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {workshops.map((w) => (
              <tr key={w._id}>
                <td className="px-6 py-4 font-semibold">{w.title}</td>
                <td className="px-6 py-4">₹{w.price}</td>
                <td className="px-6 py-4">
                  {w.availableDates
                    ?.map((d) => new Date(d).toLocaleDateString())
                    .join(" & ")}
                </td>
                <td className="px-6 py-4">{w.status}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => openModal(w)}
                    className="p-2 text-blue-600"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => deleteWorkshop(w._id)}
                    className="p-2 text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                {...register("title")}
                placeholder="Title"
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                {...register("price")}
                placeholder="Price"
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                {...register("date1")}
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                {...register("date2")}
                className="w-full p-2 border rounded"
              />
              <label className="block text-sm font-semibold text-slate-700">
                Workshop Image
              </label>
              <input type="file" {...register("image")} />
              <select
                {...register("status")}
                className="w-full p-2 border rounded"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 border rounded p-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white rounded p-2"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- SMALL COMPONENT ---------------- */

function RevenueCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 bg-white border rounded-xl px-4 py-3">
      <div className="text-blue-600">{icon}</div>
      <div>
        <p className="text-xs text-slate-500 font-semibold">{label}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );
}
