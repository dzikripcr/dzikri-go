import { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrashAlt } from "react-icons/fa";

import Table from "../components/Table";
import Button from "../components/Button";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import KuponModal from "../components/KuponModal";
import AlertBox from "../components/AlertBox";
import DeleteModal from "../components/DeleteModal";
import Badge from "../components/Badge"; // Import Badge Component
import { kuponAPI } from "../services/kuponAPI";

export default function Kupon() {
  const [kuponList, setKuponList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "info",
  });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  // State 1:1 dengan Database Supabase
  const initialFormState = {
    kode: "",
    nama_kupon: "",
    tipe_diskon: "Persentase",
    diskon: "",
    minimal_belanja: "",
    maksimal_pemakaian: "",
    berlaku_dari: "",
    berlaku_sampai: "",
    status: "aktif",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const loadKupon = async () => {
    try {
      const data = await kuponAPI.fetchKupon();
      setKuponList(data || []);
    } catch (error) {
      showAlert("Gagal memuat data kupon", "error");
    }
  };

  useEffect(() => {
    loadKupon();
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

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const openAddModal = () => {
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    // Pastikan data null diubah menjadi string kosong agar input HTML tidak error
    setFormData({
      ...item,
      minimal_belanja: item.minimal_belanja || "",
      maksimal_pemakaian: item.maksimal_pemakaian || "",
      berlaku_dari: item.berlaku_dari || "",
      berlaku_sampai: item.berlaku_sampai || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sanitasi payload agar sesuai dengan PostgreSQL Data Types
    const payload = {
      kode: formData.kode,
      nama_kupon: formData.nama_kupon,
      tipe_diskon: formData.tipe_diskon,
      status: formData.status,
      diskon: Number(formData.diskon) || 0,
      minimal_belanja: formData.minimal_belanja ? Number(formData.minimal_belanja) : 0,
      maksimal_pemakaian: formData.maksimal_pemakaian ? Number(formData.maksimal_pemakaian) : null,
      berlaku_dari: formData.berlaku_dari ? formData.berlaku_dari : null,
      berlaku_sampai: formData.berlaku_sampai ? formData.berlaku_sampai : null,
    };

    try {
      if (formData.id) {
        // Update: Hapus kolom yang tidak boleh diubah dan perbarui updated_at
        payload.updated_at = new Date().toISOString();
        await kuponAPI.updateKupon(formData.id, payload);
        showAlert("Kupon berhasil diperbarui!", "success");
      } else {
        // Create
        await kuponAPI.createKupon(payload);
        showAlert("Kupon baru berhasil ditambahkan!", "success");
      }

      setIsModalOpen(false);
      loadKupon();
    } catch (error) {
      showAlert("Gagal menyimpan data kupon", "error");
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    try {
      await kuponAPI.deleteKupon(deleteModal.id);
      showAlert("Kupon berhasil dihapus!", "success");
      loadKupon();
    } catch (error) {
      showAlert("Gagal menghapus kupon!", "error");
    } finally {
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  const filteredKupon = kuponList.filter((item) => {
    const search = searchTerm.toLowerCase();

    const matchSearch =
      item.kode?.toLowerCase().includes(search) ||
      item.nama_kupon?.toLowerCase().includes(search);

    const matchStatus =
      selectedStatus && selectedStatus !== "all"
        ? item.status === selectedStatus
        : true;

    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      {alert.show && (
        <div className="mb-4 animate-fade-in-down w-full">
          <AlertBox type={alert.type}>{alert.message}</AlertBox>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <Button type="add" onClick={openAddModal}>
          <FaPlus className="mr-2" />
          Add Kupon
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-80">
            <InputField
              type="text"
              placeholder="Search kupon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-200 rounded-md py-1.5 pl-8 pr-3 text-sm outline-none focus:border-[#4EA674]/50 transition-colors"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          </div>

          <SelectField
            value={selectedStatus}
            onChange={setSelectedStatus}
            placeholder="Semua Status"
            options={[
              { label: "Semua Status", value: "all" },
              { label: "Aktif", value: "aktif" },
              { label: "Tidak Aktif", value: "tidak aktif" },
            ]}
          />
        </div>

        <div className="overflow-x-auto">
          <Table
            headers={[
              "No",
              "Kode",
              "Nama Promo",
              "Diskon",
              "Min. Belanja",
              "Berlaku Sampai",
              "Status",
              "Action",
            ]}
          >
            {filteredKupon.map((item, index) => (
              <tr key={item.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="p-4">{index + 1}</td>
                <td className="p-4 font-semibold">{item.kode}</td>
                <td className="p-4">{item.nama_kupon}</td>
                <td className="p-4">
                  {item.tipe_diskon?.toLowerCase() === "persentase"
                    ? `${item.diskon}%`
                    : `Rp${Number(item.diskon).toLocaleString("id-ID")}`}
                </td>
                <td className="p-4 text-gray-600">
                  Rp{Number(item.minimal_belanja || 0).toLocaleString("id-ID")}
                </td>
                <td className="p-4 text-gray-500">
                  {item.berlaku_sampai || "-"}
                </td>
                
                {/* Bagian ini telah diubah untuk menggunakan komponen Badge */}
                <td className="p-4">
                  <Badge type={item.status}>{item.status}</Badge>
                </td>

                <td className="p-4 flex gap-3">
                  <Button type="edit" onClick={() => openEditModal(item)}>
                    <FaEdit />
                  </Button>
                  <Button
                    type="hapus"
                    onClick={() => handleDeleteClick(item.id)}
                  >
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </div>

      {isModalOpen && (
        <KuponModal
          onClose={() => setIsModalOpen(false)}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleSubmit={handleSubmit}
        />
      )}

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        message="Apakah Anda yakin ingin menghapus kupon ini?"
      />
    </div>
  );
}