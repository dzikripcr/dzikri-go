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
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
        >
          <FaTimes />
        </button>

        <h2 className="text-lg font-bold text-gray-800 mb-4">
          {formData.id ? "Edit Kupon" : "Tambah Kupon"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Kode Kupon</label>
            <InputField
              type="text"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-sm outline-none focus:border-[#4EA674]/50"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Nama Promo</label>
            <InputField
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-sm outline-none focus:border-[#4EA674]/50"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Tipe Diskon</label>
            <SelectField
              value={formData.discountType}
              onChange={(val) => handleSelectChange("discountType", val)}
              options={[
                { label: "Persentase (%)", value: "percentage" },
                { label: "Nominal (Rp)", value: "fixed" },
              ]}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Nilai Diskon</label>
            <InputField
              type="number"
              name="discountValue"
              value={formData.discountValue}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-sm outline-none focus:border-[#4EA674]/50"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Minimal Belanja</label>
            <InputField
              type="number"
              name="minPurchase"
              value={formData.minPurchase}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-sm outline-none focus:border-[#4EA674]/50"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Maksimal Pemakaian</label>
            <InputField
              type="number"
              name="maxUsage"
              value={formData.maxUsage}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-sm outline-none focus:border-[#4EA674]/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">Berlaku Dari</label>
              <InputField
                type="date"
                name="validFrom"
                value={formData.validFrom}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-sm outline-none focus:border-[#4EA674]/50"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">Berlaku Sampai</label>
              <InputField
                type="date"
                name="validUntil"
                value={formData.validUntil}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-sm outline-none focus:border-[#4EA674]/50"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Status</label>
            <SelectField
              value={formData.status}
              onChange={(val) => handleSelectChange("status", val)}
              options={[
                { label: "Active", value: "Active" },
                { label: "Inactive", value: "Inactive" },
                { label: "Expired", value: "Expired" },
              ]}
              className="w-full"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" className="bg-gray-100 text-gray-600 hover:bg-gray-200" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </div>
    </div>
  );
}