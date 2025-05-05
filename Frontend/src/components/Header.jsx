import { useEffect, useState } from "react";

import SummaryApi from "../commen/index";

const Header = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(SummaryApi.currentUser.url, {
          method: SummaryApi.currentUser.method,
          credentials: 'include',
        });

        const data = await res.json();
        if (data.success) {
          setUser(data.data); // Corrected typo: 'dat' → 'data'
        } else {
          console.error('Failed to fetch user profile:', data.message);
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <header className="w-full bg-gradient-to-r from-green-400 via-green-400 to-green-400 text-white px-10 py-5 shadow-lg flex items-center justify-between transition-all duration-300 ">
      {/* Company Name */}
      <h1 className="text-xl font-semibold tracking-tight flex items-center space-x-1">
        <span className="text-white">greOn</span>
        <span className="text-gray-500"> X<span className="text-white">pert</span></span>
      </h1>

      {/* User Profile */}
      <div className="flex items-center gap-4 relative">
        {/* User Name and Email (visible only when dropdown is open) */}
        <div className="relative">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`}
            alt="Avatar"
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown visibility on avatar click
          />

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute top-14 right-0 bg-white rounded-lg shadow-lg border p-4 min-w-[200px] z-10">
              <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

