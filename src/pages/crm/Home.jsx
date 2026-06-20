import React from "react";
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
  // Membagi data produk untuk 2 section langsung dari data yang di-import
  const newArrivals = productsData.slice(0, 4);
  const topSelling = productsData.slice(4, 8);

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