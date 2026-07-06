import { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrashAlt } from "react-icons/fa";

import Table from "../components/Table";
import Button from "../components/Button";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import AlertBox from "../components/AlertBox";
import DeleteModal from "../components/DeleteModal";
import TransaksiModal from "../components/TransaksiModal";
import { transaksiAPI } from "../services/transaksiAPI";

const today = () => new Date().toISOString().slice(0, 10);

export default function Transaksi() {
  const [transaksiList, setTransaksiList] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [alert, setAlert] = useState({ show: false, message: "", type: "info" });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  const [formData, setFormData] = useState({
    id_customer: "",
    name: "",
    date: today(),
    payment: "qris",
    status: "berhasil",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState("all");

  const loadData = async () => {
    try {
      const [trxData, custData] = await Promise.all([
        transaksiAPI.fetchTransaksi(),
        transaksiAPI.fetchCustomers(),
      ]);
      setTransaksiList(trxData);
      setCustomers(custData);
    } catch (error) {
      console.error("Gagal sinkronisasi data Supabase:", error.message);
      showAlert("Gagal memuat data transaksi", "error");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: "", type: "info" });
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "id_customer") {
      const selected = customers.find((c) => String(c.id) === String(value));
      setFormData((prev) => ({
        ...prev,
        id_customer: value,
        name: selected ? selected.name : "",
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setFormData({
      id_customer: "",
      name: "",
      date: today(),
      payment: "qris",
      status: "berhasil",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setFormData({
      id: item.id,
      id_customer: item.id_customer,
      name: item.name,
      date: item.date ? item.date.slice(0, 10) : today(),
      payment: item.payment,
      status: item.status,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        id_customer: parseInt(formData.id_customer),
        name: formData.name,
        date: formData.date,
        payment: formData.payment,
        status: formData.status,
      };

      if (formData.id) {
        await transaksiAPI.updateTransaksi(formData.id, payload);
        showAlert("Transaksi berhasil diperbarui!", "success");
      } else {
        await transaksiAPI.createTransaksi(payload);
        showAlert("Transaksi baru berhasil ditambahkan!", "success");
      }

      setIsModalOpen(false);
      loadData();
    } catch (error) {
      showAlert("Gagal memproses data transaksi: " + error.message, "error");
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    try {
      await transaksiAPI.deleteTransaksi(deleteModal.id);
      showAlert("Transaksi berhasil dihapus!", "success");
      loadData();
    } catch (error) {
      console.error(error);
      showAlert("Gagal menghapus transaksi!", "error");
    } finally {
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  const _searchTerm = searchTerm.toLowerCase();

  const filteredTransaksi = transaksiList.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(_searchTerm);
    const matchesStatus =
      selectedStatus !== "all" ? item.status === selectedStatus : true;
    const matchesPayment =
      selectedPayment !== "all" ? item.payment === selectedPayment : true;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      {alert.show && (
        <div className="mb-4 animate-fade-in-down w-full">
          <AlertBox type={alert.type}>{alert.message}</AlertBox>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <Button onClick={openAddModal} type="add">
          <FaPlus className="mr-2" /> Tambah Transaksi
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-80">
            <InputField
              type="text"
              placeholder="Cari nama customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-200 rounded-md py-1.5 pl-8 pr-3 text-sm outline-none focus:border-[#4EA674]/50 transition-colors"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          </div>

          <div className="flex space-x-2 w-full md:w-auto">
            <SelectField
              value={selectedPayment}
              onChange={setSelectedPayment}
              placeholder="Semua Pembayaran"
              options={[
                { label: "Semua Pembayaran", value: "all" },
                { label: "COD", value: "cod" },
                { label: "QRIS", value: "qris" },
                { label: "Credit Card", value: "credit card" },
                { label: "Transfer", value: "transfer" },
              ]}
              className="w-[200px]"
            />
            <SelectField
              value={selectedStatus}
              onChange={setSelectedStatus}
              placeholder="Semua Status"
              options={[
                { label: "Semua Status", value: "all" },
                { label: "Berhasil", value: "berhasil" },
                { label: "Gagal", value: "gagal" },
              ]}
              className="w-[180px]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table headers={["No.", "Nama Customer", "Tanggal", "Pembayaran", "Status", "Action"]}>
            {filteredTransaksi.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 text-sm transition-colors">
                <td className="p-4 text-gray-500">{index + 1}</td>
                <td className="p-4 font-semibold text-gray-800">{item.name}</td>
                <td className="p-4 text-gray-600">
                  {item.date ? new Date(item.date).toLocaleDateString("id-ID") : "-"}
                </td>
                <td className="p-4 text-gray-600 capitalize">{item.payment}</td>
                <td className="p-4 capitalize">{item.status}</td>
                <td className="p-4 flex space-x-3 text-gray-400">
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
        <TransaksiModal
          onClose={() => setIsModalOpen(false)}
          formData={formData}
          customers={customers}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      )}

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        message="Apakah Anda yakin ingin menghapus transaksi ini secara permanen?"
      />
    </div>
  );
}