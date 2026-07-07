export default function Badge({ children, type= "primary" }) {
  const types = {
    error: "bg-rose-50 mb-6 p-4 text-sm text-rose-700 border border-rose-100 rounded-lg flex items-center",
    "In Stock": "px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 inline-flex items-center",
    "Low Stock": "px-2.5 py-1 text-xs font-medium rounded-full bg-amber-50 text-amber-700 border border-amber-100 inline-flex items-center",
    "Out of Stock": "px-2.5 py-1 text-xs font-medium rounded-full bg-rose-50 text-rose-700 border border-rose-100 inline-flex items-center",
    berhasil: "px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 inline-flex items-center capitalize",
    gagal: "px-2.5 py-1 text-xs font-medium rounded-full bg-rose-50 text-rose-700 border border-rose-100 inline-flex items-center capitalize",
    delivered: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    pending: "bg-amber-50 text-amber-700 border border-amber-100",
    shipped: "bg-blue-50 text-blue-700 border border-blue-100",
    canceled: "bg-rose-50 text-rose-700 border border-rose-100",
    cancelled: "bg-rose-50 text-rose-700 border border-rose-100",
  };
	return (
        <span className={`${types[type]}`}>
                {children}
        </span>
	  );
}