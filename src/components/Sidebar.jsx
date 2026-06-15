import { FiLogOut, FiUsers } from "react-icons/fi";
import {
  AiOutlineAppstore,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineSkin,
} from "react-icons/ai";
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
    <div
      id="sidebar"
      className="flex min-h-screen w-64 flex-col bg-white border-r border-gray-100 p-6"
    >
      {/* Logo */}
      <div id="sidebar-logo" className="flex items-center space-x-2 mb-10">
        <div className="text-[#4EA674] text-2xl">
          <TbHanger />
        </div>
        <span
          id="logo-title"
          className="font-bold text-2xl text-gray-900 tracking-wide"
        >
          BOUTIQUE
        </span>
      </div>

      <span className="text-[15px] text-neutral-500 ml-1 tracking-wider mb-4 font-['Lato']">
        Main menu
      </span>

      {/* List Menu */}
      <div id="sidebar-menu" className="flex-1">
        <ul>
          <li>
            <NavLink to="/dashboard" className={menuClass}>
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
      <div
        id="sidebar-footer"
        className="mt-auto pt-5 border-t border-gray-100"
      >
        <div className="flex items-center justify-between">
          {/* Profile */}
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="../img/foto.jpeg"
              alt="User"
              className="w-11 h-11 rounded-full object-cover"
            />

            <div className="min-w-0">
              <p className="text-[15px] font-bold text-gray-900 truncate">
                Dzikri Maulana
              </p>

              <p className="text-sm text-gray-500 truncate">dzikri@gmail.com</p>
            </div>
          </div>

          {/* Logout */}
          <Link
            to="/"
            className="flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-red-500 transition-colors"
            title="Logout"
          >
            <FiLogOut size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
