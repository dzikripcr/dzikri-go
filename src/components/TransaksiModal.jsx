import { FaTimes } from "react-icons/fa";

export default function TransaksiModal({
  onClose,
  formData,
  customers,
  handleInputChange,
  handleSubmit,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            {formData.id ? "Edit Transaksi" : "Tambah Transaksi"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-800 transition-colors">
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Customer & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Customer</label>
              <select
                name="id_customer"
                required
                value={formData.id_customer}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm outline-none focus:border-[#4EA674] text-gray-700"
              >
                <option value="" disabled>Pilih Customer</option>
                {customers.map((cust) => (
                  <option key={cust.id} value={cust.id}>
                    {cust.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Transaksi</label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm outline-none focus:border-[#4EA674]"
              />
            </div>
          </div>

          {/* Payment & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Metode Pembayaran</label>
              <select
                name="payment"
                value={formData.payment}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm outline-none focus:border-[#4EA674] text-gray-700"
              >
                <option value="cod">COD</option>
                <option value="qris">QRIS</option>
                <option value="credit card">Credit Card</option>
                <option value="transfer">Transfer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm outline-none focus:border-[#4EA674] text-gray-700"
              >
                <option value="berhasil">Berhasil</option>
                <option value="gagal">Gagal</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 pt-4 mt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-[#4EA674]/80 hover:bg-[#4EA674] text-white px-5 py-2 rounded-md text-sm font-medium"
            >
              Simpan Transaksi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}