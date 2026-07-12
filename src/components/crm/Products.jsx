import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FiSliders } from "react-icons/fi";
import productsData from "../../data/products.json";

// Import komponen kartu produk yang baru saja dipisahkan
import ProductCardWithActions from "./ProductCardWithActions"; 

import Header from "./Header";
import Footer from "./Footer";
import Chat from "./Chat";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedStyle, setSelectedStyle] = useState("Semua");
  
  // State menentukan batas jumlah produk yang di-render (kelipatan 4 agar grid rapi)
  const [visibleProducts, setVisibleProducts] = useState(8);

  const categories = [
    "Semua", 
    "Gaun", 
    "Aksesoris", 
    "Perhiasan", 
    "Pakaian Luar", 
    "Sepatu", 
    "Atasan", 
    "Bawahan",
    "Tas",
    "Pakaian Tidur",
    "Pakaian Renang",
    "Busana Muslim",
    "Wewangian"
  ];
  
  const styles = [
    "Semua", 
    "Kasual", 
    "Formal", 
    "Pesta", 
    "Olahraga", 
    "Pantai",
    "Preppy",
    "Vintage",
    "Edgy",
    "Bohemian"
  ];

  // Format Helper mata uang Rupiah
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Logika Penyaringan (Filter) & Fitur Pencarian
  const filteredProducts = productsData.filter((product) => {
    const matchesSearch = product.nama.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || product.kategori === selectedCategory;
    const matchesStyle = selectedStyle === "Semua" || product.gaya === selectedStyle;
    return matchesSearch && matchesCategory && matchesStyle;
  });

  // Reset kuota pameran produk kembali ke 8 setiap kali kriteria pencarian/filter diubah
  useEffect(() => {
    setVisibleProducts(8);
  }, [searchQuery, selectedCategory, selectedStyle]);

  // Fungsi menambah batas penampilan produk sebanyak +12 produk baru
  const handleLoadMoreProducts = () => {
    setVisibleProducts((prev) => Math.min(filteredProducts.length, prev + 12));
  };

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-10">
        {/* Header Title */}
        <div className="text-center md:text-left mb-8">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-2">Koleksi Produk Butik</h2>
          <p className="text-gray-500 text-sm md:text-base">Temukan produk berkualitas tinggi yang sesuai dengan gaya personal Anda.</p>
        </div>

        {/* Toolbar: Filter & Pencarian */}
        <div className="bg-[#F2F0F1] p-6 rounded-[24px] mb-10 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:gap-4">
          
          {/* Input Box Pencarian */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Cari nama pakaian atau aksesoris..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white pl-11 pr-4 py-3 rounded-full text-sm outline-none border border-transparent focus:border-black transition"
            />
          </div>

          {/* Pengaturan Filter Dropdown */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 bg-white px-4 py-2.5 rounded-full border border-gray-200 text-sm font-medium">
              <FiSliders className="text-gray-500" />
              <span className="text-gray-600 hidden sm:inline">Filter</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white px-4 py-2.5 rounded-full border border-gray-200 text-sm font-medium outline-none text-gray-700 cursor-pointer"
              >
                <option value="Semua">Semua Kategori</option>
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="bg-white px-4 py-2.5 rounded-full border border-gray-200 text-sm font-medium outline-none text-gray-700 cursor-pointer"
              >
                <option value="Semua">Semua Gaya</option>
                {styles.slice(1).map((sty) => (
                  <option key={sty} value={sty}>{sty}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Info Total Data Terfilter */}
        <div className="mb-6 flex justify-between items-center text-sm text-gray-500 px-1">
          <span>Menampilkan {Math.min(visibleProducts, filteredProducts.length)} dari {filteredProducts.length} produk</span>
        </div>

        {/* Kondisional Rendering: Jika produk kosong atau ada */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-gray-50 rounded-[32px] border border-dashed border-gray-200">
            <p className="text-gray-500 font-medium text-lg">Produk tidak ditemukan.</p>
            <p className="text-gray-400 text-sm mt-1">Cobalah menggunakan kata kunci lain atau ubah setelan filter Anda.</p>
          </div>
        ) : (
          <>
            {/* Grid Layout Produk menggunakan irisan slice */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {filteredProducts.slice(0, visibleProducts).map((item) => (
                <ProductCardWithActions 
                  key={item.id} 
                  item={item} 
                  formatRupiah={formatRupiah} 
                />
              ))}
            </div>

            {/* Tombol Load More: Ditampilkan hanya jika kuota masih tersisa */}
            {visibleProducts < filteredProducts.length && (
              <div className="text-center mt-12 mb-10">
                <button
                  onClick={handleLoadMoreProducts}
                  className="border border-gray-200 px-12 py-3 rounded-full font-medium hover:bg-black hover:text-white hover:border-black transition-all duration-300 cursor-pointer text-sm"
                >
                  Tampilkan Lebih Banyak Produk
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
      <Chat />
    </div>
  );
}