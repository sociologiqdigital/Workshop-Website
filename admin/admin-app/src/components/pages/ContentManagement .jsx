import { useState } from "react";
import {
  FileText,
  MessageSquare,
  ImageIcon,
  Plus,
  Edit,
  Trash2,
  X,
  Check,
  Save,
} from "lucide-react";

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState("blogs");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // --- State for Content ---
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Why React is the future",
      content: "React is a library...",
      date: "2024-05-01",
      status: "Published",
    },
    {
      id: 2,
      title: "Mastering Tailwind CSS",
      content: "Tailwind makes UI fast...",
      date: "2024-05-05",
      status: "Draft",
    },
  ]);

  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      author: "Jane Cooper",
      content: "This workshop changed my career!",
      rating: 5,
    },
  ]);

  // --- Shared Logic ---
  const handleOpenModal = (item = null) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      if (type === "blog") setBlogs(blogs.filter((b) => b.id !== id));
      else setTestimonials(testimonials.filter((t) => t.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (activeTab === "blogs") {
      if (editItem) {
        setBlogs(
          blogs.map((b) => (b.id === editItem.id ? { ...b, ...data } : b))
        );
      } else {
        setBlogs([
          ...blogs,
          {
            ...data,
            id: Date.now(),
            date: new Date().toISOString().split("T")[0],
          },
        ]);
      }
    } else if (activeTab === "testimonials") {
      if (editItem) {
        setTestimonials(
          testimonials.map((t) =>
            t.id === editItem.id ? { ...t, ...data } : t
          )
        );
      } else {
        setTestimonials([...testimonials, { ...data, id: Date.now() }]);
      }
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Content Management
        </h2>
        <p className="text-slate-500 text-sm">
          Update your blog, testimonials, and site assets.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-2 p-1 bg-slate-100 w-fit rounded-xl border border-slate-200">
        {[
          { id: "blogs", label: "Blogs", icon: <FileText size={18} /> },
          {
            id: "testimonials",
            label: "Testimonials",
            icon: <MessageSquare size={18} />,
          },
          {
            id: "media",
            label: "Media Library",
            icon: <ImageIcon size={18} />,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setIsModalOpen(false);
            }}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-sm transition-all ${
              activeTab === tab.id
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Blogs Tab */}
      {activeTab === "blogs" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition"
            >
              <Plus size={18} /> New Blog Post
            </button>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 divide-y">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="p-4 flex items-center justify-between hover:bg-slate-50 transition"
              >
                <div>
                  <h4 className="font-bold text-slate-800">{blog.title}</h4>
                  <p className="text-xs text-slate-500">
                    {blog.date} •{" "}
                    <span className="font-bold uppercase text-blue-500">
                      {blog.status}
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(blog)}
                    className="p-2 text-slate-400 hover:text-blue-600 rounded-lg"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id, "blog")}
                    className="p-2 text-slate-400 hover:text-red-600 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials Tab */}
      {activeTab === "testimonials" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 group relative"
            >
              <div className="flex gap-1 text-amber-400 mb-2">★★★★★</div>
              <p className="text-slate-600 italic text-sm mb-4">
                "{t.content}"
              </p>
              <h5 className="font-bold text-slate-800">— {t.author}</h5>
              <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => handleOpenModal(t)}
                  className="p-1 text-slate-400 hover:text-blue-600"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(t.id, "testimonial")}
                  className="p-1 text-slate-400 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => handleOpenModal()}
            className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-400 transition"
          >
            <Plus size={24} />
            <span className="font-bold mt-2">Add New</span>
          </button>
        </div>
      )}

      {/* --- CRUD MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/40 backdrop-blur-sm">
          <div className="h-full w-full max-w-lg bg-white shadow-2xl p-8 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-slate-800">
                {editItem
                  ? `Edit ${activeTab.slice(0, -1)}`
                  : `New ${activeTab.slice(0, -1)}`}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {activeTab === "blogs" ? (
                <>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Blog Title
                    </label>
                    <input
                      name="title"
                      defaultValue={editItem?.title}
                      required
                      className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter title..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      defaultValue={editItem?.status}
                      className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Content
                    </label>
                    <textarea
                      name="content"
                      defaultValue={editItem?.content}
                      required
                      rows={10}
                      className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Write your blog post..."
                    ></textarea>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Author Name
                    </label>
                    <input
                      name="author"
                      defaultValue={editItem?.author}
                      required
                      className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Testimonial Content
                    </label>
                    <textarea
                      name="content"
                      defaultValue={editItem?.content}
                      required
                      rows={4}
                      className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                </>
              )}

              <div className="pt-6 flex gap-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition flex items-center justify-center gap-2"
                >
                  <Save size={18} /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
