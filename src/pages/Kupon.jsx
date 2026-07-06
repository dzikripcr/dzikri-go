import { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrashAlt } from "react-icons/fa";

import Table from "../components/Table";
import Button from "../components/Button";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import KuponModal from "../components/KuponModal";

export default function Kupon() {
  const [kuponList, setKuponList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    const data = await kuponAPI.fetchKupon();
    setKuponList(data);
  };

  useEffect(() => {
    loadKupon();
  }, []);

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

    if (formData.id) {
      await kuponAPI.updateKupon(formData.id, formData);
    } else {
      await kuponAPI.createKupon(formData);
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
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah anda yakin ingin menghapus kupon ini?",
    );
    if (!confirmDelete) return;
    try {
      await kuponAPI.deleteKupon(id);
      loadKupon();
    } catch (error) {
      console.log(error);
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
    <div className="p-6 bg-gray-50 min-h-screen">
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
        <KuponModal
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