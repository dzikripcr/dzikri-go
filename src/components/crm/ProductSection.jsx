import React from "react";
import ProductCard from "./ProductCard";

export default function ProductSection({ id, title, products, showBorder = false }) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-16 px-8 max-w-7xl mx-auto ${
        showBorder ? "border-b border-gray-200" : ""
      }`}
    >
      <h3 className="text-4xl font-black text-center mb-12 uppercase tracking-tight">
        {title}
      </h3>
      {!products || products.length === 0 ? (
        <p className="text-center text-gray-500">
          Tidak ada produk tersedia.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      )}
      <div className="text-center mt-10">
        <button className="border border-gray-200 bg-white cursor-pointer text-black px-16 py-3 rounded-full font-medium transition-all duration-300 ease-in-out hover:bg-black hover:text-white hover:border-black hover:shadow-lg w-full md:w-auto">
          View All
        </button>
      </div>
    </section>
  );
}