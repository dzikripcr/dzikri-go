import { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrashAlt } from "react-icons/fa";

import { userAPI } from "../services/userAPI";

import Table from "../components/Table";
import Button from "../components/Button";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import UserModal from "../components/UserModal";
import AlertBox from "../components/AlertBox";
import DeleteModal from "../components/DeleteModal";
import Badge from "../components/Badge"; // Import Badge Component

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

  // State form disesuaikan dengan skema tabel public."user"
  const [formData, setFormData] = useState({
    nama_user: "", 
    email: "",
    password: "",
    role: "member",
    poto_profil: "", 
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const loadUsers = async () => {
    try {
      const data = await userAPI.fetchUser();
      setUsers(data);
    } catch (error) {
      console.error("Gagal memuat data user:", error);
      showAlert("Gagal memuat data pengguna dari server.", "error");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const showAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });
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
        poto_profil: URL.createObjectURL(file), 
      });
    }
  };

  const resetForm = () => {
    setFormData({
      nama_user: "",
      email: "",
      password: "",
      role: "member",
      poto_profil: "",
    });
    setImageFile(null);
    setEditingUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUploading(true);
      let profileImageUrl = formData.poto_profil;

      // Upload gambar ke bucket jika ada file baru yang dipilih
      if (imageFile) {
        profileImageUrl = await userAPI.uploadProfileImage(
          imageFile,
          editingUser ? editingUser.id : "new"
        );
      }

      // Payload untuk dikirim ke DB (kolom poto_profil)
      const payload = { ...formData, poto_profil: profileImageUrl };

      if (editingUser) {
        // Jangan update password jika field dikosongkan saat edit
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
      nama_user: user.nama_user || "", 
      email: user.email || "",
      password: "", // Kosongkan password saat edit, diisi jika ingin diubah
      role: user.role || "member",
      poto_profil: user.poto_profil || "", 
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, userId: id });
  };

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

  // Filter logika menggunakan nama_user dan email
  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();
    
    const matchSearch =
      (user.nama_user?.toLowerCase().includes(search)) ||
      (user.email?.toLowerCase().includes(search));
      
    const matchRole =
      selectedRole && selectedRole !== "all"
        ? user.role === selectedRole
        : true;
        
    return matchSearch && matchRole;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
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
                    src={user.poto_profil || "/default-avatar.png"}
                    alt={user.nama_user}
                    className="w-9 h-9 rounded-full object-cover border"
                  />
                </td>

                <td className="p-4 font-semibold">{user.nama_user}</td>
                <td className="p-4 text-gray-600">{user.email}</td>

                <td className="p-4">
                  {/* Pemanggilan Komponen Badge di sini */}
                  <Badge type={user.role}>{user.role}</Badge>
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

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, userId: null })}
        onConfirm={confirmDelete}
        message="Apakah Anda yakin ingin menghapus user ini? Data yang dihapus tidak dapat dikembalikan."
      />
    </div>
  );
}