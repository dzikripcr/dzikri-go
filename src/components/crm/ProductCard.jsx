import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export default function ProductCard({ item }) {
  // Formatter mata uang rupiah Indonesia (Rp)
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const isAvailable = item.status === "Stok Tersedia";

  return (
    <Link to={`/product/${item.id}`} className="cursor-pointer group flex flex-col">
      <div className="bg-[#F0EEED] aspect-[4/5] rounded-[20px] mb-4 overflow-hidden relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
        {!isAvailable && (
          <div
            className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded text-white ${
              item.status === "Stok Habis" ? "bg-red-500" : "bg-orange-500"
            }`}
          >
            {item.status}
          </div>
        )}
      </div>
      <h4 className="font-bold text-lg leading-tight mb-1">{item.name}</h4>
      <div className="flex items-center space-x-1 mb-2">
        <FaStar className="text-[#FFC633] text-sm" />
        <FaStar className="text-[#FFC633] text-sm" />
        <FaStar className="text-[#FFC633] text-sm" />
        <FaStar className="text-[#FFC633] text-sm" />
        <FaStar className="text-gray-300 text-sm" />
        <span className="text-sm text-gray-500 ml-1">4.0/5</span>
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-2xl font-bold">{formatRupiah(item.price)}</span>
      </div>
    </Link>
  );
}