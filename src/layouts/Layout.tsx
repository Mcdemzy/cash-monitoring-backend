import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdRequestQuote,
  MdApproval,
  MdBarChart,
  MdSettings,
} from "react-icons/md";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <MdDashboard size={20} /> },
    { name: "Requests", path: "/requests", icon: <MdRequestQuote size={20} /> },
    { name: "Approvals", path: "/approvals", icon: <MdApproval size={20} /> },
    { name: "Monitoring", path: "/monitoring", icon: <MdBarChart size={20} /> },
    { name: "Settings", path: "/settings", icon: <MdSettings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 text-xl font-bold border-b">CAMS</div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 transition ${
                location.pathname === item.path
                  ? "bg-blue-500 text-white"
                  : "text-gray-700"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
