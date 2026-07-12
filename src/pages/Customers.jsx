import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaSearch } from "react-icons/fa";
import Table from "../components/Table";
import Button from "../components/Button";
import Badge from "../components/Badge";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
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

  // State untuk Search dan Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await customerAPI.fetchCustomers();
      setCustomers(data || []);
    } catch (error) {
      console.log(error);
      showAlert("Gagal memuat data customer", "error");
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
    e.stopPropagation();
    setEditFormData(customer);
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
      await customerAPI.updateCustomer(editFormData.id, editFormData);

      showAlert("Data customer berhasil diperbarui!", "success");
      setIsEditModalOpen(false);
      loadCustomers();

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

  // Logika Filter dan Pencarian
  const filteredCustomers = customers.filter((customer) => {
    const search = searchTerm.toLowerCase();

    // Bisa mencari berdasarkan Nama Customer atau Nomor HP
    const matchSearch =
      customer.nama_customer?.toLowerCase().includes(search) ||
      customer.nohp?.toLowerCase().includes(search);

    // Filter berdasarkan status
    const matchStatus =
      selectedStatus && selectedStatus !== "all"
        ? customer.status === selectedStatus
        : true;

    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      {/* AlertBox */}
      {alert.show && (
        <div className="mb-4 animate-fade-in-down w-full">
          <AlertBox type={alert.type}>{alert.message}</AlertBox>
        </div>
      )}

      {/* Customer List Section */}
      <div className={`grid gap-6 ${selectedCustomer ? "grid-cols-1 lg:grid-cols-4" : "grid-cols-1"}`}>
        <div className={`bg-white rounded-xl shadow-sm border overflow-hidden ${selectedCustomer ? "lg:col-span-3" : "w-full"}`}>
          
          {/* Header Search & Filter */}
          <div className="p-4 border-b flex flex-col md:flex-row justify-between gap-4 bg-white">
            <div className="relative w-full md:w-80">
              <InputField
                type="text"
                placeholder="Cari nama atau no HP..."
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

          {/* Table Container */}
          {loading ? (
            <p className="p-6 text-center text-gray-400">Loading customers...</p>
          ) : filteredCustomers.length === 0 ? (
            <p className="p-6 text-center text-gray-400">Belum ada data customer atau data tidak ditemukan.</p>
          ) : (
            <div className="overflow-x-auto">
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
                {/* Gunakan filteredCustomers untuk dirender */}
                {filteredCustomers.map((customer, index) => (
                  <tr
                    key={customer.id}
                    onClick={() => setSelectedCustomer(customer)}
                    className={`
                      cursor-pointer border-b border-[#EAF8E7] hover:bg-[#F7FCF5] transition-all
                      ${selectedCustomer?.id === customer.id ? "bg-[#F7FCF5]" : ""}
                    `}
                  >
                    <td className="p-4 text-gray-500">{index + 1}</td>
                    <td className="p-4 text-gray-700">{customer.nama_customer}</td>
                    <td className="p-4 text-gray-500">{customer.nohp}</td>
                    <td className="p-4">{customer.jumlah_pesanan}</td>
                    <td className="p-4 font-medium text-gray-800">Rp.{Number(customer.total_belanja || 0).toLocaleString("id-ID")}</td>

                    <td className="p-4">
                      <Badge type={customer.status === "aktif" ? "berhasil" : "gagal"}>
                        {customer.status}
                      </Badge>
                    </td>

                    <td className="p-4 flex space-x-3 text-gray-400">
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
            </div>
          )}
        </div>

        {/* Customer Detail Sidebar */}
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

      {/* Pop Up Customer Edit Modal */}
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