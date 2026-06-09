import {
  FaComments,
  FaPhone,
  FaMapMarkerAlt,
  FaUser,
  FaTimes,
} from "react-icons/fa";

export default function CustomerDetail({ customer, onClose }) {
  if (!customer) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-5">
        <p className="text-center text-gray-400">
          Select a customer to view details
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-5">
      <div className="flex justify-end">
        <button onClick={onClose} className="text-gray-400 hover:text-red-500">
          <FaTimes />
        </button>
      </div>
      {/* Profile */}
      <div className="flex flex-col items-center">
        <img
          src={customer.profileImage}
          alt={customer.name}
          className="w-24 h-24 rounded-full object-cover border-4"
        />

        <h3 className="mt-4 text-lg font-bold text-gray-800">
          {customer.name}
        </h3>

        <p className="text-sm text-gray-500">{customer.email}</p>
      </div>

      {/* Information */}
      <div className="mt-6 space-y-4">
        <div>
          <p className="text-xs text-gray-400 mb-1">Customer Info</p>

          <div className="flex items-center gap-2 border rounded-lg p-2 text-sm font-['lato'] mb-2">
            <FaPhone className="text-black" />
            <span>{customer.phone}</span>
          </div>

          <div className="flex items-center gap-2 border rounded-lg p-2 text-sm font-['Lato']">
            <FaMapMarkerAlt className="text-black" />
            <span>{customer.address}</span>
          </div>
        </div>
      </div>

      {/* Activity */}
      <div className="mt-6">
        <h4 className="text-xs text-gray-400 mb-1">Activity</h4>

        <p className="text-sm text-gray-500">
          Registration: {customer.joinDate}
        </p>

        <p className="text-sm text-gray-500">
          Last Purchase: {customer.lastPurchase}
        </p>
      </div>

      {/* Chat Button */}
      <button
        className="
          w-full
          mt-6
          flex
          items-center
          justify-center
          gap-2
          bg-[#4EA674]
          text-white
          py-3
          rounded-lg
          hover:bg-[#3d8c61]
          transition
        "
      >
        <FaComments />
        Chat Customer
      </button>

      {/* Order Summary */}
      <div className="mt-6">
        <h4 className="text-xs text-gray-400 mb-1">
          Order Overview
        </h4>

        <div className="grid grid-cols-3 gap-2">
          <div className="border rounded-lg p-3 text-center">
            <p className="text-lg font-bold">{customer.orderCount}</p>

            <p className="text-xs text-gray-500">Total</p>
          </div>

          <div className="border rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-green-600">
              {customer.completedOrders}
            </p>

            <p className="text-xs text-gray-500">Completed</p>
          </div>

          <div className="border rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-red-500">
              {customer.cancelledOrders}
            </p>

            <p className="text-xs text-gray-500">Cancelled</p>
          </div>
        </div>
      </div>
    </div>
  );
}
