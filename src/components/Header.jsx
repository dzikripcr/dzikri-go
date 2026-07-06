import { FaSearch } from "react-icons/fa";
import { FiBell, FiMenu } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import Button from "./Button";
import Avatar from "./Avatar";
import InputField from "./InputField";

// Terima prop onMenuClick untuk tombol menu
export default function Header({ onMenuClick }) { 
  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname.split("/").pop();
    if (!path || path === "") return "Dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
  };

  return (
    <div className="flex justify-between items-center py-3 px-4 md:py-5 md:px-10 bg-white border-b border-gray-50 font-['Lato'] sticky top-0 z-30">
      
      {/* Bagian Kiri: Tombol Menu (Mobile) & Judul */}
      <div className="flex items-center gap-3">
        {/* Hamburger Menu - Hanya muncul di mobile & tablet (< lg) */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-[#55A67B] transition-colors"
        >
          <FiMenu className="text-2xl" />
        </button>

        {/* Dynamic Title */}
        <h1 className="text-xl md:text-[22px] font-black text-[#0A2533] tracking-tight truncate max-w-[150px] sm:max-w-none">
          {getTitle()}
        </h1>
      </div>

      {/* Fitur Kanan */}
      <div className="flex items-center space-x-3 md:space-x-6">
        {/* Search Bar - Sesuai Gambar (Sembunyi di HP) */}
        <div className="relative hidden lg:block">
          <InputField
            type="text"
            placeholder="Search data, users, or reports"
            className="w-[300px] xl:w-[450px] bg-[#F9FAFB] text-[16px] text-[#000000/69] border-[#EAF8E7] border-1 rounded-full py-3 pl-6 pr-12 outline-none focus:ring-2 focus:ring-[#55A67B]/20 transition-all placeholder:text-gray-400"
          />
          <FaSearch className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
        </div>

        <div className="flex items-center space-x-3 md:space-x-4">
          {/* Notification Button */}
          <button className="relative p-2 text-gray-600 hover:text-[#55A67B] transition-colors">
            <FiBell className="text-2xl md:text-2xl text-xl" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </button>

          {/* Theme Toggle Light/Dark - Warna EAF8E7 (Sembunyi di HP kecil untuk menghemat ruang, opsional) */}
          <div className="hidden sm:flex items-center bg-[#EAF8E7] p-1.5 rounded-full w-16 cursor-pointer">
            <div className="bg-white p-1 rounded-full shadow-sm">
              {/* Icon Sun */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-700"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </div>
          </div>

          {/* Profile Section */}
          <Avatar src="../img/foto.jpeg" alt="Profile" />
        </div>
      </div>
    </div>
  );
}