import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiChevronDown,
  FiBell,
  FiLogOut,
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const [isShopOpen, setIsShopOpen] = useState(false);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  // scrollToSection sekarang "sadar route":
  // - Kalau user sedang berada di halaman Home ("/"), langsung scroll ke section.
  // - Kalau user sedang di halaman lain (misal /product/:id), pindah ke Home dulu
  //   sambil membawa instruksi section tujuan lewat router state, lalu Home.jsx
  //   yang akan melakukan scroll setelah halamannya selesai dirender.
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
  };

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
      title: "Pesanan Dikirim 🚚",
      desc: "Paket Anda sedang perjalanan",
      time: "2 jam lalu",
      unread: true,
    },

    {
      id: 2,
      title: "Diskon 50% ✨",
      desc: "Promo khusus hari ini",
      time: "5 jam lalu",
      unread: true,
    },

    {
      id: 3,
      title: "Midnight Sale",
      desc: "Diskon sampai 70%",
      time: "1 hari lalu",
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
        className="
            font-black
            uppercase
            tracking-tighter
            cursor-pointer
            text-3xl
            "
      >
        BOUTIQUE
      </h1>

      {/* MENU */}

      <nav
        className="
            hidden md:flex
            space-x-6
            font-medium
            "
      >
        <button className="cursor-pointer" onClick={() => scrollToSection("hero")}>Home</button>

        <div className="relative">
          <button
            onClick={() => {
              setIsShopOpen(!isShopOpen);
            }}
            className="
                flex items-center gap-1
                cursor-pointer
                "
          >
            Shop
            <FiChevronDown />
          </button>

          {isShopOpen && (
            <div
              className="
                absolute
                top-8
                left-0
                w-48
                bg-white
                rounded-xl
                shadow-xl
                border
                p-2
                "
            >
              <button
                onClick={() => scrollToSection("new-arrivals")}
                className="block w-full text-left p-3 hover:bg-gray-100 cursor-pointer"
              >
                New Arrivals
              </button>

              <button
                onClick={() => scrollToSection("top-selling")}
                className="block w-full text-left p-3 hover:bg-gray-100 cursor-pointer"
              >
                Top Selling
              </button>

              <button
                onClick={() => scrollToSection("dress-style")}
                className="block w-full text-left p-3 hover:bg-gray-100 cursor-pointer"
              >
                Style
              </button>
            </div>
          )}
        </div>

        <button className="cursor-pointer" onClick={() => scrollToSection("new-arrivals")}>
          New Arrivals
        </button>

        <button className="cursor-pointer" onClick={() => scrollToSection("top-selling")}>On Sale</button>

        <button className="cursor-pointer" onClick={() => scrollToSection("testimonials")}>
          Testimonials
        </button>
      </nav>

      {/* RIGHT AREA */}
      <div
        className="
            flex
            items-center
            gap-5
            "
      >
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
          <FiSearch
            className="
            text-gray-500
            mr-2
            text-xl
            transition-colors
            duration-300
            group-focus-within:text-black
            "
          />

          <input
            type="text"
            placeholder="Search for products..."
            className="
            bg-transparent
            outline-none
            w-full
            text-sm
            text-gray-900
            placeholder-gray-500
            "
          />
        </div>

        {/* GUEST */}

        {!user ? (
          <Link
            to="/login"
            className="
                group
                relative
                overflow-hidden
                flex
                items-center
                justify-center
                gap-2
                bg-black
                text-white
                px-10
                py-3.5
                rounded-full
                font-medium
                tracking-wide
                shadow-xl
                shadow-black/20
                transition-all
                duration-300
                ease-out
                hover:bg-gray-800
                hover:scale-105
                hover:-translate-y-1
                hover:shadow-2xl
                hover:shadow-black/40
                active:scale-95
                cursor-pointer
            "
          >
            {/* efek cahaya */}
            <span
              className="
                absolute
                inset-0
                bg-gradient-to-r
                from-transparent
                via-white/30
                to-transparent
                translate-x-[-120%]
                group-hover:translate-x-[120%]
                transition-transform
                duration-700
                ease-in-out
                "
            ></span>

            <span
              className="
                relative
                z-10
                "
            >
              Login
            </span>

            <span
              className="
                relative
                z-10
                transition-transform
                duration-300
                group-hover:translate-x-1
                "
            >
              →
            </span>
          </Link>
        ) : (
          <>
            {/* NOTIFICATION */}

            <div className="relative">
              <button
                onClick={() => {
                  setIsNotifOpen(!isNotifOpen);
                  setIsProfileOpen(false);
                }}
                className="
                    text-2xl
                    relative
                    "
              >
                <FiBell />

                {unreadCount > 0 && (
                  <span
                    className="
                        absolute
                        top-[-5px]
                        right-[-5px]
                        bg-red-500
                        text-white
                        text-xs
                        rounded-full
                        w-5
                        h-5
                        flex
                        items-center
                        justify-center
                        "
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotifOpen && (
                <div
                  className="
                    absolute
                    right-0
                    mt-4
                    w-80
                    bg-white
                    rounded-xl
                    shadow-xl
                    border
                    overflow-hidden
                    "
                >
                  <div
                    className="
                        p-4
                        font-bold
                        border-b
                        "
                  >
                    Notification
                  </div>

                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className="
                        p-4
                        hover:bg-gray-50
                        border-b
                        "
                    >
                      <div className="font-semibold">{item.title}</div>

                      <p className="text-sm text-gray-500">{item.desc}</p>

                      <span className="text-xs text-gray-400">{item.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CART */}

            <button className="text-2xl">
              <FiShoppingCart />
            </button>

            {/* PROFILE */}

            <div className="relative">
              <button
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotifOpen(false);
                }}
                className="text-2xl"
              >
                <FiUser />
              </button>

              {isProfileOpen && (
                <div
                  className="
                    absolute
                    right-0
                    mt-4
                    w-48
                    bg-white
                    border
                    shadow-xl
                    rounded-xl
                    p-3
                    "
                >
                  <p className="font-bold">{user.name}</p>

                  <p className="text-sm text-gray-500">{user.role}</p>

                  <button
                    onClick={logout}
                    className="
                        mt-3
                        flex
                        items-center
                        gap-2
                        text-red-500
                        "
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