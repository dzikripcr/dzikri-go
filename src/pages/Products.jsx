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
    status: "In Stock",
    image: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    // Tutup modal dan reset form
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-serif font-bold text-gray-900 tracking-tight">Product Management</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0">
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-full flex items-center text-sm font-medium transition-all shadow-sm w-full md:w-auto justify-center"
          >
            <FaPlus className="mr-2" /> Add New Product
          </button>
          
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
               <input 
                 type="text" 
                 placeholder="Search Product..." 
                 className="bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-10 pr-4 w-full text-sm outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:bg-white transition-all" 
               />
               <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 md:flex-none border border-gray-200 text-gray-700 px-5 py-2.5 rounded-full text-sm font-medium flex justify-center items-center bg-white hover:bg-gray-50 hover:text-gray-900 transition-colors">
                 Sorting By <span className="ml-2 text-[10px]">▼</span>
              </button>
              <button className="flex-1 md:flex-none border border-gray-200 text-gray-700 px-5 py-2.5 rounded-full text-sm font-medium flex justify-center items-center bg-white hover:bg-gray-50 hover:text-gray-900 transition-colors">
                 <FaFilter className="mr-2" /> Filters
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-widest">
                <th className="p-5 font-semibold w-12">
                  <input type="checkbox" className="rounded text-gray-900 focus:ring-gray-900 border-gray-300 cursor-pointer" />
                </th>
                <th className="p-5 font-semibold">Product Name</th>
                <th className="p-5 font-semibold">Category</th>
                <th className="p-5 font-semibold">Price</th>
                <th className="p-5 font-semibold">Stock</th>
                <th className="p-5 font-semibold">Status</th>
                <th className="p-5 font-semibold text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80 text-sm transition-colors group">
                  <td className="p-5">
                     <input type="checkbox" className="rounded text-gray-900 focus:ring-gray-900 border-gray-300 cursor-pointer" />
                  </td>
                  <td className="p-5">
                     <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg flex-shrink-0 border border-gray-200 shadow-sm overflow-hidden bg-gray-50">
                          <img 
                            src={product.image || "https://via.placeholder.com/150"}
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div>
                           <p className="font-semibold text-gray-900">{product.name}</p>
                           <p className="text-xs text-gray-500 mt-0.5">{product.id}</p>
                        </div>
                     </div>
                  </td>
                  <td className="p-5 text-gray-600 font-medium">{product.category}</td>
                  <td className="p-5 font-bold text-gray-900">${product.price.toFixed(2)}</td>
                  <td className="p-5 text-gray-700 font-medium">{product.stock}</td>
                  <td className="p-5">
                     {/* Logika status yang kebal huruf besar/kecil */}
                     <span className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide border capitalize
                        ${product.status?.toLowerCase() === "in stock" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : 
                          product.status?.toLowerCase() === "low stock" ? "bg-amber-50 text-amber-700 border-amber-100" : 
                          product.status?.toLowerCase() === "out of stock" ? "bg-rose-50 text-rose-700 border-rose-100" : 
                          "bg-gray-50 text-gray-700 border-gray-200"}`}>
                        {product.status}
                     </span>
                  </td>
                  <td className="p-5 text-right">
                     <button className="text-gray-400 hover:text-amber-900 transition-colors p-2.5 rounded-full hover:bg-amber-50">
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
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-serif font-bold text-gray-900">Add New Product</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100"
              >
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
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:bg-white transition-all"
                    placeholder="e.g. Silk Dress"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input 
                    type="text" name="category" required
                    value={formData.category} onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:bg-white transition-all"
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
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:bg-white transition-all"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input 
                    type="number" name="stock" required
                    value={formData.stock} onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:bg-white transition-all"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    name="status" 
                    value={formData.status} onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:bg-white transition-all text-gray-700"
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
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:bg-white transition-all"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 mt-6 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm"
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