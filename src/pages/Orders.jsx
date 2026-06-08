import { useState, useEffect, useRef } from "react";
import {
  FaPlus,
  FaEllipsisV,
  FaTimes,
  FaSearch,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import ordersData from "../data/order.json";
import OrderModal from "../components/OrderModal";
import Button from "../components/Button";
import Card from "../components/Card";
import Table from "../components/Table";
import InputField from "../components/InputField";

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

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [filteredOrders, setFilteredOrders] = useState(orders);

  const searchRef = useRef("");
  const statusRef = useRef("");

  useEffect(() => {
    searchRef.current = searchTerm;
    statusRef.current = selectedStatus;

    const filtered = orders.filter((order) => {
      const matchesSearch =
        order.productName
          .toLowerCase()
          .includes(searchRef.current.toLowerCase()) ||
        order.orderId.toLowerCase().includes(searchRef.current.toLowerCase());

      const matchesStatus = statusRef.current
        ? order.status === statusRef.current
        : true;

      return matchesSearch && matchesStatus;
    });

    setFilteredOrders(filtered);
  }, [searchTerm, selectedStatus, orders]);

  const allStatus = [...new Set(orders.map((order) => order.status))];

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-3">
          <Button onClick={() => setIsModalOpen(true)} type="add">
            <FaPlus className="mr-2" /> Add Order
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Total Orders */}
        <Card>
          <p className="text-gray-800 font-bold mb-2 text-lg">Total Orders</p>

          <div className="flex items-end space-x-2">
            <span className="text-3xl font-extrabold text-gray-800">1,240</span>

            <span className="text-sm text-green-500 mb-1">↑ 14.4%</span>
          </div>

          <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
        </Card>

        {/* New Orders */}
        <Card>
          <p className="text-gray-800 font-bold mb-2 text-lg">New Orders</p>

          <div className="flex items-end space-x-2">
            <span className="text-3xl font-extrabold text-gray-800">240</span>

            <span className="text-sm text-green-500 mb-1">↑ 20%</span>
          </div>

          <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
        </Card>

        {/* Completed */}
        <Card>
          <p className="text-gray-800 font-bold mb-2 text-lg">Completed</p>

          <div className="flex items-end space-x-2">
            <span className="text-3xl font-extrabold text-gray-800">960</span>

            <span className="text-sm text-green-500 mb-1">↑ 85%</span>
          </div>

          <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
        </Card>

        {/* Canceled */}
        <Card>
          <p className="text-gray-800 font-bold mb-2 text-lg">Canceled</p>

          <div className="flex items-end space-x-2">
            <span className="text-3xl font-extrabold text-gray-800">87</span>

            <span className="text-sm text-red-500 mb-1">↓ 5%</span>
          </div>

          <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
        </Card>
      </div>

      {/* Filters & Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            <button
              onClick={() => setSelectedStatus("")}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold whitespace-nowrap ${
                selectedStatus === ""
                  ? "bg-green-50 text-green-600"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              All Order ({orders.length})
            </button>

            <button
              onClick={() => setSelectedStatus("Delivered")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium whitespace-nowrap ${
                selectedStatus === "Delivered"
                  ? "bg-green-50 text-green-600"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              Delivered
            </button>

            <button
              onClick={() => setSelectedStatus("Pending")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium whitespace-nowrap ${
                selectedStatus === "Pending"
                  ? "bg-green-50 text-green-600"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              Pending
            </button>

            <button
              onClick={() => setSelectedStatus("Shipped")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium whitespace-nowrap ${
                selectedStatus === "Shipped"
                  ? "bg-green-50 text-green-600"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              Shipped
            </button>

            <button
              onClick={() => setSelectedStatus("Canceled")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium whitespace-nowrap ${
                selectedStatus === "Canceled"
                  ? "bg-green-50 text-green-600"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              Canceled
            </button>
          </div>

          <div className="flex space-x-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <InputField
                type="text"
                placeholder="Search order..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
          <Table
            headers={[
              "No.",
              "Order Id",
              "Product",
              "Date",
              "Price",
              "Payment",
              "Status",
              "Action",
            ]}
          >
            {filteredOrders.map((order, index) => (
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
                        src={order.productImage}
                        alt={order.productName}
                        className="w-full h-full object-cover"
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

                <td className="p-4">{order.payment}</td>

                <td className="p-4">{order.status}</td>

                <td className="p-4 flex space-x-3 text-gray-400">
                  <Button type="edit">
                    <FaEdit />
                  </Button>
                  <Button type="hapus">
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </div>

      {/* MODAL FORM ADD NEW ORDER */}
      {isModalOpen && (
        <OrderModal
          onClose={() => setIsModalOpen(false)}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
