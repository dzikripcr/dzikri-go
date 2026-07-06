import { FaTimes } from "react-icons/fa";
import InputField from "./InputField";
import Button from "./Button";

export default function KategoriProdukModal({
  onClose,
  formData,
  handleInputChange,
  handleSubmit,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
        >
          <FaTimes />
        </button>

        <h2 className="text-lg font-bold text-gray-800 mb-4">
          {formData.id ? "Edit Kategori" : "Tambah Kategori"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Nama Kategori
            </label>
            <InputField
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-sm outline-none focus:border-[#4EA674]/50"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Deskripsi
            </label>
            <InputField
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-sm outline-none focus:border-[#4EA674]/50"
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