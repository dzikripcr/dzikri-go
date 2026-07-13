import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Mengimpor data JSON produk
import productsData from "@/data/products.json";
import Header from "@/components/crm/Header";
import HeroSection from "@/components/crm/HeroSection";
import MembershipSection from "@/components/crm/membership/MembershipSection";
import BrandsBanner from "@/components/crm/BrandsBanner";
import NewArrivals from "@/components/crm/NewArrivals";
import TopSelling from "@/components/crm/TopSelling";
import DressStyle from "@/components/crm/DressStyle";
import Testimonials from "@/components/crm/Testimonials";
import Footer from "@/components/crm/Footer";
import Chat from "@/components/crm/Chat";
import WhyChooseUs from "@/components/crm/WhyChooseUs";

import { useAuth } from "../../context/AuthContext"; 
import { useCart } from "../../context/CartContext"; // Import untuk membaca state order global
import { FiTruck, FiArrowRight } from "react-icons/fi";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const { orders } = useCart(); // Destructuring orders dari data transaksi belanja

  const isMember = !!user; 

  // Filter untuk mencari apakah ada pesanan member yang saat ini berstatus sedang dikirim/proses
  const activeOrder = orders.find(order => order.status !== "diterima");

  const newArrivals = productsData.slice(0, 4);
  const topSelling = productsData.slice(4, 8);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      const timer = setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className="font-sans text-gray-900 bg-white antialiased selection:bg-black selection:text-white">
      <Header />
      
      <HeroSection />
      <BrandsBanner />
      
      {isMember && activeOrder && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 animate-fadeIn">
          <div className="bg-black text-white p-4 rounded-[20px] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center animate-bounce">
                <FiTruck className="text-white text-lg" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wider">Paket Anda Sedang Meluncur!</p>
                <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                  Pesanan <span className="font-mono font-bold text-white">{activeOrder.id}</span> saat ini berstatus <span className="underline uppercase font-bold text-white">{activeOrder.status}</span>.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/pesanan")}
              className="bg-white text-black text-[11px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-gray-100 transition flex items-center gap-1.5 cursor-pointer w-full sm:w-auto justify-center"
            >
              Lacak Paket <FiArrowRight size={12} />
            </button>
          </div>
        </div>
      )}

      {/* TAMPILAN KHUSUS MEMBER */}
      {isMember && (
        <>
          <div id="new-arrivals">
            <NewArrivals products={newArrivals} />
          </div>
          <div id="top-selling">
            <TopSelling products={topSelling} />
          </div>
          <div id="dress-style">
            <DressStyle />
          </div>
        </>
      )}

      {/* TAMPILAN KHUSUS GUEST (BELUM LOGIN) */}
      {!isMember && (
        <>
          <div id="alasan">
            <WhyChooseUs />
          </div>
          <div id="membership">
            <MembershipSection />
          </div>
        </>
      )}

      <div id="testimonials">
        <Testimonials />
      </div>
      
      <Footer />
      <Chat />
    </div>
  );
}