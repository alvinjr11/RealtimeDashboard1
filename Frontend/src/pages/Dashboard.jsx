import React from "react";
import Sidebar from "../layout/Sidebar"

import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 ml-0 mt-0 px-1 overflow-y-auto bg-gradient-to-r from-gray-200 to-gray-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;