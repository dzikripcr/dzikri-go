import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header"; 
import Sidebar from "../components/Sidebar"; 
import Footer from "../components/Footer";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#f8f9fc] font-['Lato'] overflow-hidden text-gray-800 relative">
      {/* Sidebar dengan props state untuk mobile */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 w-full h-full min-w-0">
        {/* Anda bisa memberikan fungsi toggle ke Header agar bisa membuka sidebar di mobile */}
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 md:p-8">
          <Outlet />
          <Footer/>
        </main>
      </div>
    </div>
  );
}