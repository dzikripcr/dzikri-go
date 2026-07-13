import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
// Import hook Cart Context
import { useCart } from "../../context/CartContext"; 

// Fungsi pembantu untuk mendapatkan opsi ukuran berdasarkan kategori produk
const getSizeOptions = (kategori) => {
  switch (kategori) {
    case "Gaun":
    case "Pakaian Luar":
    case "Atasan":
    case "Bawahan":
      return ["S", "M", "L", "XL"];
    case "Sepatu":
      return ["36", "37", "38", "39", "40"];
    default:
      return ["All Size"];
  }
};

export default function ProductCardWithActions({ item, formatRupiah }) {
  const { addToCart } = useCart(); // Mengambil fungsi global tambah keranjang
  const isOutOfStock = item.status === "Stok Habis";
  const sizeOptions = getSizeOptions(item.kategori);
  
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]);
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = (e) => {
    e.preventDefault(); // Mencegah Link terpicu saat tombol diklik
    setQuantity((q) => Math.max(1, q - 1));
  };

  const handleIncrease = (e) => {
    e.preventDefault(); // Mencegah Link terpicu saat tombol diklik
    setQuantity((q) => Math.min(item.stok || 1, q + 1));
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault(); // Mencegah Link terpicu saat tombol diklik
    addToCart(item, quantity, selectedSize);
  };

  const statusColor =
    item.status === "Stok Habis"
      ? "bg-red-500"
      : item.status === "Stok Menipis"
      ? "bg-orange-500"
      : "bg-green-500";

  return (
    <div className="bg-white border border-gray-100 rounded-[20px] p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition duration-300">
      {/* Area Klik menuju Detail Produk */}
      <Link to={`/product/${item.id}`} className="group block mb-3">
        <div className="bg-[#F0EEED] aspect-[4/5] rounded-[15px] mb-3 overflow-hidden relative">
          <img
            src={item.gambar}
            alt={item.nama}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
          <div className={`absolute top-3 left-3 px-3 py-1 text-[10px] font-bold rounded text-white ${statusColor}`}>
            {item.status}
          </div>
          <div className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white">
            {item.gaya}
          </div>
        </div>
        <h4 className="font-bold text-base leading-tight mb-1 text-gray-900 group-hover:text-gray-700 min-h-[40px] line-clamp-2">
          {item.nama}
        </h4>
        <div className="flex items-center space-x-1 mb-1">
          {[1, 2, 3, 4].map((star) => (
            <FaStar key={star} className="text-[#FFC633] text-xs" />
          ))}
          <FaStar className="text-gray-300 text-xs" />
          <span className="text-xs text-gray-500 ml-1">4.0</span>
        </div>
        <span className="text-lg font-black text-gray-900">{formatRupiah(item.harga)}</span>
      </Link>

      {/* Kontrol Kuantitas, Ukuran, dan Tombol Keranjang */}
      <div className="mt-2 pt-3 border-t border-gray-100 space-y-3">
        {!isOutOfStock ? (
          <>
            <div className="flex items-center justify-between gap-2 text-xs">
              <div className="flex flex-col w-1/2">
                <span className="text-gray-400 mb-1">Ukuran:</span>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="bg-[#F0F0F0] text-gray-700 rounded-lg px-2 py-1.5 font-medium outline-none border border-transparent focus:border-gray-300 cursor-pointer w-full"
                >
                  {sizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col w-1/2">
                <span className="text-gray-400 mb-1">Jumlah:</span>
                <div className="flex items-center justify-between bg-[#F0F0F0] rounded-lg px-1 py-0.5 border border-transparent">
                  <button
                    onClick={handleDecrease}
                    className="p-1 hover:bg-white rounded-md transition text-gray-600 cursor-pointer"
                  >
                    <FiMinus size={12} />
                  </button>
                  <span className="font-bold text-gray-800 text-xs px-1 w-6 text-center">{quantity}</span>
                  <button
                    onClick={handleIncrease}
                    className="p-1 hover:bg-white rounded-md transition text-gray-600 cursor-pointer"
                  >
                    <FiPlus size={12} />
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleAddToCartClick}
              className="w-full bg-black text-white text-xs font-semibold py-2.5 rounded-full hover:bg-gray-800 transition duration-300 shadow-sm active:scale-95 cursor-pointer"
            >
              Tambah ke Keranjang
            </button>
          </>
        ) : (
          <button
            disabled
            className="w-full bg-gray-200 text-gray-400 text-xs font-semibold py-2.5 rounded-full cursor-not-allowed"
          >
            Stok Habis
          </button>
        )}
      </div>
    </div>
  );
}