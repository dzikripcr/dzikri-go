import { FaTimes } from "react-icons/fa";
import InputField from "./InputField";
import SelectField from "./SelectField";
import Button from "./Button";

export default function KuponModal({
  onClose,
  formData,
  handleInputChange,
  handleSelectChange,
  handleSubmit,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
        >
          <FaTimes />
        </button>

        <h2 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">
          {formData.id ? "Edit Kupon" : "Tambah Kupon"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Kode Kupon
            </label>
            <InputField
              type="text"
              name="kode"
              value={formData.kode || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-sm outline-none focus:border-[#4EA674]/50"
              required
              placeholder="masukkan kode kupon..."
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Nama Promo
            </label>
            <InputField
              type="text"
              name="nama_kupon"
              value={formData.nama_kupon || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-sm outline-none focus:border-[#4EA674]/50"
              required
              placeholder="masukkan nama promo..."
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Tipe Diskon
            </label>
            <SelectField
              value={formData.tipe_diskon}
              onChange={(val) => handleSelectChange("tipe_diskon", val)}
              options={[
                { label: "Persentase (%)", value: "Persentase" },
                { label: "Nominal (Rp)", value: "Nominal" },
              ]}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Nilai Diskon
            </label>
            <div className="relative flex items-center">
              {formData.tipe_diskon === "Nominal" && (
                <span className="absolute left-3 text-gray-500 text-sm font-medium">
                  Rp
                </span>
              )}

              <InputField
                type="number"
                name="diskon"
                min="0"
                step="0.01"
                value={formData.diskon || ""}
                onChange={handleInputChange}
                className={`w-full border border-gray-200 rounded-md py-1.5 text-sm outline-none focus:border-[#4EA674]/50 ${
                  formData.tipe_diskon === "Nominal" ? "pl-9 pr-3" : "pl-3 pr-8"
                }`}
                required
                placeholder="masukkan nilai diskon..."
              />

              {formData.tipe_diskon === "Persentase" && (
                <span className="absolute right-3 text-gray-500 text-sm font-medium">
                  %
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Minimal Belanja
            </label>
            <InputField
              type="number"
              name="minimal_belanja"
              min="0"
              value={formData.minimal_belanja || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-sm outline-none focus:border-[#4EA674]/50"
              placeholder="masukkan minimal belanja..."
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Maksimal Pemakaian
            </label>
            <InputField
              type="number"
              name="maksimal_pemakaian"
              min="1"
              value={formData.maksimal_pemakaian || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-sm outline-none focus:border-[#4EA674]/50"
              placeholder="masukkan maksimal pemakaian..."
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Berlaku Dari
            </label>
            <InputField
              type="date"
              name="berlaku_dari"
              value={formData.berlaku_dari || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-sm outline-none focus:border-[#4EA674]/50"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Berlaku Sampai
            </label>
            <InputField
              type="date"
              name="berlaku_sampai"
              value={formData.berlaku_sampai || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-sm outline-none focus:border-[#4EA674]/50"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Status
            </label>
            <SelectField
              value={formData.status}
              onChange={(val) => handleSelectChange("status", val)}
              options={[
                { label: "Aktif", value: "aktif" },
                { label: "Tidak Aktif", value: "tidak aktif" },
              ]}
              className="w-full"
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 pt-4 mt-2 border-t">
            <Button
              type="button"
              className="bg-gray-100 text-gray-600 hover:bg-gray-200"
              onClick={onClose}
            >
              Batal
            </Button>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </div>
    </div>
  );
}