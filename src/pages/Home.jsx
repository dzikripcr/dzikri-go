import React, { useState, useEffect } from "react";
// Mengimpor data JSON produk
import productsData from "../data/products.json";

// Mengimpor ikon-ikon dari react-icons
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiChevronDown,
  FiArrowLeft,
  FiArrowRight,
  FiMail,
  FiBell,
} from "react-icons/fi";
import { FaStar, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { BsCheckCircleFill } from "react-icons/bs";

const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let animationFrameId = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Efek Easing (EaseOutExpo)
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    // Cleanup untuk membatalkan animasi jika komponen unmount sebelum selesai
    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [end, duration]);

  return <>{count.toLocaleString()}</>;
};

export default function Home() {
  // State untuk kontrol buka/tutup pop-up notifikasi
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // State untuk mendeteksi apakah layar sedang di-scroll
  const [isScrolled, setIsScrolled] = useState(false);

  // Membagi data produk untuk 2 section langsung dari data yang di-import
  const newArrivals = productsData.slice(0, 4);
  const topSelling = productsData.slice(4, 8);

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

  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece has exceeded my expectations.",
    },
    {
      id: 2,
      name: "Alex K.",
      text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    },
    {
      id: 3,
      name: "James L.",
      text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    },
  ];

  return (
    <div className="font-sans text-gray-900 bg-white">
      {/* SMART STICKY NAVBAR DENGAN EFEK GLASSMORPHISM */}
      <header
        className={`sticky top-0 z-[100] transition-all duration-500 ease-in-out flex items-center justify-between px-8 ${
          isScrolled
            ? "py-3 bg-white/60 backdrop-blur-xl backdrop-saturate-150 shadow-sm border-b border-white/50"
            : "py-5 bg-white border-b border-gray-200"
        }`}
      >
        <h1
          className={`font-black uppercase tracking-tighter cursor-pointer transition-all duration-500 ${
            isScrolled ? "text-2xl" : "text-3xl"
          }`}
        >
          Boutique
        </h1>

        <nav className="hidden md:flex space-x-6 font-medium">
          <a href="#" className="hover:text-gray-600 flex items-center gap-1">
            Shop <FiChevronDown className="text-sm mt-0.5" />
          </a>
          <a href="#" className="hover:text-gray-600">
            On Sale
          </a>
          <a href="#" className="hover:text-gray-600">
            New Arrivals
          </a>
          <a href="#" className="hover:text-gray-600">
            Brands
          </a>
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
              onClick={() => setIsNotifOpen(!isNotifOpen)}
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
                      className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition duration-200 flex flex-col gap-1 ${notif.unread ? "bg-blue-50/40" : ""}`}
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

      {/* HERO SECTION */}
      <section className="bg-[#F2F0F1] pt-16 md:pt-24 flex flex-col md:flex-row items-stretch overflow-hidden">
        <div className="px-8 md:px-28 md:w-1/2 space-y-6 md:pr-10 pb-16 md:pb-24 flex flex-col justify-center">
          <h2 className="text-5xl md:text-7xl font-black leading-none uppercase tracking-tighter">
            FIND CLOTHES
            <br />
            THAT MATCHES
            <br />
            YOUR STYLE
          </h2>
          <p className="text-gray-600 max-w-md leading-relaxed text-sm md:text-base">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <button
            className="bg-black text-white px-12 py-4 rounded-full font-medium 
                       transition-all duration-300 ease-in-out 
                       hover:bg-gray-800 hover:scale-105 hover:shadow-2xl hover:shadow-black/40
                       active:scale-95 active:bg-black w-full md:w-auto cursor-pointer"
          >
            Shop Now
          </button>
          <div className="flex flex-wrap gap-8 pt-6">
            <div>
              <p className="text-3xl md:text-4xl font-bold">
                <AnimatedCounter end={198} duration={1500} />+
              </p>
              <p className="text-sm text-gray-500">International Brands</p>
            </div>
            <div className="border-l border-gray-300 pl-8">
              <p className="text-3xl md:text-4xl font-bold">
                <AnimatedCounter end={2786} duration={2000} />+
              </p>
              <p className="text-sm text-gray-500">High-Quality Products</p>
            </div>
            <div className="border-l border-gray-300 pl-8 hidden sm:block">
              <p className="text-3xl md:text-4xl font-bold">
                <AnimatedCounter end={31298} duration={2500} />+
              </p>
              <p className="text-sm text-gray-500">Happy Customers</p>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center items-end relative w-full px-8 md:px-0">
          <img
            src="../img/model.png"
            alt="Hero Models"
            className="w-full h-auto object-contain max-h-[600px] object-bottom"
          />
        </div>
      </section>

      {/* BRANDS BANNER (INFINITE SCROLL ANIMATION) */}
      <div className="bg-black py-8 overflow-hidden relative flex items-center group">
        <style>
          {`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-scroll {
              display: flex;
              width: max-content;
              animation: scroll 35s linear infinite;
            }
            .group:hover .animate-scroll {
              animation-play-state: paused;
            }
          `}
        </style>
        <div className="absolute top-0 left-0 w-16 md:w-40 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-16 md:w-40 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

        <div className="animate-scroll flex items-center gap-12 md:gap-24 px-6">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              {[
                "VERSACE",
                "ZARA",
                "GUCCI",
                "PRADA",
                "Calvin Klein",
                "CHANEL",
                "DIOR",
                "BURBERRY",
                "HERMÈS",
                "BALENCIAGA",
                "LOUIS VUITTON",
                "ARMANI",
              ].map((brand, index) => (
                <span
                  key={`${brand}-${i}-${index}`}
                  className="text-white text-2xl md:text-4xl font-serif font-bold tracking-widest opacity-90 whitespace-nowrap hover:text-gray-300 hover:scale-110 transition-all duration-300 cursor-default"
                >
                  {brand}
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* NEW ARRIVALS & TOP SELLING */}
      {[
        { title: "NEW ARRIVALS", data: newArrivals },
        { title: "TOP SELLING", data: topSelling },
      ].map((section, idx) => (
        <section
          key={idx}
          className={`py-16 px-8 max-w-7xl mx-auto ${idx === 0 ? "border-b border-gray-200" : ""}`}
        >
          <h3 className="text-4xl font-black text-center mb-12 uppercase tracking-tight">
            {section.title}
          </h3>
          {!section.data || section.data.length === 0 ? (
            <p className="text-center text-gray-500">
              Tidak ada produk tersedia.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {section.data.map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer group flex flex-col"
                >
                  <div className="bg-[#F0EEED] aspect-[4/5] rounded-[20px] mb-4 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    />
                    {item.status !== "In Stock" && (
                      <div
                        className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded text-white ${item.status === "Out of Stock" ? "bg-red-500" : "bg-orange-500"}`}
                      >
                        {item.status}
                      </div>
                    )}
                  </div>
                  <h4 className="font-bold text-lg leading-tight mb-1">
                    {item.name}
                  </h4>
                  <div className="flex items-center space-x-1 mb-2">
                    <FaStar className="text-[#FFC633] text-sm" />
                    <FaStar className="text-[#FFC633] text-sm" />
                    <FaStar className="text-[#FFC633] text-sm" />
                    <FaStar className="text-[#FFC633] text-sm" />
                    <FaStar className="text-gray-300 text-sm" />
                    <span className="text-sm text-gray-500 ml-1">4.0/5</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <button className="border border-gray-200 bg-white cursor-pointer text-black px-16 py-3 rounded-full font-medium transition-all duration-300 ease-in-out hover:bg-black hover:text-white hover:border-black hover:shadow-lg w-full md:w-auto">
              View All
            </button>
          </div>
        </section>
      ))}

      {/* BROWSE BY DRESS STYLE */}
      <section className="px-8 py-10 max-w-7xl mx-auto">
        <div className="bg-[#F0F0F0] rounded-[40px] px-8 py-16 md:px-16">
          <h3 className="text-4xl font-black text-center mb-12 uppercase tracking-tight">
            BROWSE BY DRESS STYLE
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
            {/* 1. CASUAL CARD */}
            <div className="group relative rounded-3xl overflow-hidden h-64 md:h-auto hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80"
                alt="Casual"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
              <span className="absolute top-8 left-8 text-3xl font-bold text-white z-10 tracking-wide">
                Casual
              </span>
            </div>
            {/* 2. FORMAL CARD */}
            <div className="group relative rounded-3xl overflow-hidden h-64 md:h-auto md:col-span-2 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <img
                src="https://plus.unsplash.com/premium_photo-1661434624086-e02557c68815?w=600&auto=format&fit=crop&q=60"
                alt="Formal"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
              <span className="absolute top-8 left-8 text-3xl font-bold text-white z-10 tracking-wide">
                Formal
              </span>
            </div>
            {/* 3. PARTY CARD */}
            <div className="group relative rounded-3xl overflow-hidden h-64 md:h-auto md:col-span-2 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1589810635657-232948472d98?w=600&auto=format&fit=crop&q=60"
                alt="Party"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
              <span className="absolute top-8 left-8 text-3xl font-bold text-white z-10 tracking-wide">
                Party
              </span>
            </div>
            {/* 4. GYM CARD */}
            <div className="group relative rounded-3xl overflow-hidden h-64 md:h-auto hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <img
                src="https://images.unsplash.com/flagged/photo-1564714388616-9cdfa2b8063e?w=600&auto=format&fit=crop&q=60"
                alt="Gym"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
              <span className="absolute top-8 left-8 text-3xl font-bold text-white z-10 tracking-wide">
                Gym
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - LUXURY MARQUEE SECTION (AUTO-ONLY) */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-[#fafafa] to-white">
        {/* CSS Khusus untuk Marquee Review */}
        <style>
          {`
            @keyframes marquee-review {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee-review {
              display: flex;
              width: max-content;
              animation: marquee-review 40s linear infinite;
            }
            .review-container:hover .animate-marquee-review {
              animation-play-state: paused;
            }
          `}
        </style>

        <div className="max-w-7xl mx-auto px-8 flex justify-between items-end mb-16 relative z-20">
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900">
            Our Happy Customers
          </h3>
          <div className="hidden md:flex gap-2 opacity-50">
            <FaStar className="text-gray-300 text-3xl" />
            <FaStar className="text-gray-300 text-4xl -mt-4" />
            <FaStar className="text-gray-300 text-2xl" />
          </div>
        </div>

        {/* MARQUEE WRAPPER */}
        <div className="relative w-full review-container overflow-hidden pb-10">
          <div className="absolute top-0 left-0 w-16 md:w-48 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-16 md:w-48 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="animate-marquee-review flex items-stretch gap-6 md:gap-8 px-4 md:px-8">
            {[...Array(3)].map((_, arrayIndex) => (
              <React.Fragment key={arrayIndex}>
                {testimonials.map((testi, index) => (
                  <div
                    key={`${testi.id}-${arrayIndex}-${index}`}
                    className="w-[320px] md:w-[420px] flex-shrink-0 bg-white border border-gray-100 rounded-[32px] p-8 md:p-10 transition-all duration-500 ease-out hover:-translate-y-3 hover:border-gray-200 hover:shadow-[0_20px_50px_rgb(0,0,0,0.06)] group relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none z-0"></div>

                    <div className="relative z-10">
                      <div className="flex space-x-1 text-[#FFC633] mb-6 text-xl">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                      <h4 className="font-extrabold text-2xl mb-4 flex items-center gap-2 text-gray-900">
                        {testi.name}{" "}
                        <BsCheckCircleFill className="text-green-500 text-xl" />
                      </h4>
                      <p className="text-gray-500 leading-relaxed text-base md:text-lg font-medium">
                        "{testi.text}"
                      </p>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* BUTTON VIEW ALL REVIEWS */}
        <div className="flex justify-center mt-12 relative z-20 px-8">
          <button className="group relative px-10 py-4 bg-transparent text-gray-900 font-bold text-lg rounded-full overflow-hidden border-2 border-gray-900 transition-all duration-300 cursor-pointer">
            <div className="absolute inset-0 bg-gray-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
            <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
              View All Customer Reviews
              <FiArrowRight className="text-xl group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </section>

      {/* FOOTER & NEWSLETTER */}
      <footer className="bg-[#F0F0F0] mt-40 relative pt-32 pb-20 px-8">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-7xl bg-black rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl text-white font-black leading-tight mb-8 md:mb-0 md:w-1/2 uppercase tracking-tight">
            STAY UPTO DATE ABOUT
            <br />
            OUR LATEST OFFERS
          </h2>
          <div className="flex flex-col space-y-4 w-full md:w-[40%]">
            <div className="relative group">
              <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-black transition-colors duration-300" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="pl-12 pr-6 py-4 rounded-full w-full outline-none text-black bg-white focus:ring-4 focus:ring-gray-300/50 transition-all duration-300"
              />
            </div>
            <button className="bg-white text-black font-extrabold px-6 py-4 rounded-full w-full transition-all duration-300 ease-out relative outline-none hover:bg-white hover:scale-105 hover:shadow-[0_0_15px_#fff,0_0_30px_#fff,0_0_45px_rgba(255,255,255,0.6)] active:scale-95 active:shadow-[0_0_10px_#fff]">
              Subscribe to Newsletter
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 border-b border-gray-300 pt-8 pb-12">
          <div className="md:col-span-1 space-y-6">
            <h3 className="text-3xl font-black uppercase tracking-tighter">
              Boutique
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              We have clothes that suit your style and which you're proud to
              wear. From women to men.
            </p>
            <div className="flex space-x-3 pt-2">
              <div className="w-9 h-9 rounded-full border border-gray-300 bg-white text-black flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition cursor-pointer text-lg">
                <RiTwitterXFill />
              </div>
              <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 transition cursor-pointer text-lg">
                <FaFacebookF />
              </div>
              <div className="w-9 h-9 rounded-full border border-gray-300 bg-white text-black flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition cursor-pointer text-lg">
                <FaInstagram />
              </div>
              <div className="w-9 h-9 rounded-full border border-gray-300 bg-white text-black flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition cursor-pointer text-lg">
                <FaGithub />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold tracking-widest mb-6 uppercase">
              COMPANY
            </h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-black transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Career
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold tracking-widest mb-6 uppercase">HELP</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-black transition">
                  Customer Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Delivery Details
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold tracking-widest mb-6 uppercase">FAQ</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-black transition">
                  Account
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Manage Deliveries
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Orders
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Payments
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold tracking-widest mb-6 uppercase">
              RESOURCES
            </h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-black transition">
                  Free eBooks
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Development Tutorial
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  How to - Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Youtube Playlist
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>Boutique © 2025/2026, All Rights Reserved</p>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <div className="bg-white border rounded px-3 py-1 shadow-sm font-bold text-xs text-blue-900">
              VISA
            </div>
            <div className="bg-white border rounded px-3 py-1 shadow-sm font-bold text-xs">
              Mastercard
            </div>
            <div className="bg-white border rounded px-3 py-1 shadow-sm font-bold text-xs">
              PayPal
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
