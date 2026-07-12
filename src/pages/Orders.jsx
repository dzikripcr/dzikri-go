import { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrashAlt } from "react-icons/fa";

import Table from "../components/Table";
import Button from "../components/Button";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import AlertBox from "../components/AlertBox";
import DeleteModal from "../components/DeleteModal";
import OrderModal from "../components/OrderModal";
import { pesananAPI } from "../services/pesananAPI";
import { produkAPI } from "../services/produkAPI";
import Badge from "@/components/Badge"; // Pastikan path ini sesuai dengan struktur Anda

const today = () => new Date().toISOString().slice(0, 10);

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [transaksiOptions, setTransaksiOptions] = useState([]);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [alert, setAlert] = useState({ show: false, message: "", type: "info" });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  const [formData, setFormData] = useState({
    idTransaksi: "",
    idProduk: "",
    nama_produk: "",
    total_kuantitas: 1,
    total_belanja: 0,
    tanggal_pesanan: today(),
    status_bayar: "belum bayar",
    status_pesanan: "menunggu konfirmasi",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState("all");

  const loadData = async () => {
    try {
      const [orderData, trxOptions, prodData] = await Promise.all([
        pesananAPI.fetchPesanan(),
        pesananAPI.fetchTransaksiOptions(),
        produkAPI.fetchProduk(),
      ]);
      setOrders(orderData);
      setTransaksiOptions(trxOptions);
      setProducts(prodData);
    } catch (error) {
      console.error("Gagal sinkronisasi data Supabase:", error.message);
      showAlert("Gagal memuat data order", "error");
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

    setFormData((prev) => {
      let updatedData = { ...prev, [name]: value };

      if (name === "idProduk") {
        const selected = products.find((p) => String(p.id) === String(value));
        const hargaProduk = selected ? (selected.harga || 0) : 0;
        
        updatedData.nama_produk = selected ? selected.nama_produk : "";
        updatedData.total_belanja = parseInt(updatedData.total_kuantitas || 0) * hargaProduk;
      }

      if (name === "total_kuantitas") {
        const selected = products.find((p) => String(p.id) === String(updatedData.idProduk));
        const hargaProduk = selected ? (selected.harga || 0) : 0;
        
        updatedData.total_belanja = parseInt(value || 0) * hargaProduk;
      }

      return updatedData;
    });
  };

  const openAddModal = () => {
    setFormData({
      idTransaksi: "",
      idProduk: "",
      nama_produk: "",
      total_kuantitas: 1,
      total_belanja: 0,
      tanggal_pesanan: today(),
      status_bayar: "belum bayar",
      status_pesanan: "menunggu konfirmasi",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setFormData({
      id: item.id,
      idTransaksi: item.idTransaksi,
      idProduk: item.idProduk,
      nama_produk: item.nama_produk,
      total_kuantitas: item.total_kuantitas || 1,
      total_belanja: item.total_belanja || 0,
      tanggal_pesanan: item.tanggal_pesanan ? item.tanggal_pesanan.slice(0, 10) : today(),
      status_bayar: item.status_bayar,
      status_pesanan: item.status_pesanan,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        idTransaksi: parseInt(formData.idTransaksi),
        idProduk: parseInt(formData.idProduk),
        nama_produk: formData.nama_produk,
        total_kuantitas: parseInt(formData.total_kuantitas),
        total_belanja: parseInt(formData.total_belanja),
        tanggal_pesanan: formData.tanggal_pesanan,
        status_bayar: formData.status_bayar,
        status_pesanan: formData.status_pesanan,
      };

      if (formData.id) {
        await pesananAPI.updatePesanan(formData.id, payload);
        showAlert("Pesanan berhasil diperbarui!", "success");
      } else {
        await pesananAPI.createPesanan(payload);
        showAlert("Pesanan baru berhasil ditambahkan!", "success");
      }

      setIsModalOpen(false);
      loadData();
    } catch (error) {
      showAlert("Gagal memproses data pesanan: " + error.message, "error");
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    try {
      await pesananAPI.deletePesanan(deleteModal.id);
      showAlert("Pesanan berhasil dihapus!", "success");
      loadData();
    } catch (error) {
      console.error(error);
      showAlert("Gagal menghapus pesanan!", "error");
    } finally {
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  const _searchTerm = searchTerm.toLowerCase();

  const filteredOrders = orders.filter((item) => {
    const matchesSearch = item.nama_produk?.toLowerCase().includes(_searchTerm);
    const matchesStatus = selectedStatus !== "all" ? item.status_pesanan === selectedStatus : true;
    const matchesPayment = selectedPayment !== "all" ? item.status_bayar === selectedPayment : true;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const statusTabs = [
    { label: "Semua Pesanan", value: "all", showCount: true },
    { label: "Menunggu Konfirmasi", value: "menunggu konfirmasi", showCount: false },
    { label: "Dikonfirmasi", value: "dikonfirmasi", showCount: false },        
    { label: "Dikirim", value: "dikirim", showCount: false },
    { label: "Diterima", value: "diterima", showCount: false },
    { label: "Dibatalkan", value: "dibatalkan", showCount: false },
  ];

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      {alert.show && (
        <div className="mb-4 animate-fade-in-down w-full">
          <AlertBox type={alert.type}>{alert.message}</AlertBox>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <Button onClick={openAddModal} type="add">
          <FaPlus className="mr-2" /> Tambah Pesanan
        </Button>
        
        <SelectField
          value={selectedPayment}
          onChange={setSelectedPayment}
          placeholder="Semua Pembayaran"
          options={[
            { label: "Semua Pembayaran", value: "all" },
            { label: "Sudah Bayar", value: "sudah bayar" },
            { label: "Belum Bayar", value: "belum bayar" },
          ]}
          className="w-[180px]"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex bg-[#EAF5EE] p-1 rounded-xl w-full md:w-auto overflow-x-auto">
            {statusTabs.map((tab) => {
              const isActive = selectedStatus === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setSelectedStatus(tab.value)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                    isActive ? "bg-white text-gray-800 shadow-sm" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                  {tab.showCount && (
                    <span className="text-[#4EA674] ml-1 font-semibold">
                      ({filteredOrders.length})
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <div className="relative w-full md:w-64">
              <InputField
                type="text"
                placeholder="Cari pesanan produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-200 bg-[#F9FAFB] rounded-lg py-1.5 pl-3 pr-10 text-sm outline-none focus:border-[#4EA674]/50 transition-colors"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table headers={["No.", "Produk", "Kuantitas", "Total Belanja", "Tanggal", "Pembayaran", "Status", "Action"]}>
            {filteredOrders.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 text-sm transition-colors">
                <td className="p-4 text-gray-500">{index + 1}</td>
                <td className="p-4 font-semibold text-gray-800">{item.nama_produk}</td>
                <td className="p-4 text-gray-600 text-center">{item.total_kuantitas || 0} pcs</td>
                <td className="p-4 font-medium text-gray-800">{formatRupiah(item.total_belanja || 0)}</td>
                <td className="p-4 text-gray-600">
                  {item.tanggal_pesanan ? new Date(item.tanggal_pesanan).toLocaleDateString("id-ID") : "-"}
                </td>
                
                {/* Badge Status Pembayaran */}
                <td className="p-4">
                  <Badge type={item.status_bayar === "sudah bayar" ? "berhasil" : "gagal"}>
                    {item.status_bayar}
                  </Badge>
                </td>
                
                {/* Badge Status Pesanan memanggil prop type sesuai database */}
                <td className="p-4">
                  <Badge type={item.status_pesanan}>
                    {item.status_pesanan}
                  </Badge>
                </td>
                
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
        <OrderModal
          onClose={() => setIsModalOpen(false)}
          formData={formData}
          transaksiOptions={transaksiOptions}
          products={products}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      )}

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        message="Apakah Anda yakin ingin menghapus pesanan ini secara permanen?"
      />
    </div>
  );
}