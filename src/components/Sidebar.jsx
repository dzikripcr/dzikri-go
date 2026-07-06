import { BiUserCircle } from "react-icons/bi"; 
import { FiLogOut, FiUsers, FiX } from "react-icons/fi"; // Tambah FiX untuk tombol close
import {
  AiOutlineShoppingCart,
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

export default function Sidebar({ isOpen, setIsOpen }) {
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-3 space-x-3 mb-1 font-medium transition-all ${
      isActive
        ? "text-white bg-[#4EA674] shadow-sm"
        : "text-gray-500 hover:text-[#55A67B] hover:bg-green-50"
    }`;

  return (
    <>
      {/* OVERLAY: Muncul hanya di mobile/tablet saat sidebar terbuka */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <div
        id="sidebar"
        className={`
          fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col bg-white border-r border-gray-100 p-5 select-none transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo & Tombol Close untuk Mobile */}
        <div id="sidebar-logo" className="flex items-center justify-between mb-6 px-2 py-1">
          <div className="flex items-center space-x-2">
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

          {/* Tombol close - hanya muncul di mobile/tablet */}
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* List Menu */}
        <div id="sidebar-menu" className="flex-1 overflow-y-auto pr-1">
          <ul>
            <span className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mb-3 ml-3 block">
              Menu Utama
            </span>

            {/* 1. Dashboard */}
            <li>
              <NavLink to="/dashboard" className={menuClass} onClick={() => setIsOpen(false)}>
                <FaHome className="text-[18px]" />
                <span>Dashboard</span>
              </NavLink>
            </li>

            {/* 2. Order Management */}
            <li>
              <NavLink to="/orders" className={menuClass} onClick={() => setIsOpen(false)}>
                <AiOutlineShoppingCart className="text-[18px]" />
                <span>Pesanan</span>
              </NavLink>
            </li>

            {/* 3. Customers */}
            <li>
              <NavLink to="/customers" className={menuClass} onClick={() => setIsOpen(false)}>
                <FiUsers className="text-[18px]" />
                <span>Data Pelanggan</span>
              </NavLink>
            </li>

            {/* 4. Coupon Code */}
            <li>
              <NavLink to="/kupon" className={menuClass} onClick={() => setIsOpen(false)}>
                <BsTicketPerforated className="text-[18px]" />
                <span>Kupon & Voucher</span>
              </NavLink>
            </li>

            {/* 5. Categories */}
            <li>
              <NavLink to="/kategori-produk" className={menuClass} onClick={() => setIsOpen(false)}>
                <BsTags className="text-[18px]" />
                <span>Kategori Produk</span>
              </NavLink>
            </li>

            {/* 6. Transaction */}
            <li>
              <NavLink to="/transaksi" className={menuClass} onClick={() => setIsOpen(false)}>
                <BsCashStack className="text-[18px]" />
                <span>Transaksi</span>
              </NavLink>
            </li>

            {/* 7. Product List */}
            <li>
              <NavLink to="/products" className={menuClass} onClick={() => setIsOpen(false)}>
                <BsBoxSeam className="text-[18px]" />
                <span>Data Produk</span>
              </NavLink>
            </li>

            {/* 8. Feedback / Ulasan */}
            <li>
              <NavLink to="/feedback" className={menuClass} onClick={() => setIsOpen(false)}>
                <BsChatSquareText className="text-[18px]" />
                <span>Ulasan</span>
              </NavLink>
            </li>

            {/* 9. User */}
            <li>
              <NavLink to="/users" className={menuClass} onClick={() => setIsOpen(false)}>
                <BiUserCircle className="text-[18px]" />
                <span>User</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Footer Profile Mini */}
        <div id="sidebar-footer" className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
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
    </>
  );
}