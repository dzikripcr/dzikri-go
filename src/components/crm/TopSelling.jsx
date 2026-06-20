import React from "react";
import ProductSection from "./ProductSection";

export default function TopSelling({ products }) {
  return (
    <ProductSection id="top-selling" title="TOP SELLING" products={products} />
  );
}