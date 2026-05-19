import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaBoxOpen, FaTag } from "react-icons/fa";
import productsData from "../data/products.json";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();

  const product = productsData.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">
            Product Not Found
          </h2>

          <Link
            to="/products"
            className="inline-block mt-4 bg-[#4EA674] text-white px-5 py-2 rounded-lg"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return <ProductCard product={product} />;
}
