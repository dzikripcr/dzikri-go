import { BiUserCircle } from "react-icons/bi"; 
import { FiLogOut, FiUsers } from "react-icons/fi";
import {
  AiOutlineShoppingCart,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { TbHanger } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import {
  BsBoxSeam,
  BsCashStack,
  BsTags,
  BsTicketPerforated,
  BsChatSquareText,
} from "react-icons/bs";

export default function Sidebar() {
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-3 space-x-3 mb-1 font-medium transition-all ${
      isActive
        ? "text-white bg-[#4EA674] shadow-sm"
        : "text-gray-500 hover:text-[#55A67B] hover:bg-green-50"
    }`;

  return (
    <div
      id="sidebar"
      className="flex min-h-screen w-64 flex-col bg-white border-r border-gray-100 p-5 select-none"
    >
      {/* Logo */}
      <div id="sidebar-logo" className="flex items-center space-x-2 mb-6 px-2 py-1">
        <div className="text-[#4EA674] text-2xl">
          <TbHanger />
        </div>
        <span
          id="logo-title"
          className="font-extrabold text-2xl text-gray-900 tracking-wide uppercase"
        >
          Boutiquera
        </span>
      </div>

      {/* List Menu */}
      <div id="sidebar-menu" className="flex-1 overflow-y-auto pr-1">
        <ul>
          {/* Header Tunggal sesuai Gambar */}
          <span className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mb-3 ml-3 block">
            Menu Utama
          </span>

          {/* 1. Dashboard */}
          <li>
            <NavLink to="/dashboard" className={menuClass}>
              <FaHome className="text-[18px]" />
              <span>Dashboard</span>
            </NavLink>
          </li>

          {/* 2. Order Management */}
          <li>
            <NavLink to="/orders" className={menuClass}>
              <AiOutlineShoppingCart className="text-[18px]" />
              <span>Pesanan</span>
            </NavLink>
          </li>

          {/* 3. Customers */}
          <li>
            <NavLink to="/customers" className={menuClass}>
              <FiUsers className="text-[18px]" />
              <span>Data Pelanggan</span>
            </NavLink>
          </li>

          {/* 4. Coupon Code */}
          <li>
            <NavLink to="/kupon" className={menuClass}>
              <BsTicketPerforated className="text-[18px]" />
              <span>Kupon & Voucher</span>
            </NavLink>
          </li>

          {/* 5. Categories */}
          <li>
            <NavLink to="/kategori-produk" className={menuClass}>
              <BsTags className="text-[18px]" />
              <span>Kategori Produk</span>
            </NavLink>
          </li>

          {/* 6. Transaction */}
          <li>
            <NavLink to="/transaksi" className={menuClass}>
              <BsCashStack className="text-[18px]" />
              <span>Transaksi</span>
            </NavLink>
          </li>

          {/* 7. Product List */}
          <li>
            <NavLink to="/products" className={menuClass}>
              <BsBoxSeam className="text-[18px]" />
              <span>Data Produk</span>
            </NavLink>
          </li>

          {/* 8. Feedback / Ulasan (Tambahan pengaman dari kode lama Anda) */}
          <li>
            <NavLink to="/feedback" className={menuClass}>
              <BsChatSquareText className="text-[18px]" />
              <span>Feedback / Ulasan</span>
            </NavLink>
          </li>

          {/* 9. User */}
          <li>
            <NavLink to="/users" className={menuClass}>
              <BiUserCircle className="text-[18px]" />
              <span>Kelola Admin</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Footer Profile Mini */}
      <div
        id="sidebar-footer"
        className="mt-auto pt-4 border-t border-gray-100"
      >
        <div className="flex items-center justify-between">
          {/* Profile */}
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="../img/foto.jpeg"
              alt="User"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-50"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                Dzikri Maulana
              </p>
              <p className="text-xs text-gray-500 truncate">dzikri@gmail.com</p>
            </div>
          </div>

          {/* Logout */}
          <Link
            to="/login"
            className="flex items-center justify-center w-9 h-9 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
            title="Logout"
          >
            <FiLogOut size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}