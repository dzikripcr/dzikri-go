import React, { useState } from "react";
import { FiX, FiCheckCircle, FiZap } from "react-icons/fi";
import { useRewards } from "../../context/RewardsContext";

// Auto-forward ke "produksi": disimpan sebagai tiket, ditandai priority,
// tanpa langkah approval manual (sesuai alur CRM Member Platinum).
const forwardToProduction = (payload) => {
  const key = "dmboutiquera_custom_size_requests";
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  const ticket = {
    ...payload,
    ticketId: `CUSTOM-${Math.floor(100000 + Math.random() * 900000)}`,
    status: "diteruskan_ke_produksi",
    priority: true,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(key, JSON.stringify([ticket, ...existing]));
  return ticket;
};

export default function CustomSizeRequestModal({ product, onClose }) {
  const { memberTier } = useRewards();
  const isEligible = ["Platinum", "Boutique Elite"].includes(memberTier);

  const [form, setForm] = useState({
    dada: "",
    pinggang: "",
    pinggul: "",
    panjang: "",
    catatan: "",
  });
  const [ticket, setTicket] = useState(null);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = () => {
    if (!form.dada || !form.pinggang || !form.panjang) return;
    const result = forwardToProduction({
      productId: product.id,
      productName: product.nama,
      memberTier,
      ukuran: form,
    });
    setTicket(result); // Auto-sukses, tanpa konfirmasi manual berulang
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-[28px] p-7 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-black cursor-pointer"
        >
          <FiX size={20} />
        </button>

        {!isEligible ? (
          <div className="text-center py-6">
            <h3 className="font-black text-lg uppercase mb-2">Khusus Member Platinum</h3>
            <p className="text-sm text-gray-500">
              Fitur Custom Size & Prioritas Permintaan hanya tersedia untuk member tier tertinggi DM Boutiquera.
            </p>
          </div>
        ) : ticket ? (
          <div className="text-center py-4 space-y-3">
            <FiCheckCircle className="mx-auto text-4xl text-black" />
            <h3 className="font-black text-lg uppercase">Permintaan Diteruskan</h3>
            <p className="text-xs text-gray-500 font-mono">{ticket.ticketId}</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Spesifikasi ukuran Anda telah otomatis diteruskan ke tim produksi dengan status prioritas, tanpa perlu konfirmasi tambahan.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-1">
              <FiZap className="text-black" />
              <h3 className="font-black text-lg uppercase tracking-tight">Request Custom Ukuran</h3>
            </div>
            <p className="text-xs text-gray-500 mb-5">
              {product.nama} • Prioritas otomatis untuk Member Platinum
            </p>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <input placeholder="Dada (cm)" value={form.dada} onChange={handleChange("dada")}
                className="bg-[#F2F0F1] px-3 py-2.5 rounded-xl text-sm outline-none" />
              <input placeholder="Pinggang (cm)" value={form.pinggang} onChange={handleChange("pinggang")}
                className="bg-[#F2F0F1] px-3 py-2.5 rounded-xl text-sm outline-none" />
              <input placeholder="Pinggul (cm)" value={form.pinggul} onChange={handleChange("pinggul")}
                className="bg-[#F2F0F1] px-3 py-2.5 rounded-xl text-sm outline-none" />
              <input placeholder="Panjang (cm)" value={form.panjang} onChange={handleChange("panjang")}
                className="bg-[#F2F0F1] px-3 py-2.5 rounded-xl text-sm outline-none" />
            </div>
            <textarea
              placeholder="Catatan tambahan (opsional)"
              value={form.catatan}
              onChange={handleChange("catatan")}
              rows="2"
              className="w-full bg-[#F2F0F1] px-3 py-2.5 rounded-xl text-sm outline-none resize-none mb-4"
            />

            <button
              onClick={handleSubmit}
              className="w-full bg-black text-white text-sm font-bold py-3.5 rounded-full hover:bg-gray-800 transition cursor-pointer"
            >
              Ajukan & Teruskan ke Produksi
            </button>
          </>
        )}
      </div>
    </div>
  );
}