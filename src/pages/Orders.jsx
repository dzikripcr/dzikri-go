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
import Badge from "@/components/Badge";

const today = () => new Date().toISOString().slice(0, 10);

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [transaksiOptions, setTransaksiOptions] = useState([]);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [alert, setAlert] = useState({ show: false, message: "", type: "info" });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  const [formData, setFormData] = useState({
    id_transaksi: "",
    id_produk: "",
    product_name: "",
    total_kuantitas: 1,
    total_belanja: 0,
    date: today(),
    payment: "unpaid",
    status: "shipped",
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

      // Jika produk berubah, cari harganya dan hitung ulang total belanja
      if (name === "id_produk") {
        const selected = products.find((p) => String(p.id) === String(value));
        const hargaProduk = selected ? (selected.harga || selected.price || 0) : 0;
        
        updatedData.product_name = selected ? selected.name : "";
        updatedData.total_belanja = parseInt(updatedData.total_kuantitas || 0) * hargaProduk;
      }

      // Jika kuantitas berubah, hitung ulang total belanja berdasarkan produk terpilih
      if (name === "total_kuantitas") {
        const selected = products.find((p) => String(p.id) === String(updatedData.id_produk));
        const hargaProduk = selected ? (selected.harga || selected.price || 0) : 0;
        
        updatedData.total_belanja = parseInt(value || 0) * hargaProduk;
      }

      return updatedData;
    });
  };

  const openAddModal = () => {
    setFormData({
      id_transaksi: "",
      id_produk: "",
      product_name: "",
      total_kuantitas: 1,
      total_belanja: 0,
      date: today(),
      payment: "unpaid",
      status: "shipped",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setFormData({
      id: item.id,
      id_transaksi: item.id_transaksi,
      id_produk: item.id_produk,
      product_name: item.product_name,
      total_kuantitas: item.total_kuantitas || 1,
      total_belanja: item.total_belanja || 0,
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
        id_transaksi: parseInt(formData.id_transaksi),
        id_produk: parseInt(formData.id_produk),
        product_name: formData.product_name,
        total_kuantitas: parseInt(formData.total_kuantitas),
        total_belanja: parseInt(formData.total_belanja),
        date: formData.date,
        payment: formData.payment,
        status: formData.status,
      };

      if (formData.id) {
        await pesananAPI.updatePesanan(formData.id, payload);
        showAlert("Order berhasil diperbarui!", "success");
      } else {
        await pesananAPI.createPesanan(payload);
        showAlert("Order baru berhasil ditambahkan!", "success");
      }

      setIsModalOpen(false);
      loadData();
    } catch (error) {
      showAlert("Gagal memproses data order: " + error.message, "error");
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    try {
      await pesananAPI.deletePesanan(deleteModal.id);
      showAlert("Order berhasil dihapus!", "success");
      loadData();
    } catch (error) {
      console.error(error);
      showAlert("Gagal menghapus order!", "error");
    } finally {
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  const _searchTerm = searchTerm.toLowerCase();

  const filteredOrders = orders.filter((item) => {
    const matchesSearch = item.product_name?.toLowerCase().includes(_searchTerm);
    const matchesStatus = selectedStatus !== "all" ? item.status === selectedStatus : true;
    const matchesPayment = selectedPayment !== "all" ? item.payment === selectedPayment : true;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const statusTabs = [
    { label: "All order", value: "all", showCount: true },
    { label: "Shipped", value: "Shipped", showCount: false },
    { label: "Pending", value: "Pending", showCount: false },        
    { label: "Delivered", value: "Delivered", showCount: false },
    { label: "Canceled", value: "Canceled", showCount: false },
  ];

  // Helper format rupiah
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
          <FaPlus className="mr-2" /> Tambah Order
        </Button>
        
        <SelectField
          value={selectedPayment}
          onChange={setSelectedPayment}
          placeholder="Semua Pembayaran"
          options={[
            { label: "Semua Pembayaran", value: "all" },
            { label: "Paid", value: "paid" },
            { label: "Unpaid", value: "unpaid" },
          ]}
          className="w-[180px]"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex bg-[#EAF5EE] p-1 rounded-xl w-full md:w-auto">
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
                placeholder="Cari pesanan pelanggan..."
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
                <td className="p-4 font-semibold text-gray-800">{item.product_name}</td>
                <td className="p-4 text-gray-600 text-center">{item.total_kuantitas || 0} pcs</td>
                <td className="p-4 font-medium text-gray-800">{formatRupiah(item.total_belanja || 0)}</td>
                <td className="p-4 text-gray-600">
                  {item.date ? new Date(item.date).toLocaleDateString("id-ID") : "-"}
                </td>
                <td className="p-4">
                  <Badge type={item.payment === "paid" ? "berhasil" : "gagal"}>
                    <span className="capitalize">{item.payment}</span>
                  </Badge>
                </td>
                <td className="p-4">
                  <Badge type={item.status ? item.status.toLowerCase() : "pending"}>
                    {item.status}
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
        message="Apakah Anda yakin ingin menghapus order ini secara permanen?"
      />
    </div>
  );
}