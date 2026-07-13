import React, { useState, useEffect, useRef } from "react"; 
import { Link, useNavigate, useLocation } from "react-router-dom";

import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiChevronDown,
  FiBell,
  FiLogOut,
  FiAward,
  FiPackage,
  FiGift, // <-- Ikon baru untuk menu Poin Reward
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";
// Import Cart Context untuk mengambil data jumlah item di keranjang
import { useCart } from "../../context/CartContext"; 
// Import Rewards Context untuk sistem poin & voucher (Marketing Automation)
import { useRewards } from "../../context/RewardsContext";
import { getLevelFromPoints, getMemberStatus, LEVEL_BADGE_CLASSES } from "../../services/membership";

export default function Header() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const {
    points,
    availableVouchers,
    rewardCatalog,
    redeemReward,
  } = useRewards();

  const navigate = useNavigate();
  const location = useLocation();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isRewardsOpen, setIsRewardsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // State kecil khusus untuk interaksi di dalam dropdown Poin Reward
  const [redeemFeedback, setRedeemFeedback] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  // Buat referensi (Ref) untuk masing-masing container menu dropdown
  const notifRef = useRef(null);
  const shopRef = useRef(null);
  const profileRef = useRef(null);
  const rewardsRef = useRef(null);

  const orderCount = user?.orderCount ?? 0;
  const totalSpend = user?.totalSpend ?? 0;
  const isActive = user?.isActive ?? true;

  // Level & status membership sekarang dihitung dari "points" milik RewardsContext,
  // supaya setiap kali dapat/tukar poin, level membership ikut ter-update otomatis
  // di seluruh bagian aplikasi (Header, MemberCard, ProfileMember, dst).
  const level = getLevelFromPoints(points);
  const status = getMemberStatus({ isActive, orderCount, totalSpend, level });

  // Hitung total kuantitas item yang ada di keranjang untuk badge ikon cart
  const cartCount = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

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
    setIsRewardsOpen(false);
  };

  // Handler tukar poin menjadi voucher
  const handleRedeem = (rewardId) => {
    const result = redeemReward(rewardId);
    if (result.success) {
      setRedeemFeedback({
        type: "success",
        message: `Berhasil ditukar! Kode voucher: ${result.voucher.code}`,
      });
    } else {
      setRedeemFeedback({ type: "error", message: result.message });
    }
    setTimeout(() => setRedeemFeedback(null), 3500);
  };

  // Handler salin kode voucher ke clipboard
  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  // Effect untuk menghandle klik di luar elemen
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shopRef.current && !shopRef.current.contains(event.target)) {
        setIsShopOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (rewardsRef.current && !rewardsRef.current.contains(event.target)) {
        setIsRewardsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
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

        {/* CONDITIONAL RENDERING: Menu Shop */}
        {user && (
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
            {/* ==================================================== */}
            {/* POIN REWARD — MARKETING AUTOMATION (BARU) */}
            {/* ==================================================== */}
            <div className="relative" ref={rewardsRef}>
              <button
                onClick={() => {
                  setIsRewardsOpen(!isRewardsOpen);
                  setIsNotifOpen(false);
                  setIsShopOpen(false);
                  setIsProfileOpen(false);
                }}
                className="text-2xl hover:text-gray-600 transition cursor-pointer relative flex items-center justify-center p-1 mt-1 outline-none"
              >
                <FiGift />
                {availableVouchers.length > 0 && (
                  <span className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold border-2 border-white">
                    {availableVouchers.length}
                  </span>
                )}
              </button>

              {isRewardsOpen && (
                <div className="absolute right-[-40px] md:right-0 mt-3 w-[340px] md:w-[380px] bg-white border border-gray-200 rounded-2xl shadow-2xl z-[999] overflow-hidden">
                  {/* Header: Saldo Poin & Level */}
                  <div className="p-4 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white">
                    <p className="text-[10px] uppercase tracking-[.2em] text-zinc-400">
                      Poin Reward Anda
                    </p>
                    <div className="flex items-end justify-between mt-1">
                      <span className="text-2xl font-black">
                        {points} <span className="text-xs font-medium text-zinc-400">PTS</span>
                      </span>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                          LEVEL_BADGE_CLASSES?.[level] || "bg-white text-black"
                        }`}
                      >
                        {level}
                      </span>
                    </div>
                  </div>

                  {/* Feedback tukar poin (sukses/gagal) */}
                  {redeemFeedback && (
                    <div
                      className={`px-4 py-2 text-xs font-bold ${
                        redeemFeedback.type === "success"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {redeemFeedback.message}
                    </div>
                  )}

                  <div className="max-h-[360px] overflow-y-auto">
                    {/* Katalog Tukar Poin */}
                    <div className="p-4">
                      <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3">
                        Tukar Poin
                      </h4>
                      <div className="space-y-2">
                        {rewardCatalog.map((reward) => (
                          <div
                            key={reward.id}
                            className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100"
                          >
                            <div>
                              <p className="text-xs font-bold text-gray-900">{reward.label}</p>
                              <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                                {reward.description}
                              </p>
                              <p className="text-[10px] font-bold text-amber-600 mt-1">
                                {reward.cost} Poin
                              </p>
                            </div>
                            <button
                              onClick={() => handleRedeem(reward.id)}
                              disabled={points < reward.cost}
                              className="text-[10px] font-black uppercase tracking-wider px-3 py-2 rounded-full bg-black text-white disabled:bg-gray-200 disabled:text-gray-400 hover:bg-gray-800 transition cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
                            >
                              Tukar
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Voucher Saya (hasil tukar poin, siap dipakai saat checkout) */}
                    {availableVouchers.length > 0 && (
                      <div className="p-4 border-t border-gray-100">
                        <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3">
                          Voucher Saya ({availableVouchers.length})
                        </h4>
                        <div className="space-y-2">
                          {availableVouchers.map((v) => (
                            <div
                              key={v.code}
                              className="flex items-center justify-between gap-3 p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl"
                            >
                              <div>
                                <p className="text-xs font-bold text-gray-900">{v.label}</p>
                                <p className="text-[10px] font-mono text-gray-500 mt-0.5">{v.code}</p>
                              </div>
                              <button
                                onClick={() => handleCopyCode(v.code)}
                                className="text-[10px] font-black uppercase tracking-wider px-3 py-2 rounded-full bg-white border border-gray-200 hover:bg-gray-100 transition cursor-pointer whitespace-nowrap"
                              >
                                {copiedCode === v.code ? "Tersalin!" : "Salin Kode"}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-3 text-center border-t border-gray-100 bg-gray-50">
                    <span className="text-[10px] text-gray-400 font-medium">
                      Pakai kode voucher saat checkout di halaman keranjang
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* NOTIFICATION */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setIsNotifOpen(!isNotifOpen);
                  setIsShopOpen(false);
                  setIsProfileOpen(false);
                  setIsRewardsOpen(false);
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
                <div className="absolute right-[-40px] md:right-0 mt-3 w-[320px] md:w-[360px] bg-white border border-gray-200 rounded-2xl shadow-2xl z-[999] overflow-hidden">
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

            {/* CART (Sudah Diperbaiki Agar Bisa Diklik & Memiliki Badge Kuantitas) */}
            <button 
              onClick={() => navigate("/cart")}
              className="text-2xl cursor-pointer hover:text-gray-600 transition relative flex items-center justify-center p-1 mt-1 outline-none"
            >
              <FiShoppingCart />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-black text-white text-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* PROFILE DROPDOWN */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotifOpen(false);
                  setIsShopOpen(false);
                  setIsRewardsOpen(false);
                }}
                className="text-2xl cursor-pointer hover:text-gray-600 transition"
              >
                <FiUser />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-4 w-64 bg-white border shadow-xl rounded-2xl p-4 z-[999]">
                  {/* Data profil dinamis menggunakan data dari AuthContext */}
                  <p className="font-bold">{user?.name || "Dzikri Maulana"}</p>
                  <p className="text-sm text-gray-500 capitalize">{status || "Member"}</p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-400">
                      <FiAward className="text-xs" />
                      Gold Member
                    </span>
                  </div>

                  {/* TOMBOL PROFILE MEMBER */}
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

                  {/* TOMBOL RIWAYAT PESANAN */}
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate("/pesanan");
                    }}
                    className="mt-2 w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-800 text-sm font-medium py-2.5 rounded-full transition-all duration-300 hover:bg-gray-200 cursor-pointer"
                  >
                    <FiPackage />
                    Riwayat Pesanan
                  </button>

                  {/* TOMBOL LOGOUT */}
                  <button
                    onClick={logout}
                    className="mt-3 w-full flex items-center justify-center gap-2 text-red-500 text-sm font-medium py-2 
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