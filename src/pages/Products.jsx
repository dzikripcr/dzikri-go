import { AiFillEye } from "react-icons/ai";
import { useState } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrashAlt } from "react-icons/fa";

import productsData from "../data/products.json";
import { Link } from "react-router-dom";

import ProductModal from "../components/ProductModal";
import Table from "../components/Table";
import Button from "../components/Button";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";

export default function Products() {
  const [products] = useState(productsData);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "Low Stock",
    image: "",
  });

  /** SEARCH & FILTER STATE */
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  /** HANDLE INPUT FORM */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /** HANDLE SUBMIT */
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsModalOpen(false);
  };

  /** SEARCH */
  const _searchTerm = searchTerm.toLowerCase();

  /** FILTER PRODUCT */
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(_searchTerm) ||
      product.category.toLowerCase().includes(_searchTerm);

    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  /** UNIQUE CATEGORY */
  const allCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      {/* BUTTON */}
      <div className="flex justify-between items-center mb-6">
        <Button onClick={() => setIsModalOpen(true)} type="add">
          <FaPlus className="mr-2" />
          Add Product
        </Button>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* FILTER */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* SEARCH */}
          <div className="relative w-full md:w-80">
            <InputField
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-200 rounded-md py-1.5 pl-8 pr-3 text-sm outline-none focus:border-[#4EA674]/50 transition-colors"
            />

            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          </div>

          <div className="flex space-x-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none border border-gray-200 text-gray-600 px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors flex justify-center items-center">
              {" "}
              Sorting By <span className="ml-2 text-[10px]">▼</span>{" "}
            </button>
            <SelectField
              name="selectedCategory"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              options={[
                {
                  label: "Filter",
                  value: "",
                },

                ...allCategories.map((category) => ({
                  label: category,
                  value: category,
                })),
              ]}
              className="border border-gray-200 text-gray-600 px-4 py-1.5 rounded-md text-sm outline-none focus:border-[#4EA674]/50"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <Table
            headers={[
              "No.",
              "Product Name",
              "Category",
              "Price",
              "Stock",
              "Status",
              "Action",
            ]}
          >
            {filteredProducts.map((product, index) => (
              <tr
                key={product.id}
                className="border-b border-gray-100 hover:bg-gray-50 text-sm transition-colors"
              >
                <td className="p-4 text-gray-500">{index + 1}</td>

                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800">
                        {product.name}
                      </p>

                      <p className="text-xs text-gray-400">{product.id}</p>
                    </div>
                  </div>
                </td>

                <td className="p-4 text-gray-600">{product.category}</td>

                <td className="p-4 font-bold text-gray-800">
                  ${product.price.toFixed(2)}
                </td>

                <td className="p-4 text-gray-800 font-medium">
                  {product.stock}
                </td>

                <td className="p-4">{product.status}</td>

                <td className="p-4 flex space-x-3 text-gray-400">
                  <Button type="edit">
                    <FaEdit />
                  </Button>

                  <Button type="hapus">
                    <FaTrashAlt />
                  </Button>

                  <Link
                    to={`/products/${product.id}`}
                    className="text-emerald-400 hover:text-emerald-500"
                  >
                    <AiFillEye />
                  </Link>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <ProductModal
          onClose={() => setIsModalOpen(false)}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
