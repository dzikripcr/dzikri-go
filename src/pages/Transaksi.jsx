import { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrashAlt } from "react-icons/fa";

import Table from "../components/Table";
import Button from "../components/Button";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import TransaksiModal from "../components/TransaksiModal";

export default function Transaksi() {
  const [transaksiList, setTransaksiList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    idCustomer: "",
    customerName: "",
    payment: "qris",
    totalAmount: "",
    status: "Pending",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const loadTransaksi = async () => {
    const data = await transaksiAPI.fetchTransaksi();
    setTransaksiList(data);
  };

  useEffect(() => {
    loadTransaksi();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const openAddModal = () => {

    setFormData({
      idCustomer: "",
      customerName: "",
      payment: "qris",
      totalAmount: "",
      status: "Pending",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.id) {
      await transaksiAPI.updateTransaksi(formData.id, formData);
    } else {
      await transaksiAPI.createTransaksi(formData);
    }

    setIsModalOpen(false);

    setFormData({
      idCustomer: "",
      customerName: "",
      payment: "qris",
      totalAmount: "",
      status: "Pending",
    });
    loadTransaksi();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah anda yakin ingin menghapus transaksi ini?",
    );
    if (!confirmDelete) return;
    try {
      await transaksiAPI.deleteTransaksi(id);
      loadTransaksi();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredTransaksi = transaksiList.filter((item) => {
    const search = searchTerm.toLowerCase();
    const matchSearch = item.customerName.toLowerCase().includes(search);
    const matchStatus =
      selectedStatus && selectedStatus !== "all"
        ? item.status === selectedStatus
        : true;

    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <Button type="add" onClick={openAddModal}>
          <FaPlus className="mr-2" />
          Add Transaksi
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-80">
            <InputField
              type="text"
              placeholder="Search customer..."
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
              { label: "Pending", value: "Pending" },
              { label: "Success", value: "Success" },
              { label: "Failed", value: "Failed" },
            ]}
          />
        </div>

        <div className="overflow-x-auto">
          <Table
            headers={[
              "No",
              "Customer",
              "Tanggal",
              "Payment",
              "Total",
              "Status",
              "Action",
            ]}
          >
            {filteredTransaksi.map((item, index) => (
              <tr key={item.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="p-4">{index + 1}</td>
                <td className="p-4 font-semibold">{item.customerName}</td>
                <td className="p-4 text-gray-500">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="p-4 capitalize">{item.payment}</td>
                <td className="p-4 font-bold text-gray-800">
                  Rp{Number(item.totalAmount).toLocaleString("id-ID")}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === "Success"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Failed"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-4 flex gap-3">
                  <Button type="edit" onClick={() => openEditModal(item)}>
                    <FaEdit />
                  </Button>
                  <Button type="hapus" onClick={() => handleDelete(item.id)}>
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
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}