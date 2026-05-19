import { Link } from "react-router-dom";
import { FaArrowLeft, FaTag, FaBoxOpen } from "react-icons/fa";

export default function ProductCard({ product }) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Back Button */}
      <Link
        to="/products"
        className="inline-flex items-center text-[#4EA674] font-medium mb-6 hover:underline"
      >
        <FaArrowLeft className="mr-2" />
        Back to Products
      </Link>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* IMAGE */}
        <div className="bg-gradient-to-br from-[#4EA674]/10 to-white p-8 flex items-center justify-center">

          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md h-[420px] object-cover rounded-2xl shadow-md"
          />
        </div>

        {/* DETAIL */}
        <div className="p-8 flex flex-col justify-between">

          <div>

            {/* Category */}
            <span className="inline-flex items-center bg-[#4EA674]/10 text-[#4EA674] px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <FaTag className="mr-2" />
              {product.category}
            </span>

            {/* Product Name */}
            <h1 className="text-4xl font-bold text-gray-800 leading-tight mb-4">
              {product.name}
            </h1>

            {/* Product ID */}
            <p className="text-gray-400 text-sm mb-6">
              Product ID : {product.id}
            </p>

            {/* Price */}
            <div className="mb-6">
              <h2 className="text-sm text-gray-500 mb-1">
                Product Price
              </h2>

              <p className="text-4xl font-extrabold text-[#4EA674]">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Stock */}
            <div className="grid grid-cols-2 gap-4 mb-8">

              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">

                <div className="flex items-center text-gray-500 mb-2">
                  <FaBoxOpen className="mr-2" />
                  Stock
                </div>

                <p className="text-2xl font-bold text-gray-800">
                  {product.stock}
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">

                <div className="text-gray-500 mb-2">
                  Status
                </div>

                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold
                  ${
                    product.status === "In Stock"
                      ? "bg-green-100 text-green-700"
                      : product.status === "Low Stock"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full mr-2
                    ${
                      product.status === "In Stock"
                        ? "bg-green-500"
                        : product.status === "Low Stock"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  ></span>

                  {product.status}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="flex gap-4">

            <button className="bg-[#4EA674] hover:bg-[#3d8c61] transition-all text-white px-6 py-3 rounded-xl font-semibold shadow-md">
              Buy Now
            </button>

            <button className="border border-[#4EA674] text-[#4EA674] hover:bg-[#4EA674]/10 transition-all px-6 py-3 rounded-xl font-semibold">
              Add to Cart
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}