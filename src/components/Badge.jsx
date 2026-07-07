import { 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock, 
  FaTruck, 
  FaBox, 
  FaExclamationCircle 
} from "react-icons/fa";

export default function Badge({ children, type = "primary" }) {
  
  // 1. Mapping Icon berdasarkan tipe status
  const statusIcons = {
    error: <FaExclamationCircle />,
    berhasil: <FaCheckCircle />,
    gagal: <FaTimesCircle />,
    delivered: <FaBox />,
    pending: <FaClock />,
    shipped: <FaTruck />,
    canceled: <FaTimesCircle />,
    cancelled: <FaTimesCircle />,
    "In Stock": <FaCheckCircle />,
    "Low Stock": <FaClock />,
    "Out of Stock": <FaTimesCircle />,
  };

  // 2. Mapping tema warna (background, text, border)
  const statusColors = {
    error: "bg-rose-50 text-rose-700 border-rose-100 rounded-lg p-4 text-sm flex items-center mb-6 w-full",
    berhasil: "bg-emerald-50 text-emerald-700 border-emerald-100",
    gagal: "bg-rose-50 text-rose-700 border-rose-100",
    delivered: "bg-emerald-50 text-emerald-700 border-emerald-100",
    pending: "bg-amber-50 text-amber-700 border-amber-100",
    shipped: "bg-blue-50 text-blue-700 border-blue-100",
    canceled: "bg-rose-50 text-rose-700 border-rose-100",
    cancelled: "bg-rose-50 text-rose-700 border-rose-100",
    "In Stock": "bg-emerald-50 text-emerald-700 border-emerald-100",
    "Low Stock": "bg-amber-50 text-amber-700 border-amber-100",
    "Out of Stock": "bg-rose-50 text-rose-700 border-rose-100",
  };

  // 3. Base class style untuk semua jenis pill badge (kecuali banner error)
  const basePillStyle = "px-2.5 py-1 text-xs font-medium rounded-full border inline-flex items-center gap-1.5 capitalize whitespace-nowrap shadow-sm";

  // Gabungkan style dasar secara otomatis jika tipenya bukan 'error' besar
  const finalClassName = type === "error" 
    ? statusColors.error 
    : `${basePillStyle} ${statusColors[type] || "bg-gray-50 text-gray-700 border-gray-100"}`;

  return (
    <span className={finalClassName}>
      {statusIcons[type] && (
        <span className="opacity-90 scale-105">{statusIcons[type]}</span>
      )}
      {children}
    </span>
  );
}