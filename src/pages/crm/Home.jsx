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

// Mengimpor Auth Context yang sama dengan Header
import { useAuth } from "../../context/AuthContext"; 

export default function Home() {
  const location = useLocation();
  
  // Ambil data 'user' langsung dari AuthContext global
  const { user } = useAuth(); 

  // Menentukan status member: jika 'user' ada/tidak null, berarti dia adalah Member yang sudah login
  const isMember = !!user; 

  const newArrivals = productsData.slice(0, 4);
  const topSelling = productsData.slice(4, 8);

  useEffect(() => {
    // Logika scroll berdasarkan state navigasi
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;

      const timer = setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className="font-sans text-gray-900 bg-white">
      <Header />
      <HeroSection />
      <BrandsBanner />
      
      {/* KONDISI 1: JIKA USER SUDAH REGISTER & LOGIN (MEMBER) */}
      {isMember && (
        <>
          <NewArrivals products={newArrivals} />
          <TopSelling products={topSelling} />
          <DressStyle />
        </>
      )}

      {/* KONDISI 2: JIKA USER BELUM LOGIN (GUEST) */}
      {!isMember && (
        <>
          <WhyChooseUs />
          <MembershipSection />
        </>
      )}

      {/* Komponen yang selalu muncul */}
      <Testimonials />
      <Footer />
      <Chat />
    </div>
  );
}