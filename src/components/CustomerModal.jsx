import { FaTimes } from "react-icons/fa";

export default function CustomerModal({
  onClose,
  formData,
  handleInputChange,
  handleSubmit,
  uploading = false,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Edit Customer</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800 transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Phone</label>
            <input
              type="text"
              name="nohp"
              value={formData.nohp || ""}
              onChange={handleInputChange}
              className="w-full border rounded-md px-4 py-2 outline-none focus:border-[#4EA674] transition-colors"
              placeholder="08123456789"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Address</label>
            <textarea
              name="alamat"
              value={formData.alamat || ""}
              onChange={handleInputChange}
              className="w-full border rounded-md px-4 py-2 outline-none focus:border-[#4EA674] transition-colors"
              placeholder="Alamat lengkap"
              rows="3"
            ></textarea>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status || "aktif"}
              onChange={handleInputChange}
              className="w-full border rounded-md px-4 py-2 outline-none focus:border-[#4EA674] transition-colors"
            >
              <option value="aktif">Aktif</option>
              <option value="tidak aktif">Tidak Aktif</option>
            </select>
          </div>

          {/* Level Membership */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Level Membership</label>
            <select
              name="level_membership"
              value={formData.level_membership || "silver"}
              onChange={handleInputChange}
              className="w-full border rounded-md px-4 py-2 outline-none focus:border-[#4EA674] transition-colors"
            >
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
              <option value="platinum">Platinum</option>
            </select>
          </div>

          {/* User Source */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">User Source</label>
            <input
              type="text"
              name="sumber_user"
              value={formData.sumber_user || ""}
              onChange={handleInputChange}
              className="w-full border rounded-md px-4 py-2 outline-none focus:border-[#4EA674] transition-colors"
              placeholder="Misal: Instagram, Referensi Teman"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 rounded-md hover:bg-gray-100 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="bg-[#4EA674] text-white px-5 py-2 rounded-md hover:bg-[#3d8c61] transition-colors font-medium disabled:opacity-60"
            >
              {uploading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}