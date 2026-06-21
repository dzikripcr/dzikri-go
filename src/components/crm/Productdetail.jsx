import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import {
  FiChevronRight,
  FiMinus,
  FiPlus,
  FiSliders,
  FiChevronDown,
} from "react-icons/fi";

// Mengimpor data dummy produk & komponen layout yang sudah ada
import productsData from "../../data/products.json";
import Header from "../crm/Header";
import Footer from "../crm/Footer";
import CustomerService from "../crm/Chat";
import ProductCard from "../crm/ProductCard";

// ===================================================================
// HELPER - karena data dummy tidak menyediakan field ukuran, deskripsi,
// dan rating, kita generate berdasarkan kategori produk supaya tampilan
// tetap relevan & konsisten dengan tema Boutique.
// ===================================================================

// Menentukan pilihan ukuran berdasarkan kategori produk
const getSizeOptions = (category) => {
  switch (category) {
    case "Dresses":
    case "Outerwear":
    case "Tops":
    case "Bottoms":
      return ["S", "M", "L", "XL"];
    case "Shoes":
      return ["36", "37", "38", "39", "40"];
    default:
      // Accessories & Jewelry biasanya tidak memakai pilihan ukuran
      return [];
  }
};

// Deskripsi singkat berdasarkan kategori produk
const categoryDescriptions = {
  Dresses:
    "Dress elegan ini dirancang untuk membuat momen spesial Anda makin berkesan, dengan potongan yang pas di badan dan bahan premium yang nyaman dipakai sepanjang hari.",
  Accessories:
    "Aksesori eksklusif yang menjadi sentuhan akhir sempurna untuk melengkapi gaya Anda, dibuat dari material berkualitas tinggi dan tahan lama.",
  Jewelry:
    "Perhiasan cantik dengan detail halus yang menambah kesan elegan pada setiap penampilan, cocok untuk acara formal maupun kasual.",
  Outerwear:
    "Outer hangat dan stylish yang siap menemani Anda menghadapi cuaca dingin tanpa mengorbankan gaya berpenampilan.",
  Shoes:
    "Sepatu nyaman dengan desain modern, dibuat dari bahan pilihan agar tetap stylish sekaligus mendukung aktivitas harian Anda.",
  Tops:
    "Atasan ringan dan nyaman dengan potongan yang flattering, cocok dipadukan dengan berbagai gaya busana favoritmu.",
  Bottoms:
    "Bawahan dengan potongan tailored yang memberikan siluet rapi dan elegan, nyaman dipakai sepanjang hari.",
};

const getDescription = (category) =>
  categoryDescriptions[category] ||
  "Produk eksklusif dari koleksi Boutique kami, dibuat dengan perhatian penuh pada detail dan kualitas.";

// Pool review dummy generik (karena data produk tidak menyediakan review asli)
const reviewPool = [
  {
    id: 1,
    name: "Samantha D.",
    rating: 4.5,
    text: "Produknya bagus banget, kualitasnya sesuai sama harga. Aku suka banget sama detailnya!",
    date: "14 Agustus 2024",
  },
  {
    id: 2,
    name: "Alex M.",
    rating: 5,
    text: "Melebihi ekspektasi! Bahannya nyaman dan tampilannya persis seperti di foto.",
    date: "15 Agustus 2024",
  },
  {
    id: 3,
    name: "Ethan R.",
    rating: 4,
    text: "Worth it banget buat dipakai harian, desainnya juga timeless dan gampang dipadu-padankan.",
    date: "16 Agustus 2024",
  },
  {
    id: 4,
    name: "Olivia P.",
    rating: 5,
    text: "Pengiriman cepat dan packing rapi. Produknya juga sesuai banget sama deskripsi.",
    date: "17 Agustus 2024",
  },
  {
    id: 5,
    name: "Liam K.",
    rating: 5,
    text: "Kualitas premium, terasa banget pas dipegang dan dipakai. Recommended seller!",
    date: "18 Agustus 2024",
  },
  {
    id: 6,
    name: "Ava H.",
    rating: 4.5,
    text: "Bakal repeat order lagi, suka sama finishing produknya yang rapi.",
    date: "19 Agustus 2024",
  },
  {
    id: 7,
    name: "Noah S.",
    rating: 4,
    text: "Sesuai ekspektasi, harga juga cukup worth it untuk kualitas segini.",
    date: "20 Agustus 2024",
  },
  {
    id: 8,
    name: "Mia T.",
    rating: 5,
    text: "Recommended! CS-nya juga responsif waktu aku tanya-tanya sebelum order.",
    date: "21 Agustus 2024",
  },
];

// Render bintang rating (rounded ke integer terdekat dari 5)
const StarRating = ({ rating, size = "text-sm" }) => {
  const filled = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <FaStar
          key={i}
          className={`${size} ${i <= filled ? "text-[#FFC633]" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === id);

  const [quantity, setQuantity] = useState(1);
  const [visibleReviews, setVisibleReviews] = useState(4);

  // Pilihan ukuran disiapkan duluan supaya hook useState tidak melompat
  // kalau product belum ketemu (dijaga di bawah dengan fallback null).
  const sizeOptions = product ? getSizeOptions(product.category) : [];
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0] || null);

  // ===== FALLBACK kalau produk tidak ditemukan =====
  if (!product) {
    return (
      <div className="font-sans text-gray-900 bg-white">
        <Header />
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-8 py-24">
          <h2 className="text-2xl font-black mb-2 uppercase tracking-tight">
            Produk Tidak Ditemukan
          </h2>
          <p className="text-gray-500 mb-6 max-w-md">
            Produk yang Anda cari mungkin sudah tidak tersedia atau link-nya salah.
          </p>
          <Link
            to="/"
            className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition"
          >
            Kembali ke Home
          </Link>
        </div>
        <Footer />
        <CustomerService />
      </div>
    );
  }

  const isOutOfStock = product.status === "Out of Stock";

  const statusColor =
    product.status === "Out of Stock"
      ? "bg-red-500"
      : product.status === "Low Stock"
      ? "bg-orange-500"
      : "bg-green-500";

  const handleDecrease = () => setQuantity((q) => Math.max(1, q - 1));
  const handleIncrease = () =>
    setQuantity((q) => Math.min(product.stock || 1, q + 1));

  const handleLoadMoreReviews = () =>
    setVisibleReviews((v) => Math.min(reviewPool.length, v + 4));

  // Rekomendasi "You Might Also Like" - ambil 4 produk lain selain produk ini
  const suggestions = productsData.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="font-sans text-gray-900 bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-8 pt-8">
        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 flex-wrap">
          <Link to="/" className="hover:text-black transition">
            Home
          </Link>
          <FiChevronRight className="text-gray-400" />
          <Link to="/" className="hover:text-black transition">
            Shop
          </Link>
          <FiChevronRight className="text-gray-400" />
          <span>{product.category}</span>
          <FiChevronRight className="text-gray-400" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        {/* MAIN PRODUCT SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {/* GAMBAR PRODUK */}
          <div className="bg-[#F0EEED] rounded-[32px] overflow-hidden aspect-[4/5] md:aspect-auto md:h-[560px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* INFO PRODUK */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={4.5} />
              <span className="text-sm text-gray-500">4.5/5</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold">
                ${product.price.toFixed(2)}
              </span>
              <span
                className={`text-white text-xs font-bold px-3 py-1 rounded-full ${statusColor}`}
              >
                {product.status}
              </span>
            </div>

            <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-2">
              {getDescription(product.category)}
            </p>
            <p className="text-xs text-gray-400 mb-6">
              Kategori: {product.category}
              {!isOutOfStock && ` • ${product.stock} pcs tersedia`}
            </p>

            <hr className="border-gray-200 mb-6" />

            {/* PILIHAN UKURAN (kondisional sesuai kategori) */}
            {sizeOptions.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-500 mb-3">
                  Choose Size
                </p>
                <div className="flex flex-wrap gap-3">
                  {sizeOptions.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 cursor-pointer ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "bg-[#F0F0F0] text-gray-700 border-transparent hover:border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY + ADD TO CART */}
            {isOutOfStock ? (
              <button
                disabled
                className="bg-gray-200 text-gray-400 px-8 py-4 rounded-full font-medium w-full md:w-auto cursor-not-allowed"
              >
                Stok Habis
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-full px-2 py-1">
                  <button
                    onClick={handleDecrease}
                    className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer"
                  >
                    <FiMinus />
                  </button>
                  <span className="w-10 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer"
                  >
                    <FiPlus />
                  </button>
                </div>
                <button className="flex-1 bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 cursor-pointer">
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        </div>

        {/* TAB - HANYA RATING & REVIEWS (Product Detail & FAQs dihapus) */}
        <div className="border-b border-gray-200 mb-10">
          <div className="flex justify-center">
            <span className="pb-4 border-b-2 border-black font-bold text-lg">
              Rating &amp; Reviews
            </span>
          </div>
        </div>

        {/* ALL REVIEWS */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h3 className="text-2xl font-bold">
            All Reviews{" "}
            <span className="text-gray-400 font-normal">
              ({reviewPool.length * 12})
            </span>
          </h3>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition cursor-pointer">
              <FiSliders className="text-gray-600" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 hover:bg-gray-50 transition cursor-pointer text-sm font-medium">
              Latest <FiChevronDown className="text-gray-500" />
            </button>
            <button className="bg-black text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-gray-800 transition cursor-pointer">
              Write a Review
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {reviewPool.slice(0, visibleReviews).map((review) => (
            <div
              key={review.id}
              className="border border-gray-200 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <StarRating rating={review.rating} />
              </div>
              <h4 className="font-bold mb-2 flex items-center gap-1">
                {review.name}
                <BsCheckCircleFill className="text-green-500 text-sm" />
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                "{review.text}"
              </p>
              <span className="text-xs text-gray-400">
                Posted on {review.date}
              </span>
            </div>
          ))}
        </div>

        {visibleReviews < reviewPool.length && (
          <div className="text-center mb-20">
            <button
              onClick={handleLoadMoreReviews}
              className="border border-gray-200 px-12 py-3 rounded-full font-medium hover:bg-black hover:text-white hover:border-black transition-all duration-300 cursor-pointer"
            >
              Load More Reviews
            </button>
          </div>
        )}

        {/* YOU MIGHT ALSO LIKE */}
        <section className="mb-20">
          <h3 className="text-4xl font-black text-center mb-12 uppercase tracking-tight">
            You Might Also Like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {suggestions.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>

      <Footer />
      <CustomerService />
    </div>
  );
}