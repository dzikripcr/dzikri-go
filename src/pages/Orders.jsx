import { useState } from "react";
import { FaPlus, FaEllipsisV, FaTimes, FaSearch, FaEdit, FaTrashAlt } from "react-icons/fa";
import ordersData from "../data/order.json";

export default function Orders() {
  const [orders, setOrders] = useState(ordersData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    payment: "Unpaid",
    status: "Pending",
    productImage: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika submit form order baru
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#4EA674] text-white px-5 py-2 rounded-md flex items-center text-sm font-semibold transition-colors shadow-sm"
          >
            <FaPlus className="mr-2" /> Add Order
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <p className="text-gray-800 font-bold mb-2 text-lg">Total Orders</p>
          <div className="flex items-end space-x-2">
            <span className="text-3xl font-extrabold text-gray-800">1,240</span>
            <span className="text-sm text-green-500 mb-1">↑ 14.4%</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <p className="text-gray-800 font-bold mb-2 text-lg">New Orders</p>
          <div className="flex items-end space-x-2">
            <span className="text-3xl font-extrabold text-gray-800">240</span>
            <span className="text-sm text-green-500 mb-1">↑ 20%</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <p className="text-gray-800 font-bold mb-2 text-lg">Completed</p>
          <div className="flex items-end space-x-2">
            <span className="text-3xl font-extrabold text-gray-800">960</span>
            <span className="text-sm text-green-500 mb-1">↑ 85%</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <p className="text-gray-800 font-bold mb-2 text-lg">Canceled</p>
          <div className="flex items-end space-x-2">
            <span className="text-3xl font-extrabold text-gray-800">87</span>
            <span className="text-sm text-red-500 mb-1">↓ 5%</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
        </div>
      </div>

      {/* Filters & Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            <button className="bg-green-50 text-green-600 px-4 py-1.5 rounded-md text-sm font-semibold whitespace-nowrap">
              All order ({orders.length})
            </button>
            <button className="text-gray-500 hover:bg-gray-50 px-4 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors">
              Delivered
            </button>
            <button className="text-gray-500 hover:bg-gray-50 px-4 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors">
              Pending
            </button>
            <button className="text-gray-500 hover:bg-gray-50 px-4 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors">
              Shipped
            </button>
            <button className="text-gray-500 hover:bg-gray-50 px-4 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors">
              Canceled
            </button>
          </div>

          <div className="flex space-x-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search order..."
                className="w-full border border-gray-200 rounded-md py-1.5 pl-8 pr-3 text-sm outline-none focus:border-[#4EA674]/50 transition-colors"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
            </div>
            <button className="border border-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors">
              <FaEllipsisV className="text-gray-400" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-green-50 text-gray-700 text-sm">
                <th className="p-4 font-semibold">No.</th>
                <th className="p-4 font-semibold">Order Id</th>
                <th className="p-4 font-semibold">Product</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Payment</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order.orderId}
                  className="border-b border-gray-100 hover:bg-gray-50 text-sm transition-colors"
                >
                  <td className="p-4 text-gray-500">{index + 1}</td>
                  <td className="p-4 font-medium text-gray-800">
                    {order.orderId}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={
                            order.productImage ||
                            "https://via.placeholder.com/150"
                          }
                          alt={order.productName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/40?text=Img";
                          }}
                        />
                      </div>
                      <span className="font-semibold text-gray-800">
                        {order.productName}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-500">{order.date}</td>
                  <td className="p-4 font-bold text-gray-800">
                    ${order.price.toFixed(2)}
                  </td>
                  <td className="p-4">
                    <span className="flex items-center text-gray-700 font-medium">
                      <span
                        className={`w-2 h-2 rounded-full mr-2 ${order.payment?.toLowerCase() === "paid" ? "bg-green-500" : "bg-red-500"}`}
                      ></span>
                      {order.payment}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="flex items-center text-gray-700 font-medium">
                      <span
                        className={`w-2 h-2 rounded-full mr-2 
                          ${
                            order.status?.toLowerCase() === "delivered"
                              ? "bg-green-500"
                              : order.status?.toLowerCase() === "pending"
                                ? "bg-yellow-500"
                                : order.status?.toLowerCase() === "shipped"
                                  ? "bg-blue-500"
                                  : "bg-red-500"
                          }`}
                      ></span>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 flex space-x-3 text-gray-400">
                    <button className="hover:text-blue-500 transition-colors">
                      <FaEdit />
                    </button>
                    <button className="hover:text-red-500 transition-colors">
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL FORM ADD NEW ORDER */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Add New Order</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-800"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
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

              <div className="flex justify-end space-x-3 pt-4 mt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
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
      )}
    </div>
  );
}
