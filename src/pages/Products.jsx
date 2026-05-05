import { useState } from "react";
import { FaPlus, FaSearch, FaFilter, FaEllipsisH, FaTimes } from "react-icons/fa";
import productsData from "../components/products.json";

export default function Products() {
  const [products, setProducts] = useState(productsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "Low Stock",
    image: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md flex items-center text-sm font-semibold transition-colors shadow-sm"
        >
          <FaPlus className="mr-2" /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Search Product..." 
              className="w-full border border-gray-200 rounded-md py-1.5 pl-8 pr-3 text-sm outline-none focus:border-blue-500 transition-colors" 
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
          </div>
          
          <div className="flex space-x-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none border border-gray-200 text-gray-600 px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors flex justify-center items-center">
              Sorting By <span className="ml-2 text-[10px]">▼</span>
            </button>
            <button className="flex-1 md:flex-none border border-gray-200 text-gray-600 px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors flex justify-center items-center">
              <FaFilter className="mr-2 text-gray-400" /> Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-green-50 text-gray-700 text-sm">
                <th className="p-4 font-semibold w-12 text-center">
                  <input type="checkbox" className="rounded text-blue-500 border-gray-300 cursor-pointer" />
                </th>
                <th className="p-4 font-semibold">Product Name</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Stock</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Details</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 text-sm transition-colors">
                  <td className="p-4 text-center">
                     <input type="checkbox" className="rounded text-blue-500 border-gray-300 cursor-pointer" />
                  </td>
                  <td className="p-4">
                     <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden">
                          <img 
                            src={product.image || "https://via.placeholder.com/150"}
                            alt={product.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = "https://via.placeholder.com/40?text=Img"; }}
                          />
                        </div>
                        <div>
                           <p className="font-semibold text-gray-800">{product.name}</p>
                           <p className="text-xs text-gray-400">{product.id}</p>
                        </div>
                     </div>
                  </td>
                  <td className="p-4 text-gray-600">{product.category}</td>
                  <td className="p-4 font-bold text-gray-800">${product.price.toFixed(2)}</td>
                  <td className="p-4 text-gray-800 font-medium">{product.stock}</td>
                  <td className="p-4">
                     <span className="flex items-center text-gray-700 font-medium">
                        <span className={`w-2 h-2 rounded-full mr-2 
                          ${product.status?.toLowerCase() === "in stock" ? "bg-green-500" : 
                            product.status?.toLowerCase() === "low stock" ? "bg-yellow-500" : "bg-red-500"}`}>
                        </span>
                        {product.status}
                     </span>
                  </td>
                  <td className="p-4 text-right">
                     <button className="text-gray-400 hover:text-blue-500 transition-colors">
                         <FaEllipsisH />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL FORM ADD NEW PRODUCT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Add New Product</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-800">
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input 
                    type="text" name="name" required
                    value={formData.name} onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm outline-none focus:border-blue-500"
                    placeholder="e.g. Silk Dress"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input 
                    type="text" name="category" required
                    value={formData.category} onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm outline-none focus:border-blue-500"
                    placeholder="e.g. Dresses"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input 
                    type="number" step="0.01" name="price" required
                    value={formData.price} onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm outline-none focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input 
                    type="number" name="stock" required
                    value={formData.stock} onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm outline-none focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    name="status" value={formData.status} onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm outline-none focus:border-blue-500 text-gray-700"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input 
                    type="url" name="image" required
                    value={formData.image} onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm outline-none focus:border-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 mt-4 border-t border-gray-100">
                <button 
                  type="button" onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}