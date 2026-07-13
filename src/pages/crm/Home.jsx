import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

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

export default function Home() {
  const location = useLocation();
  const { user } = useAuth(); 

  const isMember = !!user; 

  // Membagi data dummy produk untuk section katalog
  const newArrivals = productsData.slice(0, 4);
  const topSelling = productsData.slice(4, 8);

  // Efek handling scroll ke ID target jika diarahkan navigasi dari halaman lain
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
      {/* Header otomatis aman karena sudah berada di bawah lingkup CartProvider di App.jsx */}
      <Header />
      
      <HeroSection />
      <BrandsBanner />
      
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