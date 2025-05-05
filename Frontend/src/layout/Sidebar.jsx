import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut as LogOutIcon, FileBarChart2 as FileChartLine, Activity as ActivityIcon } from "lucide-react";
import clsx from "clsx";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="w-64 h-[calc(100vh-64px)] bg-gradient-to-r from-gray-200 to-gray-300 text-gray-600 flex flex-col rounded-2xl justify-between  left-0 top-16 z-50">
  {/* Top Section */}
  <div>
    <div className="text-2xl font-bold px-6 py-5 border-b border-gray-700 text-gray-500">
      Dashboard
    </div>
    <nav className="mt-4">
      <SidebarLink
        to="/dashboard/floweditor"
        icon={<FileChartLine size={18} />}
        label="Flow Editor"
        currentPath={location.pathname}
      />
      <SidebarLink
        to="/dashboard/simulator"
        icon={<ActivityIcon size={18} />}
        label="Simulator Page"
        currentPath={location.pathname}
      />
    </nav>
  </div>

  {/* Bottom Logout Button */}
  <button
    onClick={logout}
    className="m-4 p-3 rounded bg-red-400 hover:bg-red-500 flex items-center gap-2 justify-center"
  >
    <LogOutIcon size={18} />
    Logout
  </button>
</aside>

  );
};

// Sidebar Link Component
const SidebarLink = ({ to, icon, label, currentPath }) => (
  <Link
    to={to}
    className={clsx(
      "flex items-center gap-3 px-6 py-3  transition duration-200 ",
      currentPath === to && "bg-gradient-to-r from-gray-300 to-gray-500"
    )}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Sidebar;
