import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import CustomersChart from "../components/CustomersChart";
import Card from "../components/Card";
import Table from "../components/Table";
import Button from "../components/Button";
import CustomerDetail from "../pages/CustomerDetail";
import { customerAPI } from "../services/customerAPI";
import AlertBox from "../components/AlertBox";
import DeleteModal from "../components/DeleteModal";
import CustomerModal from "../components/CustomerModal"; 

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedPeriod, setSelectedPeriod] = useState("thisWeek");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [alert, setAlert] = useState({ show: false, message: "", type: "info" });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, customerId: null });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await customerAPI.fetchCustomers();
      setCustomers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const showAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: "", type: "info" });
    }, 3000);
  };

  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    setDeleteModal({ isOpen: true, customerId: id });
  };

  const confirmDelete = async () => {
    try {
      await customerAPI.deleteCustomer(deleteModal.customerId);
      if (selectedCustomer?.id === deleteModal.customerId) {
        setSelectedCustomer(null);
      }
      showAlert("Customer berhasil dihapus!", "success");
      loadCustomers();
    } catch (error) {
      console.error(error);
      showAlert("Gagal menghapus data customer!", "error");
    } finally {
      setDeleteModal({ isOpen: false, customerId: null });
    }
  };

  const handleEditClick = (e, customer) => {
    e.stopPropagation(); // Mencegah baris tabel terpilih (menampilkan panel detail)
    setEditFormData(customer); // Masukkan data customer ke form
    setIsEditModalOpen(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    try {
      // Panggil API untuk update (sesuaikan nama function di customerAPI kamu)
      await customerAPI.updateCustomer(editFormData.id, editFormData);
      
      showAlert("Data customer berhasil diperbarui!", "success");
      setIsEditModalOpen(false);
      loadCustomers();
      
      // Jika data yang diedit sedang dibuka di panel kanan, update juga panelnya
      if (selectedCustomer?.id === editFormData.id) {
        setSelectedCustomer({ ...selectedCustomer, ...editFormData });
      }
    } catch (error) {
      console.error(error);
      showAlert("Gagal memperbarui data customer!", "error");
    } finally {
      setIsUploading(false);
    }
  };

  // Derived stats
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "Aktif").length;
  const totalSpendSum = customers.reduce(
    (sum, c) => sum + (Number(c.total_spend) || 0),
    0
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      
      {/* AlertBox */}
      {alert.show && (
        <div className="mb-4 animate-fade-in-down w-full">
          <AlertBox type={alert.type}>{alert.message}</AlertBox>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Customer Stats */}
        <div className="space-y-6">
          <Card>
            <p className="text-gray-800 font-bold mb-2 text-lg">Total Customers</p>
            <div className="flex items-end space-x-2">
              <span className="text-3xl font-extrabold text-gray-800">{totalCustomers}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">All time</p>
          </Card>

          <Card>
            <p className="text-gray-800 font-bold mb-2 text-lg">Active Customers</p>
            <div className="flex items-end space-x-2">
              <span className="text-3xl font-extrabold text-gray-800">{activeCustomers}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Status: Aktif</p>
          </Card>

          <Card>
            <p className="text-gray-800 font-bold mb-2 text-lg">Total Revenue</p>
            <div className="flex items-end space-x-2">
              <span className="text-3xl font-extrabold text-gray-800">${totalSpendSum.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Sum of total_spend</p>
          </Card>
        </div>

        {/* Right Overview Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 text-lg">Customer Overview</h3>
            <div className="inline-flex items-center bg-[#EAF8E7] gap-1 p-1 rounded-lg">
              <button
                onClick={() => setSelectedPeriod("thisWeek")}
                className={`px-4 py-2 rounded-md text-sm transition-all ${
                  selectedPeriod === "thisWeek"
                    ? "bg-white text-[#4EA674] shadow-sm font-medium"
                    : "text-gray-600"
                }`}
              >
                This week
              </button>
              <button
                onClick={() => setSelectedPeriod("lastWeek")}
                className={`px-4 py-2 rounded-md text-sm transition-all ${
                  selectedPeriod === "lastWeek"
                    ? "bg-white text-[#4EA674] shadow-sm font-medium"
                    : "text-gray-600"
                }`}
              >
                Last week
              </button>
            </div>
          </div>
          <div className="w-full h-[280px]">
            <CustomersChart />
          </div>
        </div>
      </div>

      {/* Customer List Table */}
      <div className={`grid gap-6 ${selectedCustomer ? "grid-cols-1 lg:grid-cols-4" : "grid-cols-1"}`}>
        <div className={`bg-white rounded-xl shadow-sm border overflow-hidden ${selectedCustomer ? "lg:col-span-3" : "w-full"}`}>
          {loading ? (
            <p className="p-6 text-center text-gray-400">Loading customers...</p>
          ) : customers.length === 0 ? (
            <p className="p-6 text-center text-gray-400">Belum ada data customer.</p>
          ) : (
            <Table
              headers={[
                "No.",
                "Name",
                "Phone",
                "Order Count",
                "Total Spend",
                "Status",
                "Action",
              ]}
            >
              {customers.map((customer, index) => (
                <tr
                  key={customer.id}
                  onClick={() => setSelectedCustomer(customer)}
                  className={`
                    cursor-pointer border-b border-[#EAF8E7] hover:bg-[#F7FCF5] transition-all
                    ${selectedCustomer?.id === customer.id ? "bg-[#F7FCF5]" : ""}
                  `}
                >
                  <td className="p-4 text-gray-500">{index + 1}</td>
                  <td className="p-4 text-gray-700">{customer.name}</td>
                  <td className="p-4 text-gray-500">{customer.phone}</td>
                  <td className="p-4">{customer.order_count}</td>
                  <td className="p-4 font-medium text-gray-800">${Number(customer.total_spend || 0).toFixed(2)}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium
                        ${customer.status === "Aktif" ? "text-[#4EA674]" : "text-red-500"}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${customer.status === "Aktif" ? "bg-[#4EA674]" : "bg-red-500"}`}></span>
                      {customer.status}
                    </span>
                  </td>
                  <td className="p-4 flex space-x-3 text-gray-400">
                    {/* 🔥 Pasang onClick handler ke tombol Edit */}
                    <Button type="edit" onClick={(e) => handleEditClick(e, customer)}>
                      <FaEdit />
                    </Button>
                    <Button type="hapus" onClick={(e) => handleDeleteClick(e, customer.id)}>
                      <FaTrashAlt />
                    </Button>
                  </td>
                </tr>
              ))}
            </Table>
          )}
        </div>

        {selectedCustomer && (
          <div className="lg:col-span-1">
            <CustomerDetail
              customer={selectedCustomer}
              onClose={() => setSelectedCustomer(null)}
            />
          </div>
        )}
      </div>

      {/* Pop Up Confirm Delete Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, customerId: null })}
        onConfirm={confirmDelete}
        message="Apakah Anda yakin ingin menghapus customer ini? Data yang dihapus tidak dapat dikembalikan."
      />

      {/*  Pop Up Customer Modal */}
      {isEditModalOpen && (
        <CustomerModal
          onClose={() => setIsEditModalOpen(false)}
          formData={editFormData}
          handleInputChange={handleEditInputChange}
          handleSubmit={handleEditSubmit}
          uploading={isUploading}
        />
      )}
    </div>
  );
}