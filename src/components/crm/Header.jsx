import React, { useState, useEffect, useRef } from "react"; // Tambahkan useRef di sini
import { Link, useNavigate, useLocation } from "react-router-dom";

import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiChevronDown,
  FiBell,
  FiLogOut,
  FiAward,
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";
import { getLevelFromPoints, getMemberStatus } from "../../services/membership";

export default function Header() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Buat referensi (Ref) untuk masing-masing container menu dropdown
  const notifRef = useRef(null);
  const shopRef = useRef(null);
  const profileRef = useRef(null);

  const points = user?.points ?? 0;
  const orderCount = user?.orderCount ?? 0;
  const totalSpend = user?.totalSpend ?? 0;
  const isActive = user?.isActive ?? true;

  const level = getLevelFromPoints(points);
  const status = getMemberStatus({ isActive, orderCount, totalSpend, level });

  const scrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      const target = document.getElementById(sectionId);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }

    setIsShopOpen(false);
    setIsNotifOpen(false);
    setIsProfileOpen(false);
  };

  // Effect untuk menghandle klik di luar elemen
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Tutup Shop jika klik di luar element shopRef
      if (shopRef.current && !shopRef.current.contains(event.target)) {
        setIsShopOpen(false);
      }
      // Tutup Notifikasi jika klik di luar element notifRef
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
      // Tutup Profil jika klik di luar element profileRef
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    // Daftarkan event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Bersihkan event listener saat komponen unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const notifications = [
    {
      id: 1,
      type: "shipping",
      title: "Pesanan Dikirim 🚚",
      desc: "Hore! Paket 'Elegant Silk Dress' Anda sedang dalam perjalanan oleh kurir menuju alamat tujuan.",
      time: "2 jam yang lalu",
      unread: true,
    },
    {
      id: 2,
      type: "promo",
      title: "Diskon 50% Khusus Hari Ini! ✨",
      desc: "Gunakan kode voucher WEEKEND50 untuk semua koleksi Casual. Jangan sampai kehabisan!",
      time: "5 jam yang lalu",
      unread: true,
    },
    {
      id: 3,
      type: "event",
      title: "Midnight Sale Dimulai 🕛",
      desc: "Dapatkan penawaran terbaik diskon hingga 70% mulai jam 12 malam nanti. Siapkan keranjang belanjamu!",
      time: "1 hari yang lalu",
      unread: false,
    },
    {
      id: 4,
      type: "chat",
      title: "Pesan dari CS Boutique 💬",
      desc: "Halo kak, ukuran M untuk produk 'Vintage Pearl Necklace' yang kakak tanyakan sudah restock kembali ya.",
      time: "2 hari yang lalu",
      unread: false,
    },
    {
      id: 5,
      type: "voucher",
      title: "Voucher Cashback Rp 50.000 🎉",
      desc: "Selamat! Voucher cashback loyalitas pelanggan telah ditambahkan otomatis ke dalam akun Anda.",
      time: "3 hari yang lalu",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((item) => item.unread).length;

  return (
    <header
      className={`
    sticky top-0 z-[100]
    flex items-center justify-between px-8
    transition-all duration-500
    ${
      isScrolled
        ? "py-3 bg-white/60 backdrop-blur-xl shadow"
        : "py-5 bg-white border-b"
    }
    `}
    >
      {/* LOGO */}
      <h1
        onClick={() => scrollToSection("hero")}
        className="font-black uppercase tracking-tighter cursor-pointer text-3xl"
      >
        DM Boutiquera
      </h1>

      {/* MENU */}
      <nav className="hidden md:flex space-x-6 font-medium">
        <button
          className="cursor-pointer hover:text-gray-600 transition"
          onClick={() => scrollToSection("hero")}
        >
          Home
        </button>

        {/* MENU PRODUK - BARU DITAMBAHKAN */}

        {/* CONDITIONAL RENDERING: Menu Shop */}
        {user && (
          // Pasang shopRef membungkus button pemicu dan jendela dropdown-nya
          <div className="relative" ref={shopRef}>
            <button
              onClick={() => setIsShopOpen(!isShopOpen)}
              className="flex items-center gap-1 cursor-pointer hover:text-gray-600 transition"
            >
              Toko
              <FiChevronDown />
            </button>

            {isShopOpen && (
              <div className="absolute top-8 left-0 w-48 bg-white rounded-xl shadow-xl border p-2 z-[110]">
                <button
                  onClick={() => scrollToSection("new-arrivals")}
                  className="block w-full text-left p-3 hover:bg-gray-100 cursor-pointer rounded-lg text-sm"
                >
                  Produk Baru
                </button>
                <button
                  onClick={() => scrollToSection("top-selling")}
                  className="block w-full text-left p-3 hover:bg-gray-100 cursor-pointer rounded-lg text-sm"
                >
                  Paling Laris
                </button>
                <button
                  onClick={() => scrollToSection("dress-style")}
                  className="block w-full text-left p-3 hover:bg-gray-100 cursor-pointer rounded-lg text-sm"
                >
                  Style
                </button>
              </div>
            )}
          </div>
        )}

        {user && (
          <button
              onClick={() => navigate("/produk")}
              className="cursor-pointer hover:text-gray-600 transition"
            >
              Produk
            </button>
        )}

        {/* CONDITIONAL RENDERING: Menu Why Us & Membership */}
        {!user && (
          <>
            <button
              className="cursor-pointer hover:text-gray-600 transition"
              onClick={() => scrollToSection("alasan")}
            >
              Fitur
            </button>

            <button
              className="cursor-pointer hover:text-gray-600 transition"
              onClick={() => scrollToSection("membership")}
            >
              Membership
            </button>
          </>
        )}

        <button
          className="cursor-pointer hover:text-gray-600 transition"
          onClick={() => scrollToSection("testimonials")}
        >
          Testimoni
        </button>
      </nav>

      {/* RIGHT AREA */}
      <div className="flex items-center gap-5">
        {/* SEARCH BOX */}
        <div
          className={`
            hidden lg:flex 
            items-center
            px-4
            py-2.5
            rounded-full
            w-80
            border
            transition-all
            duration-500
            ease-in-out
            group
            focus-within:w-[440px]
            focus-within:bg-white
            focus-within:border-gray-200
            focus-within:shadow-xl
            focus-within:shadow-black/5
            ${
              isScrolled
                ? "bg-white/40 border-white/30 backdrop-blur-md"
                : "bg-[#F0F0F0] border-transparent"
            }
        `}
        >
          <FiSearch className="text-gray-500 mr-2 text-xl transition-colors duration-300 group-focus-within:text-black" />
          <input
            type="text"
            placeholder="Search for products..."
            className="bg-transparent outline-none w-full text-sm text-gray-900 placeholder-gray-500"
          />
        </div>

        {/* PROFILE/GUEST CONTROLLER */}
        {!user ? (
          <Link
            to="/login"
            className="group relative overflow-hidden flex items-center justify-center gap-2 bg-black text-white px-10 py-3.5 rounded-full font-medium tracking-wide shadow-xl shadow-black/20 transition-all duration-300 ease-out hover:bg-gray-800 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 active:scale-95 cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 ease-in-out"></span>
            <span className="relative z-10">Login</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        ) : (
          <>
            {/* NOTIFICATION */}
            {/* Pasang notifRef membungkus button dan dropdown-nya */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setIsNotifOpen(!isNotifOpen);
                  setIsShopOpen(false);
                  setIsProfileOpen(false);
                }}
                className="text-2xl hover:text-gray-600 transition cursor-pointer relative flex items-center justify-center p-1 mt-1 outline-none"
              >
                <FiBell />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold border-2 border-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-[-40px] md:right-0 mt-4 w-[320px] md:w-[360px] bg-white border border-gray-200 rounded-2xl shadow-2xl z-[999] overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-extrabold text-base tracking-tight">
                      Notifikasi Baru
                    </h3>
                    <span className="text-xs text-blue-600 cursor-pointer hover:underline font-semibold">
                      Tandai semua dibaca
                    </span>
                  </div>
                  <div className="max-h-[350px] overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition duration-200 flex flex-col gap-1 ${
                          notif.unread ? "bg-blue-50/40" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <h4 className="text-sm font-bold text-gray-900 leading-tight">
                            {notif.title}
                          </h4>
                          {notif.unread && (
                            <span className="w-2 h-2 bg-blue-600 rounded-full mt-1 flex-shrink-0"></span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed pr-2">
                          {notif.desc}
                        </p>
                        <span className="text-[10px] text-gray-400 font-medium mt-1">
                          {notif.time}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-100 hover:bg-black hover:text-white cursor-pointer transition-colors duration-300">
                    <span className="text-sm font-bold">
                      Lihat Semua Notifikasi
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* CART */}
            <button className="text-2xl cursor-pointer hover:text-gray-600 transition">
              <FiShoppingCart />
            </button>

            {/* PROFILE DROPDOWN */}
            {/* Pasang profileRef membungkus button profil dan dropdown-nya */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotifOpen(false);
                  setIsShopOpen(false);
                }}
                className="text-2xl cursor-pointer hover:text-gray-600 transition"
              >
                <FiUser />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-4 w-64 bg-white border shadow-xl rounded-2xl p-4 z-[999]">
                  <p className="font-bold">Aulia Rahman</p>
                  <p className="text-sm text-gray-500">Member</p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-100 text-purple-700">
                      VIP
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700">
                      <FiAward className="text-xs" />
                      Platinum
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate("/profile");
                    }}
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-black text-white text-sm font-medium py-2.5 rounded-full transition-all duration-300 hover:bg-gray-800 cursor-pointer"
                  >
                    <FiUser />
                    Profile Member
                  </button>

                  <button
                    onClick={logout}
                    className="mt-2 w-full flex items-center justify-center gap-2 text-red-500 text-sm font-medium py-2 
                      rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:bg-red-500 
                      hover:text-white hover:shadow-md hover:scale-[1.02] active:scale-95"
                  >
                    <FiLogOut />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
