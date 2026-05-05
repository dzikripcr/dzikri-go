import { Outlet } from "react-router-dom";
import Header from "../components/Header"; 
import Sidebar from "../components/Sidebar"; 

export default function MainLayout() {
  return (
    // Tambahkan font-['Lato'] di sini untuk apply secara global
    <div className="flex h-screen w-full bg-[#f8f9fc] font-['Lato'] overflow-hidden text-gray-800">
      <Sidebar />

      <div className="flex flex-col flex-1 w-full h-full">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}