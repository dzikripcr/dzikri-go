import { FiUsers } from "react-icons/fi"; 
import { AiOutlineAppstore, AiOutlineShoppingCart, AiOutlineUser, AiOutlineSkin } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { TbHanger } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";

export default function Sidebar() {
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-3 space-x-3 mb-2 font-medium transition-all ${
      isActive
        ? "text-white bg-[#4EA674] shadow-md"
        : "text-gray-500 hover:text-[#55A67B] hover:bg-green-50"
    }`;

  return (
    <div id="sidebar" className="flex min-h-screen w-64 flex-col bg-white border-r border-gray-100 p-6">
      {/* Logo */}
      <div id="sidebar-logo" className="flex items-center space-x-2 mb-10">
        <div className="text-[#4EA674] text-2xl">
          <TbHanger />
        </div>
        <span id="logo-title" className="font-bold text-2xl text-gray-900 tracking-wide">
          BOUTIQUE
        </span>
      </div>

      <span className="text-[15px] text-neutral-500 ml-1 tracking-wider mb-4 font-['Lato']">Main menu</span>

      {/* List Menu */}
      <div id="sidebar-menu" className="flex-1">
        <ul>
          <li>
            <NavLink to="/" className={menuClass}>
              <FaHome className="text-[16px]" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className={menuClass}>
              <AiOutlineShoppingCart className="text-[16px]" />
              <span>Order Management</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/customers" className={menuClass}>
              <FiUsers className="text-[16px]" />
              <span>Customers</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={menuClass}>
              <BsBoxSeam className="text-[16px]" />
              <span>Product</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Footer Profile Mini */}
      <div id="sidebar-footer" className="mt-auto pt-6 border-t border-gray-100 flex items-center space-x-3">
        <img src="./img/foto.jpeg" alt="User" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-900">Dzikri Maulana</span>
          <span className="text-xs text-gray-500">dzikri@gmail.com</span>
        </div>
      </div>
    </div>
  );
}