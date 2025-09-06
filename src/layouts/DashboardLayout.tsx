import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    role: "Regular Staff",
    email: "john.doe@company.com",
  });

  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { name: "New Request", href: "/dashboard/request", icon: "📝" },
    { name: "My Requests", href: "/dashboard/requests", icon: "📋" },
    { name: "Retirement", href: "/dashboard/retirement", icon: "💰" },
    {
      name: "Approvals",
      href: "/dashboard/approvals",
      icon: "✅",
      roles: ["Line Manager", "Finance Officer"],
    },
    {
      name: "Reports",
      href: "/dashboard/reports",
      icon: "📈",
      roles: ["Finance Officer", "Auditor/Admin"],
    },
  ];

  // Filter navigation based on user role
  const filteredNavigation = navigation.filter(
    (item) => !item.roles || item.roles.includes(user.role)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-0 flex z-40 md:hidden ${
          sidebarOpen ? "" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        ></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CA</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-800">
                CashAdvance
              </span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {filteredNavigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      isActive
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="mr-4 text-lg">{item.icon}</span>
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-base font-medium text-gray-800">
                  {user.name}
                </p>
                <p className="text-sm font-medium text-gray-500">{user.role}</p>
              </div>
              <button
                className="ml-3 text-sm text-indigo-600 hover:text-indigo-900"
                onClick={() => {
                  // Handle logout
                  console.log("Logout clicked");
                }}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CA</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-800">
                CashAdvance
              </span>
            </div>
            <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
              {filteredNavigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center w-full">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <p className="text-xs font-medium text-gray-500">{user.role}</p>
              </div>
              <button
                className="text-sm text-indigo-600 hover:text-indigo-900"
                onClick={() => {
                  // Handle logout
                  console.log("Logout clicked");
                }}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <span className="text-xl">☰</span>
          </button>
        </div>
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet /> {/* This is where page content will be rendered */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
