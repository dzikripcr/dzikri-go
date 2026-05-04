import { FaBell, FaSearch, FaSun } from "react-icons/fa";

export default function Header() {
  return (
    <div 
      id="header-container" 
      className="flex justify-between items-center bg-white px-8 py-4 border-b border-gray-200 shadow-sm"
    >
      {/* Search Bar */}
      <div id="search-bar" className="relative w-full max-w-md">
        <input
          id="search-input"
          type="text"
          placeholder="Search data, users, or reports"
          className="bg-gray-100 text-gray-700 text-sm rounded-full py-2.5 pl-5 pr-10 w-full focus:outline-none focus:ring-1 focus:ring-gray-900 transition-all"
        />
        <FaSearch id="search-icon" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Icon & Profile Section */}
      <div id="icons-container" className="flex items-center space-x-6">
        
        {/* Notification Icon */}
        <div id="notification-icon" className="relative text-gray-400 hover:text-gray-900 transition-colors duration-200 cursor-pointer text-xl">
          <FaBell />
          {/* Menambahkan border putih pada dot merah pada icon notif*/}
          <span className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 bg-red-500 border-2 border-white rounded-full w-3 h-3"></span>
        </div>
        
        {/* Theme Toggle Button - Diubah ke Monokrom */}
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 cursor-pointer hover:bg-gray-100 transition-colors">
           <FaSun className="text-gray-600 mr-2 text-sm" />
           <div className="w-7 h-4 bg-gray-300 rounded-full relative">
               <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm"></div>
           </div>
        </div>

        {/* Profile Avatar */}
        <img
          id="profile-avatar"
          src="./img/foto.jpeg"
          className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 hover:border-gray-900 transition-colors cursor-pointer"
          alt="Profile"
        />
      </div>
    </div>
  );
}