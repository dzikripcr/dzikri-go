import React from "react";
import ProductSection from "./ProductSection";

export default function NewArrivals({ products }) {
  return (
    <ProductSection
      id="new-arrivals"
      title="PRODUK TERBARU"
      products={products}
      showBorder
    />
  );
} 