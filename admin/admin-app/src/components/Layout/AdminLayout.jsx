import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar";

const AdminLayout = () => {
  const location = useLocation();

  // Format path name for the Header (e.g., /admin/workshops -> Workshops)
  const pageTitle =
    location.pathname.split("/").pop()?.toUpperCase() || "DASHBOARD";

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-lg font-semibold text-slate-800">{pageTitle}</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 font-medium">
              Welcome, Admin
            </span>
            <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
