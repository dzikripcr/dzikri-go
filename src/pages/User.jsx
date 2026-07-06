import { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrashAlt, FaExclamationTriangle } from "react-icons/fa";

import { userAPI } from "../services/userAPI";

import Table from "../components/Table";
import Button from "../components/Button";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import UserModal from "../components/UserModal";
import AlertBox from "../components/AlertBox";
import DeleteModal from "../components/DeleteModal";

export default function User() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // State untuk Alert Box
  const [alert, setAlert] = useState({ show: false, message: "", type: "info" });

  // State untuk Delete Confirmation Modal
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, userId: null });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
    profile_image: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const loadUsers = async () => {
    const data = await userAPI.fetchUser();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Fungsi pembantu untuk memunculkan alert sementara
  const showAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });
    // Otomatis hilangkan alert setelah 3 detik
    setTimeout(() => {
      setAlert({ show: false, message: "", type: "info" });
    }, 3000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setFormData({
        ...formData,
        profile_image: URL.createObjectURL(file),
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "member",
      profile_image: "",
    });
    setImageFile(null);
    setEditingUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUploading(true);
      let profileImageUrl = formData.profile_image;

      if (imageFile) {
        profileImageUrl = await userAPI.uploadProfileImage(
          imageFile,
          editingUser ? editingUser.id : "new"
        );
      }

      const payload = { ...formData, profile_image: profileImageUrl };

      if (editingUser) {
        if (!payload.password) delete payload.password;
        await userAPI.updateUser(editingUser.id, payload);
        showAlert("Data user berhasil diperbarui!", "success");
      } else {
        await userAPI.createUser(payload);
        showAlert("User baru berhasil ditambahkan!", "success");
      }

      setIsModalOpen(false);
      resetForm();
      loadUsers();
    } catch (error) {
      console.error("Database Error Detail:", error.response?.data || error.message);
      showAlert(`Gagal menyimpan data: ${error.response?.data?.message || error.message}`, "error");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
      profile_image: user.profile_image || "",
    });
    setIsModalOpen(true);
  };

  // Fungsi untuk memunculkan modal delete
  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, userId: id });
  };

  // Fungsi eksekusi delete dari modal
  const confirmDelete = async () => {
    try {
      await userAPI.deleteUser(deleteModal.userId);
      showAlert("User berhasil dihapus!", "success");
      loadUsers();
    } catch (error) {
      console.error(error);
      showAlert("Gagal menghapus user!", "error");
    } finally {
      setDeleteModal({ isOpen: false, userId: null });
    }
  };

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();
    const matchSearch =
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search);
    const matchRole =
      selectedRole && selectedRole !== "all"
        ? user.role === selectedRole
        : true;
    return matchSearch && matchRole;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      
      {/* Menampilkan AlertBox di atas halaman jika state alert.show bernilai true */}
      {alert.show && (
        <div className="mb-4 animate-fade-in-down w-full">
          <AlertBox type={alert.type}>{alert.message}</AlertBox>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <Button
          type="add"
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
        >
          <FaPlus className="mr-2" />
          Add User
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-80">
            <InputField
              type="text"
              placeholder="Search User..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-200 rounded-md py-1.5 pl-8 pr-3 text-sm outline-none focus:border-[#4EA674]/50 transition-colors"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          </div>

          <SelectField
            value={selectedRole}
            onChange={setSelectedRole}
            placeholder="All Role"
            options={[
              { label: "All Role", value: "all" },
              { label: "Super Admin", value: "superadmin" },
              { label: "Admin", value: "admin" },
              { label: "Member", value: "member" },
            ]}
          />
        </div>

        <div className="overflow-x-auto">
          <Table headers={["No", "Photo", "Name", "Email", "Role", "Action"]}>
            {filteredUsers.map((user, index) => (
              <tr key={user.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="p-4">{index + 1}</td>

                <td className="p-4">
                  <img
                    src={user.profile_image || "/default-avatar.png"}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover border"
                  />
                </td>

                <td className="p-4 font-semibold">{user.name}</td>
                <td className="p-4 text-gray-600">{user.email}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "admin" || user.role === "superadmin"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="p-4 flex gap-3">
                  <Button type="edit" onClick={() => handleEdit(user)}>
                    <FaEdit />
                  </Button>
                  <Button type="hapus" onClick={() => handleDeleteClick(user.id)}>
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </div>

      {/* User Edit/Add Modal */}
      {isModalOpen && (
        <UserModal
          onClose={() => {
            setIsModalOpen(false);
            resetForm();
          }}
          formData={formData}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
          isEditing={!!editingUser}
          uploading={uploading}
        />
      )}

      {/* Pop Up Confirm Delete Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, userId: null })}
        onConfirm={confirmDelete}
        message="Apakah Anda yakin ingin menghapus user ini? Data yang dihapus tidak dapat dikembalikan."
      />
    </div>
  );
}