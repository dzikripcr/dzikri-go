import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Mengimpor data JSON produk
import productsData from "@/data/products.json";
import Header from "@/components/crm/Header";
import HeroSection from "@/components/crm/HeroSection";
import BrandsBanner from "@/components/crm/BrandsBanner";
import NewArrivals from "@/components/crm/NewArrivals";
import TopSelling from "@/components/crm/TopSelling";
import DressStyle from "@/components/crm/DressStyle";
import Testimonials from "@/components/crm/Testimonials";
import Footer from "@/components/crm/Footer";
import Chat from "@/components/crm/Chat";

export default function Home() {
  const location = useLocation();

  // Membagi data produk untuk 2 section langsung dari data yang di-import
  const newArrivals = productsData.slice(0, 4);
  const topSelling = productsData.slice(4, 8);

  // Kalau Home dibuka dengan instruksi "scrollTo" (dikirim oleh Header saat
  // user klik menu navigasi dari halaman lain, misal dari ProductDetail),
  // scroll otomatis ke section yang dimaksud setelah halaman ini selesai render.
  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;

      const timer = setTimeout(() => {
        const target = document.getElementById(sectionId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="font-sans text-gray-900 bg-white">
      <Header />
      <HeroSection />
      <BrandsBanner />
      <NewArrivals products={newArrivals} />
      <TopSelling products={topSelling} />
      <DressStyle />
      <Testimonials />
      <Footer />
      <Chat />
    </div>
  );
}