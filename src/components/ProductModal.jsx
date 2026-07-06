import { FaTimes } from "react-icons/fa";

export default function ProductModal({
  onClose,
  formData,
  categories,
  handleInputChange,
  handleFileChange,
  handleSubmit,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            {formData.id ? "Edit Product" : "Add New Product"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-800 transition-colors">
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Product Name & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm outline-none focus:border-[#4EA674]"
                placeholder="e.g. Silk Dress"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category_id"
                required
                value={formData.category_id}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm outline-none focus:border-[#4EA674] text-gray-700"
              >
                <option value="" disabled>Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                type="number"
                step="0.01"
                name="price"
                required
                value={formData.price}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm outline-none focus:border-[#4EA674]"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                required
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm outline-none focus:border-[#4EA674]"
                placeholder="0"
              />
            </div>
          </div>

          {/* Status & Image File */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm outline-none focus:border-[#4EA674] text-gray-700"
              >
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
              />
              {formData.image && !handleFileChange.name && (
                <p className="text-xs text-gray-400 mt-1 truncate">Current: {formData.image}</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 pt-4 mt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#4EA674]/80 hover:bg-[#4EA674] text-white px-5 py-2 rounded-md text-sm font-medium"
            >
              Save Product
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}