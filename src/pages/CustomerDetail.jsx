import {
  FaComments,
  FaPhone,
  FaMapMarkerAlt,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

export default function CustomerDetail({ customer, onClose }) {
  console.log("Data Customer di Detail:", customer);

  if (!customer) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-5">
        <p className="text-center text-gray-400">
          Select a customer to view details
        </p>
      </div>
    );
  }

  const formatDate = (value) => {
    if (!value) return "-";
    return new Date(value).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const profileImageSrc =
    customer.profile_image ||
    customer.profileImage ||
    customer.user?.profile_image ||
    customer.user?.profileImage;

  return (
    <div className="bg-white rounded-xl shadow-sm border p-5">
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <FaTimes />
        </button>
      </div>

      {/* Profile */}
      <div className="flex flex-col items-center">
        {profileImageSrc ? (
          <img
            src={profileImageSrc}
            alt={customer.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-sm"
          />
        ) : (
          <FaUserCircle className="w-24 h-24 text-gray-300" />
        )}

        <h3 className="mt-4 text-lg font-bold text-gray-800">
          {customer.name}
        </h3>
        <p className="text-sm text-gray-500">{customer.email}</p>

        <span
          className={`mt-2 text-xs font-semibold px-3 py-1 rounded-full capitalize ${
            customer.level_membership === "platinum"
              ? "bg-purple-100 text-purple-700"
              : customer.level_membership === "gold"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          {customer.level_membership || "silver"}
        </span>
      </div>

      {/* Information */}
      <div className="mt-6 space-y-4">
        <div>
          <p className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wider">
            Customer Info
          </p>

          <div className="flex items-center gap-3 border rounded-lg p-3 text-sm font-medium text-gray-700 mb-2 bg-gray-50/50">
            <FaPhone className="text-[#4EA674]" />
            <span>{customer.phone || "-"}</span>
          </div>

          <div className="flex items-center gap-3 border rounded-lg p-3 text-sm font-medium text-gray-700 bg-gray-50/50">
            <FaMapMarkerAlt className="text-[#4EA674]" />
            <span>{customer.address || "-"}</span>
          </div>
        </div>
      </div>

      {/* Activity */}
      <div className="mt-6">
        <h4 className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wider">
          Activity
        </h4>
        <div className="bg-gray-50/50 rounded-lg border p-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Registration:</span>
            <span className="font-medium text-gray-800">
              {formatDate(customer.join_date)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Last Purchase:</span>
            <span className="font-medium text-gray-800">
              {formatDate(customer.last_purchase)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Source:</span>
            <span className="font-medium text-gray-800 capitalize">
              {customer.user_source || "-"}
            </span>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <button
        className="
          w-full mt-6 flex items-center justify-center gap-2
          bg-[#4EA674] text-white py-3 rounded-lg hover:bg-[#3d8c61] transition font-semibold shadow-sm
        "
      >
        <FaComments />
        Chat Customer
      </button>

      {/* Order Summary */}
      <div className="mt-6">
        <h4 className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wider">
          Order Overview
        </h4>

        <div className="grid grid-cols-3 gap-2">
          <div className="border rounded-lg py-3 px-1 flex flex-col items-center justify-center bg-gray-50/50">
            <p className="text-xl font-bold text-gray-800">
              {customer.order_count ?? 0}
            </p>
            <p
              className="text-[9px] sm:text-[10px] tracking-tight uppercase font-semibold text-gray-500 mt-1 w-full text-center truncate"
              title="Total"
            >
              Total
            </p>
          </div>

          <div className="border rounded-lg py-3 px-1 flex flex-col items-center justify-center bg-green-50/30">
            <p className="text-xl font-bold text-green-600">
              {customer.completed_orders ?? 0}
            </p>
            <p
              className="text-[9px] sm:text-[10px] tracking-tight uppercase font-semibold text-gray-500 mt-1 w-full text-center truncate"
              title="Completed"
            >
              Completed
            </p>
          </div>

          <div className="border rounded-lg py-3 px-1 flex flex-col items-center justify-center bg-red-50/30">
            <p className="text-xl font-bold text-red-500">
              {customer.cancelled_orders ?? 0}
            </p>
            <p
              className="text-[9px] sm:text-[10px] tracking-tight uppercase font-semibold text-gray-500 mt-1 w-full text-center truncate"
              title="Cancelled"
            >
              Cancelled
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
