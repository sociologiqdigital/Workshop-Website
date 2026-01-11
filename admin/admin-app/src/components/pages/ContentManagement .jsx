import { useEffect, useMemo, useState } from "react";
import {
  FileText,
  ImageIcon,
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Star,
  Loader2,
  AlertTriangle,
} from "lucide-react";

/**
 * ✅ Secure-ish Frontend CMS (ready for backend integration)
 * - Adds slug generation
 * - Enforces single featured post
 * - Validates inputs (length + URL)
 * - Prevents UI break with limits
 * - Uses localStorage ONLY as demo persistence (replace with API)
 * - Safe modal close/reset
 *
 * ⚠️ Production security must be enforced on backend too.
 */

const STORAGE_KEY = "admin_cms_blogs_v1";

const CATEGORIES = [
  "Mindset",
  "Systems",
  "Clarity & Strategy",
  "Digital Foundations",
];
const STATUSES = ["Published", "Draft"];

const defaultBlogs = [
  {
    id: "1",
    title: "Clarity before scale: why most businesses fail early",
    slug: "clarity-before-scale-why-most-businesses-fail-early",
    description:
      "Scaling without clarity leads to chaos. Before you grow, you need aligned systems...",
    category: "Clarity & Strategy",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
    status: "Published",
    isFeatured: true,
    date: "2024-05-01",
  },
  {
    id: "2",
    title: "Why working harder isn't the answer anymore",
    slug: "why-working-harder-isnt-the-answer-anymore",
    description:
      "A short exploration into clarity, systems, and intentional growth.",
    category: "Mindset",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
    status: "Published",
    isFeatured: false,
    date: "2024-05-05",
  },
];

// ---------- helpers ----------
function generateSlug(title) {
  return String(title || "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function isHttpUrl(url) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function safeTrim(v) {
  return String(v ?? "").trim();
}

function makeId() {
  // crypto.randomUUID is supported in modern browsers
  if (typeof crypto !== "undefined" && crypto.randomUUID)
    return crypto.randomUUID();
  return String(Date.now());
}

function clampText(str, max) {
  const s = safeTrim(str);
  return s.length > max ? s.slice(0, max) : s;
}

// ---------- component ----------
export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState("blogs");

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // ui state
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // data
  const [blogs, setBlogs] = useState([]);
  const [hydrating, setHydrating] = useState(true);

  // ---------- hydrate from localStorage (demo only) ----------
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setBlogs(parsed);
        else setBlogs(defaultBlogs);
      } else {
        setBlogs(defaultBlogs);
      }
    } catch {
      setBlogs(defaultBlogs);
    } finally {
      setHydrating(false);
    }
  }, []);

  // persist (demo only)
  useEffect(() => {
    if (hydrating) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
    } catch {
      // ignore storage quota errors
    }
  }, [blogs, hydrating]);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditItem(null);
    setErrorMsg("");
    setIsSaving(false);
  };

  const handleOpenModal = (item = null) => {
    setEditItem(item);
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const featuredId = useMemo(
    () => blogs.find((b) => b.isFeatured)?.id ?? null,
    [blogs]
  );

  // ---------- delete ----------
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?"))
      return;

    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  // ---------- validate + normalize ----------
  const validateAndNormalize = (raw) => {
    const title = clampText(raw.title, 80);
    if (!title) return { ok: false, msg: "Title is required." };

    const category = CATEGORIES.includes(raw.category)
      ? raw.category
      : CATEGORIES[0];
    const status = STATUSES.includes(raw.status) ? raw.status : "Draft";

    const readTime = clampText(raw.readTime, 20); // "5 min read"
    const description = clampText(raw.description, 160);

    const image = safeTrim(raw.image);
    if (image && !isHttpUrl(image)) {
      return { ok: false, msg: "Cover image must be a valid http/https URL." };
    }

    const slugBase = generateSlug(title);
    if (!slugBase)
      return { ok: false, msg: "Unable to generate slug from title." };

    return {
      ok: true,
      data: {
        title,
        slug: slugBase,
        category,
        status,
        readTime,
        description,
        image,
        isFeatured: Boolean(raw.isFeatured),
      },
    };
  };

  // ensure unique slug (important when titles same)
  const ensureUniqueSlug = (incomingSlug, currentId = null) => {
    const existing = new Set(
      blogs
        .filter((b) => (currentId ? b.id !== currentId : true))
        .map((b) => b.slug)
    );
    if (!existing.has(incomingSlug)) return incomingSlug;

    let i = 2;
    while (existing.has(`${incomingSlug}-${i}`)) i += 1;
    return `${incomingSlug}-${i}`;
  };

  // ---------- save ----------
  const handleSave = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);
    const raw = Object.fromEntries(formData.entries());

    const isFeatured = formData.get("isFeatured") === "on";
    raw.isFeatured = isFeatured;

    const result = validateAndNormalize(raw);
    if (!result.ok) {
      setErrorMsg(result.msg);
      setIsSaving(false);
      return;
    }

    // IMPORTANT: enforce single featured post
    // If this new/edited post is featured, un-feature all others.
    const normalized = result.data;

    // unique slug
    const uniqueSlug = ensureUniqueSlug(normalized.slug, editItem?.id ?? null);

    try {
      // ✅ Replace this section with real API calls later:
      // - POST /admin/blogs
      // - PUT /admin/blogs/:id
      // and keep auth in headers (JWT).
      //
      // For now: local state update (demo).

      if (editItem) {
        setBlogs((prev) => {
          const next = prev.map((b) => {
            if (b.id === editItem.id) {
              return {
                ...b,
                ...normalized,
                slug: uniqueSlug,
              };
            }
            return normalized.isFeatured ? { ...b, isFeatured: false } : b;
          });

          return next;
        });
      } else {
        const newBlog = {
          id: makeId(),
          date: new Date().toISOString().slice(0, 10),
          ...normalized,
          slug: uniqueSlug,
        };

        setBlogs((prev) => {
          const cleared = normalized.isFeatured
            ? prev.map((b) => ({ ...b, isFeatured: false }))
            : prev;

          return [...cleared, newBlog];
        });
      }

      closeModal();
    } catch (err) {
      setErrorMsg("Something went wrong while saving. Please try again.");
      setIsSaving(false);
    }
  };

  // ---------- render ----------
  if (hydrating) {
    return (
      <div className="flex items-center gap-3 text-slate-600">
        <Loader2 className="animate-spin" size={18} />
        Loading content…
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
          Content Management
        </h2>
        <p className="text-slate-500 text-sm">
          Update your blog articles and featured journal entries.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-slate-100 w-fit rounded-xl border border-slate-200">
        {[
          { id: "blogs", label: "Blogs", icon: <FileText size={18} /> },
          {
            id: "media",
            label: "Media Library",
            icon: <ImageIcon size={18} />,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-sm transition-all ${
              activeTab === tab.id
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
            type="button"
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Blogs Table */}
      {activeTab === "blogs" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
              type="button"
            >
              <Plus size={18} /> Create Post
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase">
                    Post Details
                  </th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase">
                    Category
                  </th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase">
                    Status
                  </th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-slate-50 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {blog.isFeatured && (
                          <Star
                            size={16}
                            className="text-amber-500 fill-amber-500"
                            aria-label="Featured post"
                          />
                        )}
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 line-clamp-1">
                            {blog.title}
                          </p>
                          <p className="text-xs text-slate-400">
                            {blog.readTime || "—"} • {blog.date}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-1">
                            Slug: <span className="font-mono">{blog.slug}</span>
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                        {blog.category}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`text-xs font-bold ${
                          blog.status === "Published"
                            ? "text-emerald-500"
                            : "text-slate-400"
                        }`}
                      >
                        ● {blog.status}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => handleOpenModal(blog)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          type="button"
                          aria-label="Edit post"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          type="button"
                          aria-label="Delete post"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {blogs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-10 text-center text-slate-500">
                      No posts yet. Click{" "}
                      <span className="font-semibold">Create Post</span>.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Helpful CMS rule */}
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <Star size={14} className="text-amber-500 fill-amber-500" />
            Only one post can be featured at a time. Featuring a new one
            automatically unfeatures the old one
            {featuredId ? "." : " (none featured yet)."}
          </div>
        </div>
      )}

      {/* Media Placeholder */}
      {activeTab === "media" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-500">
          Media Library (coming soon): connect file upload API and show uploaded
          images here.
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="h-full w-full max-w-xl bg-white shadow-2xl p-8 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-slate-800">
                {editItem ? "Edit Post" : "New Post"}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-slate-100 rounded-full transition"
                type="button"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {errorMsg && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 flex items-start gap-2">
                <AlertTriangle size={18} className="mt-0.5" />
                <div>{errorMsg}</div>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-5 pb-20">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Title{" "}
                    <span className="text-slate-400 font-semibold">
                      (max 80)
                    </span>
                  </label>
                  <input
                    name="title"
                    defaultValue={editItem?.title || ""}
                    required
                    maxLength={80}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g. Clarity before scale..."
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    defaultValue={editItem?.category || CATEGORIES[0]}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Read Time{" "}
                    <span className="text-slate-400 font-semibold">
                      (max 20)
                    </span>
                  </label>
                  <input
                    name="readTime"
                    defaultValue={editItem?.readTime || ""}
                    maxLength={20}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g. 5 min read"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Short Description{" "}
                  <span className="text-slate-400 font-semibold">
                    (max 160)
                  </span>
                </label>
                <textarea
                  name="description"
                  defaultValue={editItem?.description || ""}
                  rows={3}
                  maxLength={160}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Short excerpt for the card..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Cover Image URL (http/https)
                </label>
                <input
                  name="image"
                  defaultValue={editItem?.image || ""}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="https://images.unsplash.com/..."
                  autoComplete="off"
                />
                <p className="text-xs text-slate-400 mt-2">
                  Tip: Use a direct image URL. UI will crop safely on the public
                  blog page using{" "}
                  <span className="font-mono">object-cover</span>.
                </p>
              </div>

              <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    defaultChecked={Boolean(editItem?.isFeatured)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-bold text-slate-700">
                    Feature on Hero
                  </span>
                </label>

                <div className="flex-1">
                  <label className="sr-only">Status</label>
                  <select
                    name="status"
                    defaultValue={editItem?.status || "Published"}
                    className="w-full p-2 bg-transparent border-none text-sm font-bold text-blue-600 focus:ring-0"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sticky footer actions */}
              <div className="fixed bottom-0 right-0 w-full max-w-xl p-6 bg-white border-t flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition"
                  disabled={isSaving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}
                  {isSaving ? "Saving…" : "Save Post"}
                </button>
              </div>
            </form>

            {/* Small security note */}
            <div className="text-xs text-slate-400 mt-6">
              Note: This demo persists to{" "}
              <span className="font-mono">localStorage</span>. For real
              security, connect this UI to authenticated APIs and
              validate/sanitize on the server.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
