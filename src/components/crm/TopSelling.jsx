import React from "react";
import ProductSection from "./ProductSection";

export default function TopSelling({ products }) {
  return (
    <ProductSection id="top-selling" title="PALING LARIS" products={products} />
  );
}