import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiChevronDown,
  FiBell,
} from "react-icons/fi";

export default function Header() {
  // State untuk kontrol buka/tutup pop-up notifikasi
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // State untuk kontrol buka/tutup dropdown menu "Shop"
  const [isShopOpen, setIsShopOpen] = useState(false);

  // State untuk mendeteksi apakah layar sedang di-scroll
  const [isScrolled, setIsScrolled] = useState(false);

  // Fungsi untuk scroll otomatis (smooth) ke section terkait di halaman Home
  // berdasarkan id yang sudah dipasang pada masing-masing komponen section.
  const scrollToSection = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // Tutup dropdown Shop & notifikasi setelah navigasi
    setIsShopOpen(false);
    setIsNotifOpen(false);
  };

  // Fungsi untuk memantau pergerakan Scroll
  useEffect(() => {
    const handleScroll = () => {
      // Jika scroll lebih dari 20px, ubah state isScrolled menjadi true
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Data Notifikasi Terintegrasi
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

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header
      className={`sticky top-0 z-[100] transition-all duration-500 ease-in-out flex items-center justify-between px-8 ${
        isScrolled
          ? "py-3 bg-white/60 backdrop-blur-xl backdrop-saturate-150 shadow-sm border-b border-white/50"
          : "py-5 bg-white border-b border-gray-200"
      }`}
    >
      <h1
        onClick={() => scrollToSection("hero")}
        className={`font-black uppercase tracking-tighter cursor-pointer transition-all duration-500 ${
          isScrolled ? "text-2xl" : "text-3xl"
        }`}
      >
        Boutique
      </h1>

      <nav className="hidden md:flex space-x-6 font-medium">
        <button
          onClick={() => scrollToSection("hero")}
          className="hover:text-gray-600 cursor-pointer"
        >
          Home
        </button>
        {/* SHOP - dropdown ke beberapa section produk */}
        <div className="relative">
          <button
            onClick={() => {
              setIsShopOpen(!isShopOpen);
              setIsNotifOpen(false);
            }}
            className="hover:text-gray-600 flex items-center gap-1 outline-none cursor-pointer"
          >
            Shop{" "}
            <FiChevronDown
              className={`text-sm mt-0.5 transition-transform duration-300 ${
                isShopOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isShopOpen && (
            <div className="absolute left-0 mt-3 w-56 bg-white border border-gray-200 rounded-2xl shadow-2xl z-[999] overflow-hidden transition-all duration-300">
              <button
                onClick={() => scrollToSection("new-arrivals")}
                className="w-full text-left px-5 py-3 text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
              >
                New Arrivals
              </button>
              <button
                onClick={() => scrollToSection("top-selling")}
                className="w-full text-left px-5 py-3 text-sm font-medium hover:bg-gray-50 transition cursor-pointer border-t border-gray-100"
              >
                Top Selling
              </button>
              <button
                onClick={() => scrollToSection("dress-style")}
                className="w-full text-left px-5 py-3 text-sm font-medium hover:bg-gray-50 transition cursor-pointer border-t border-gray-100"
              >
                Browse by Style
              </button>
            </div>
          )}
        </div>

        {/* NEW ARRIVALS */}
        <button
          onClick={() => scrollToSection("new-arrivals")}
          className="hover:text-gray-600 cursor-pointer"
        >
          New Arrivals
        </button>

        {/* ON SALE - sementara diarahkan ke section Top Selling */}
        <button
          onClick={() => scrollToSection("top-selling")}
          className="hover:text-gray-600 cursor-pointer"
        >
          On Sale
        </button>

        {/* BRANDS */}
        <button
          onClick={() => scrollToSection("dress-style")}
          className="hover:text-gray-600 cursor-pointer"
        >
          Brands
        </button>

        {/* TESTIMONIALS */}
        <button
          onClick={() => scrollToSection("testimonials")}
          className="hover:text-gray-600 cursor-pointer"
        >
          Testimonials
        </button>
      </nav>

      <div className="flex items-center space-x-5 w-full md:w-auto mt-4 md:mt-0 justify-end">
        {/* SEARCH BOX */}
        <div
          className={`hidden lg:flex items-center px-4 py-2.5 rounded-full w-80 border transition-all duration-500 ease-in-out group focus-within:w-[440px] focus-within:bg-white focus-within:border-gray-200 focus-within:shadow-xl focus-within:shadow-black/5 ${
            isScrolled
              ? "bg-white/40 border-white/30 backdrop-blur-md"
              : "bg-[#F0F0F0] border-transparent"
          }`}
        >
          <FiSearch className="text-gray-500 mr-2 text-xl transition-colors duration-300 group-focus-within:text-black" />
          <input
            type="text"
            placeholder="Search for products..."
            className="bg-transparent outline-none w-full text-sm text-gray-900 placeholder-gray-500"
          />
        </div>

        {/* AREA NOTIFIKASI CRM */}
        <div className="relative">
          <button
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsShopOpen(false);
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
            <div className="absolute right-[-40px] md:right-0 mt-4 w-[320px] md:w-[360px] bg-white border border-gray-200 rounded-2xl shadow-2xl z-[999] overflow-hidden transition-all duration-300">
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

        <button className="text-2xl hover:text-gray-600 transition cursor-pointer">
          <FiShoppingCart />
        </button>
        <button className="text-2xl hover:text-gray-600 transition cursor-pointer">
          <FiUser />
        </button>
      </div>
    </header>
  );
}