import { AiOutlineAppstore, AiOutlineShoppingCart, AiOutlineUser, AiOutlineSkin } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { TbHanger } from "react-icons/tb";
import { MdError } from "react-icons/md";

export default function Sidebar() {
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-lg p-3 space-x-3 transition-all duration-300
        ${
          isActive
            ? "bg-gray-900 text-white font-semibold shadow-md shadow-gray-200"
            : "text-gray-500 hover:text-gray-900 hover:bg-gray-100 font-medium"
        }`;

  return (
    <div id="sidebar" className="flex min-h-screen w-64 flex-col bg-white border-r border-gray-100 p-6">
      {/* Logo */}
      <div id="sidebar-logo" className="flex items-center space-x-2 mb-10">
        <div className="text-amber-950 text-2xl">
          <TbHanger />
        </div>
        <span id="logo-title" className="font-bold text-2xl text-gray-900 tracking-wide">
          BOUTIQUE
        </span>
      </div>

      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Main menu</span>

      {/* List Menu */}
      <div id="sidebar-menu" className="flex-1">
        <ul id="menu-list" className="space-y-2">
          <li>
            <NavLink id="menu-dashboard" to="/" className={menuClass}>
              <AiOutlineAppstore className="text-xl" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-orders" to="/Orders" className={menuClass}>
              <AiOutlineShoppingCart className="text-xl" />
              <span>Order Management</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-customers" to="/Customers" className={menuClass}>
              <AiOutlineUser className="text-xl" />
              <span>Customers</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-products" to="/Products" className={menuClass}>
              <AiOutlineSkin className="text-xl" />
              <span>Products</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-4" to="/error400" className={menuClass}>
              <MdError className="mr-4 text-xl" /> <span>Error 400</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-5" to="/error401" className={menuClass}>
              <MdError className="mr-4 text-xl" /> <span>Error 401</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-6" to="/error403" className={menuClass}>
              <MdError className="mr-4 text-xl" /> <span>Error 403</span>
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