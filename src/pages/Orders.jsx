import { useState } from "react";
import { 
  FaPlus, 
  FaEllipsisV, 
  FaCheckCircle, 
  FaClock, 
  FaTimesCircle, 
  FaTruck, 
  FaTimes 
} from "react-icons/fa";
import ordersData from "../components/order.json";

export default function Orders() {
  // Tambahkan setOrders untuk memanipulasi data tabel
  const [orders, setOrders] = useState(ordersData);
  
  // State untuk Modal Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    payment: "Unpaid",
    status: "Pending",
    productImage: ""
  });

  // Handle perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle submit form order baru
  const handleSubmit = (e) => {
    
    // Tutup modal dan reset form
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-serif font-bold text-gray-900 tracking-tight">Order List</h1>
        <div className="flex space-x-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-full flex items-center text-sm font-medium transition-all shadow-sm"
          >
            <FaPlus className="mr-2" /> Add Order
          </button>
          <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-all">
            More Action ⋮
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <p className="text-gray-500 text-sm font-medium mb-3">Total Orders</p>
          <div className="flex items-end space-x-2">
            <span className="text-3xl font-bold text-gray-900 tracking-tight">1,240</span>
            <span className="text-sm text-emerald-600 mb-1 font-semibold">↑ 14.4%</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">Last 7 days</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <p className="text-gray-500 text-sm font-medium mb-3">New Orders</p>
          <div className="flex items-end space-x-2">
            <span className="text-3xl font-bold text-gray-900 tracking-tight">240</span>
            <span className="text-sm text-emerald-600 mb-1 font-semibold">↑ 20%</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">Last 7 days</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <p className="text-gray-500 text-sm font-medium mb-3">Completed Orders</p>
          <div className="flex items-end space-x-2">
            <span className="text-3xl font-bold text-gray-900 tracking-tight">960</span>
            <span className="text-sm text-emerald-600 mb-1 font-semibold">↑ 85%</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">Last 7 days</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <p className="text-gray-500 text-sm font-medium mb-3">Canceled Orders</p>
          <div className="flex items-end space-x-2">
            <span className="text-3xl font-bold text-gray-900 tracking-tight">87</span>
            <span className="text-sm text-rose-600 mb-1 font-semibold">↓ 5%</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">Last 7 days</p>
        </div>
      </div>

      {/* Filters & Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-white">
          <div className="flex space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            <button className="bg-gray-900 border border-gray-900 text-white px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap shadow-sm">
              All order ({orders.length})
            </button>
            <button className="text-gray-500 border border-transparent hover:bg-gray-50 hover:text-gray-900 px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors">Delivered</button>
            <button className="text-gray-500 border border-transparent hover:bg-gray-50 hover:text-gray-900 px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors">Pending</button>
            <button className="text-gray-500 border border-transparent hover:bg-gray-50 hover:text-gray-900 px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors">Shipped</button>
            <button className="text-gray-500 border border-transparent hover:bg-gray-50 hover:text-gray-900 px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors">Canceled</button>
          </div>
          
          <div className="flex space-x-3 w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Search order report..." 
              className="w-full md:w-64 border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all bg-gray-50" 
            />
            <button className="border border-gray-200 px-3 py-2 rounded-full hover:bg-gray-50 transition-colors">
              <FaEllipsisV className="text-gray-400 hover:text-gray-900" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-widest border-b border-gray-100">
                <th className="p-5 font-semibold">No.</th>
                <th className="p-5 font-semibold">Order Id</th>
                <th className="p-5 font-semibold">Product</th>
                <th className="p-5 font-semibold">Date</th>
                <th className="p-5 font-semibold">Price</th>
                <th className="p-5 font-semibold">Payment</th>
                <th className="p-5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order, index) => (
                <tr key={order.orderId} className="hover:bg-gray-50/80 transition-colors text-sm group">
                  <td className="p-5 text-gray-500">{index + 1}</td>
                  <td className="p-5 font-semibold text-gray-900">{order.orderId}</td>
                  <td className="p-5">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-lg flex-shrink-0 overflow-hidden border border-gray-200">
                        <img 
                          src={order.productImage || "https://via.placeholder.com/150"} 
                          alt={order.productName}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/48?text=📦";
                          }}
                        />
                      </div>
                      <span className="font-semibold text-gray-900">{order.productName}</span>
                    </div>
                  </td>
                  <td className="p-5 text-gray-500 whitespace-nowrap">{order.date}</td>
                  <td className="p-5 font-bold text-gray-900">${order.price.toFixed(2)}</td>
                  <td className="p-5">
                    <span className="flex items-center text-gray-700 font-medium">
                      <span className={`w-2 h-2 rounded-full mr-2.5 ${order.payment?.toLowerCase() === "paid" ? "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]" : "bg-rose-500"}`}></span>
                      {order.payment}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full w-fit text-xs font-bold tracking-wide capitalize
                      ${order.status?.toLowerCase() === "delivered" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : 
                        order.status?.toLowerCase() === "pending" ? "bg-amber-50 text-amber-700 border border-amber-100" : 
                        order.status?.toLowerCase() === "shipped" ? "bg-slate-100 text-slate-700 border border-slate-200" : 
                        "bg-rose-50 text-rose-700 border border-rose-100"}`}>
                      {order.status?.toLowerCase() === "delivered" && <FaCheckCircle size={12} />}
                      {order.status?.toLowerCase() === "pending" && <FaClock size={12} />}
                      {order.status?.toLowerCase() === "shipped" && <FaTruck size={12} />}
                      {(order.status?.toLowerCase() === "cancelled" || order.status?.toLowerCase() === "canceled") && <FaTimesCircle size={12} />}
                      <span>{order.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL FORM ADD NEW ORDER */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-serif font-bold text-gray-900">Add New Order</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100"
              >
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input 
                  type="text" name="productName" required
                  value={formData.productName} onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:bg-white transition-all"
                  placeholder="e.g. Classic Leather Handbag"
                />
              </div>

              {/* Price & Payment */}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                  <select 
                    name="payment" 
                    value={formData.payment} onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:bg-white transition-all text-gray-700"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                </div>
              </div>

              {/* Order Status & Image URL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Status</label>
                  <select 
                    name="status" 
                    value={formData.status} onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:bg-white transition-all text-gray-700"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Image URL</label>
                  <input 
                    type="url" name="productImage" required
                    value={formData.productImage} onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:bg-white transition-all"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              {/* Info Text */}
              <p className="text-xs text-gray-500 pt-2">
                * Order ID and Date will be generated automatically.
              </p>

              {/* Action Buttons */}
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