import { FaTimes, FaUserCircle } from "react-icons/fa";

export default function UserModal({
  onClose,
  formData,
  handleInputChange,
  handleImageChange,
  handleSubmit,
  isEditing = false,
  uploading = false,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            {isEditing ? "Edit User" : "Add New User"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Profile image */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative group">
              {formData.profile_image ? (
                <img
                  src={formData.profile_image}
                  alt="preview"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 group-hover:border-[#4EA674] transition-colors duration-200"
                />
              ) : (
                <FaUserCircle className="w-24 h-24 text-gray-300 group-hover:text-gray-400 transition-colors duration-200" />
              )}
            </div>

            {/* Tombol Kustom Menggantikan Choose File */}
            <label className="cursor-pointer inline-flex items-center justify-center px-4 py-1.5 bg-[#4EA674]/10 hover:bg-[#4EA674]/20 text-[#4EA674] text-xs font-semibold rounded-full border border-[#4EA674]/20 transition-all duration-200 active:scale-95 shadow-sm">
              <span>{formData.profile_image ? "Ubah Foto" : "Pilih Foto"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border rounded-md px-4 py-2 outline-none focus:border-[#4EA674]"
              placeholder="User name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border rounded-md px-4 py-2 outline-none focus:border-[#4EA674]"
              placeholder="Email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password{" "}
              {isEditing && (
                <span className="text-xs text-gray-400">
                  (kosongkan jika tidak diubah)
                </span>
              )}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border rounded-md px-4 py-2 outline-none focus:border-[#4EA674]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full border rounded-md px-4 py-2"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              disabled={uploading}
              className="bg-[#4EA674] text-white px-5 py-2 rounded-md disabled:opacity-60"
            >
              {uploading ? "Saving..." : "Save User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
