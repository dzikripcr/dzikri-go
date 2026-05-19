import { FaTimes } from "react-icons/fa";

export default function OrderModal({
  onClose,
  formData,
  handleInputChange,
  handleSubmit,
}) {

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            Add New Order
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800 transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>

            <input
              type="text"
              name="productName"
              required
              value={formData.productName}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm outline-none focus:border-[#4EA674]"
              placeholder="e.g. Classic Leather Handbag"
            />
          </div>

          {/* Price & Payment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>

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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Status
              </label>

              <select
                name="payment"
                value={formData.payment}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm outline-none focus:border-[#4EA674] text-gray-700"
              >
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
          </div>

          {/* Status & Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm outline-none focus:border-[#4EA674] text-gray-700"
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image URL
              </label>

              <input
                type="url"
                name="productImage"
                required
                value={formData.productImage}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm outline-none focus:border-[#4EA674]"
                placeholder="https://example.com/image.jpg"
              />
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
              Save Order
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}