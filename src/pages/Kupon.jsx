import { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrashAlt } from "react-icons/fa";

import Table from "../components/Table";
import Button from "../components/Button";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import KuponModal from "../components/KuponModal";
import AlertBox from "../components/AlertBox";
import DeleteModal from "../components/DeleteModal";
import { kuponAPI } from "../services/kuponAPI";

export default function Kupon() {
  const [kuponList, setKuponList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State untuk Alert Box & Delete Modal
  const [alert, setAlert] = useState({ show: false, message: "", type: "info" });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    discountType: "percentage",
    discountValue: "",
    minPurchase: "",
    maxUsage: "",
    validFrom: "",
    validUntil: "",
    status: "Active",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const loadKupon = async () => {
    try {
      const data = await kuponAPI.fetchKupon();
      setKuponList(data);
    } catch (error) {
      console.error(error);
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
    setFormData({
      code: "",
      name: "",
      discountType: "percentage",
      discountValue: "",
      minPurchase: "",
      maxUsage: "",
      validFrom: "",
      validUntil: "",
      status: "Active",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.id) {
        await kuponAPI.updateKupon(formData.id, formData);
        showAlert("Kupon berhasil diperbarui!", "success");
      } else {
        await kuponAPI.createKupon(formData);
        showAlert("Kupon baru berhasil ditambahkan!", "success");
      }

      setIsModalOpen(false);
      setFormData({
        code: "",
        name: "",
        discountType: "percentage",
        discountValue: "",
        minPurchase: "",
        maxUsage: "",
        validFrom: "",
        validUntil: "",
        status: "Active",
      });
      loadKupon();
    } catch (error) {
      console.error(error);
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
      console.error(error);
      showAlert("Gagal menghapus kupon!", "error");
    } finally {
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  const filteredKupon = kuponList.filter((item) => {
    const search = searchTerm.toLowerCase();

    const matchSearch =
      item.code.toLowerCase().includes(search) ||
      item.name.toLowerCase().includes(search);

    const matchStatus =
      selectedStatus && selectedStatus !== "all"
        ? item.status === selectedStatus
        : true;

    return matchSearch && matchStatus;
  });

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
            placeholder="All Status"
            options={[
              { label: "All Status", value: "all" },
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
              { label: "Expired", value: "Expired" },
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
                <td className="p-4 font-semibold">{item.code}</td>
                <td className="p-4">{item.name}</td>
                <td className="p-4">
                  {item.discountType === "percentage"
                    ? `${item.discountValue}%`
                    : `Rp${Number(item.discountValue).toLocaleString("id-ID")}`}
                </td>
                <td className="p-4 text-gray-600">
                  Rp{Number(item.minPurchase || 0).toLocaleString("id-ID")}
                </td>
                <td className="p-4 text-gray-500">{item.validUntil}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Expired"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
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
        <KuponModal
          onClose={() => setIsModalOpen(false)}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleSubmit={handleSubmit}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        message="Apakah Anda yakin ingin menghapus kupon ini?"
      />
    </div>
  );
}