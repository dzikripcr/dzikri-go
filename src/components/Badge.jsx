import { 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock, 
  FaTruck, 
  FaBox, 
  FaExclamationCircle,
  FaShippingFast,
  FaUserShield,
  FaUserCog,
  FaUser
} from "react-icons/fa";

export default function Badge({ children, type = "primary" }) {
  
  const statusIcons = {
    error: <FaExclamationCircle />,
    berhasil: <FaCheckCircle />,
    gagal: <FaTimesCircle />,
    delivered: <FaBox />,
    pending: <FaClock />,
    shipped: <FaTruck />,
    canceled: <FaTimesCircle />,
    cancelled: <FaTimesCircle />,
    
    // --- Status Produk ---
    "stok tersedia": <FaCheckCircle />,
    "stok menipis": <FaClock />, 
    "stok habis": <FaTimesCircle />,

    // --- Status Pesanan ---
    "menunggu konfirmasi": <FaClock />,
    "dikonfirmasi": <FaCheckCircle />,
    "dikirim": <FaShippingFast />,
    "diterima": <FaBox />,
    "dibatalkan": <FaTimesCircle />,

    // --- Status Kupon / User Status ---
    "aktif": <FaCheckCircle />,
    "tidak aktif": <FaTimesCircle />,

    // --- Key Baru Role User ---
    "superadmin": <FaUserShield />,
    "admin": <FaUserCog />,
    "member": <FaUser />,
  };

  const statusColors = {
    error: "bg-rose-50 text-rose-700 border-rose-100 rounded-lg p-4 text-sm flex items-center mb-6 w-full",
    berhasil: "bg-emerald-50 text-emerald-700 border-emerald-100",
    gagal: "bg-rose-50 text-rose-700 border-rose-100",
    delivered: "bg-emerald-50 text-emerald-700 border-emerald-100",
    pending: "bg-amber-50 text-amber-700 border-amber-100",
    shipped: "bg-blue-50 text-blue-700 border-blue-100",
    canceled: "bg-rose-50 text-rose-700 border-rose-100",
    cancelled: "bg-rose-50 text-rose-700 border-rose-100",

    // --- Status Produk ---
    "stok tersedia": "bg-emerald-50 text-emerald-700 border-emerald-100",
    "stok menipis": "bg-amber-50 text-amber-700 border-amber-100",
    "stok habis": "bg-rose-50 text-rose-700 border-rose-100",

    // --- Status Pesanan ---
    "menunggu konfirmasi": "bg-yellow-50 text-yellow-700 border-yellow-100",
    "dikonfirmasi": "bg-blue-50 text-blue-700 border-blue-100",
    "dikirim": "bg-indigo-50 text-indigo-700 border-indigo-100",
    "diterima": "bg-green-50 text-green-700 border-green-100",
    "dibatalkan": "bg-red-50 text-red-700 border-red-100",

    // --- Status Kupon / User Status ---
    "aktif": "bg-emerald-50 text-emerald-700 border-emerald-100",
    "tidak aktif": "bg-red-50 text-red-700 border-red-100",

    // --- Key Baru Role User ---
    "superadmin": "bg-purple-50 text-purple-700 border-purple-100",
    "admin": "bg-teal-50 text-teal-700 border-teal-100",
    "member": "bg-slate-50 text-slate-700 border-slate-100",
  };

  // Base class style untuk semua jenis pill badge (kecuali banner error)
  const basePillStyle = "px-2.5 py-1 text-xs font-medium rounded-full border inline-flex items-center gap-1.5 capitalize whitespace-nowrap shadow-sm";

  // Gabungkan style dasar secara otomatis jika tipenya bukan 'error' besar
  const finalClassName = type === "error" 
    ? statusColors.error 
    : `${basePillStyle} ${statusColors[type?.toLowerCase()] || "bg-gray-50 text-gray-700 border-gray-100"}`;

  return (
    <span className={finalClassName}>
      {statusIcons[type?.toLowerCase()] && (
        <span className="opacity-90 scale-105">{statusIcons[type?.toLowerCase()]}</span>
      )}
      {children}
    </span>
  );
}