import { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrashAlt } from "react-icons/fa";

import Table from "../components/Table";
import Button from "../components/Button";
import InputField from "../components/InputField";
import KategoriProdukModal from "../components/KategoriProdukModal";
import AlertBox from "../components/AlertBox";
import DeleteModal from "../components/DeleteModal";
import { kategoriProdukAPI } from "../services/kategoriAPI";

export default function KategoriProduk() {
  const [kategoriList, setKategoriList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State untuk Alert Box & Delete Modal
  const [alert, setAlert] = useState({ show: false, message: "", type: "info" });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  // Disesuaikan persis dengan skema kolom lokal: nama_kategori & deskripsi
  const [formData, setFormData] = useState({
    nama_kategori: "",
    deskripsi: "",
  });
  
  const [searchTerm, setSearchTerm] = useState("");

  const loadKategori = async () => {
    try {
      const data = await kategoriProdukAPI.fetchKategori();
      setKategoriList(data);
    } catch (error) {
      console.error("Gagal memuat kategori:", error.message);
      showAlert("Gagal memuat data kategori", "error");
    }
  };

  useEffect(() => {
    loadKategori();
  }, []);

  const showAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: "", type: "info" });
    }, 3000);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setFormData({
      nama_kategori: "",
      deskripsi: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    // Mengisi form dengan data dari row tabel
    setFormData({
      id: item.id,
      nama_kategori: item.nama_kategori,
      deskripsi: item.deskripsi,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await kategoriProdukAPI.updateKategori(formData.id, formData);
        showAlert("Kategori berhasil diperbarui!", "success");
      } else {
        await kategoriProdukAPI.createKategori(formData);
        showAlert("Kategori baru berhasil ditambahkan!", "success");
      }
      setIsModalOpen(false);
      setFormData({ nama_kategori: "", deskripsi: "" });
      loadKategori();
    } catch (error) {
      showAlert("Error saving data: " + error.message, "error");
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    try {
      await kategoriProdukAPI.deleteKategori(deleteModal.id);
      showAlert("Kategori berhasil dihapus!", "success");
      loadKategori();
    } catch (error) {
      console.error(error);
      showAlert("Gagal menghapus kategori!", "error");
    } finally {
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  // Logika pencarian menggunakan nama_kategori
  const filteredKategori = kategoriList.filter((item) =>
    (item.nama_kategori && item.nama_kategori.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      
      {/* Alert Box */}
      {alert.show && (
        <div className="mb-4 animate-fade-in-down w-full">
          <AlertBox type={alert.type}>{alert.message}</AlertBox>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <Button type="add" onClick={openAddModal}>
          <FaPlus className="mr-2" />
          Add Kategori
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative w-full md:w-80">
            <InputField
              type="text"
              placeholder="Search kategori..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-200 rounded-md py-1.5 pl-8 pr-3 text-sm outline-none focus:border-[#4EA674]/50 transition-colors"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table headers={["No", "Kategori", "Deskripsi", "Action"]}>
            {filteredKategori.map((item, index) => (
              <tr key={item.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="p-4">{index + 1}</td>
                <td className="p-4 font-semibold">{item.nama_kategori}</td>
                <td className="p-4 text-gray-600">{item.deskripsi}</td>
                <td className="p-4 flex gap-3">
                  <Button type="edit" onClick={() => openEditModal(item)}>
                    <FaEdit />
                  </Button>
                  <Button type="hapus" onClick={() => handleDeleteClick(item.id)}>
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </div>

      {isModalOpen && (
        <KategoriProdukModal
          onClose={() => setIsModalOpen(false)}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        message="Apakah Anda yakin ingin menghapus kategori ini? Data yang dihapus tidak dapat dikembalikan."
      />
    </div>
  );
}