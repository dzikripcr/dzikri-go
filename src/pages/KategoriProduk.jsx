import { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrashAlt } from "react-icons/fa";

import Table from "../components/Table";
import Button from "../components/Button";
import InputField from "../components/InputField";
import KategoriProdukModal from "../components/KategoriProdukModal";
import { kategoriProdukAPI } from "../services/kategoriAPI";

export default function KategoriProduk() {
  const [kategoriList, setKategoriList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    category: "",
    description: "",
  });
  
  const [searchTerm, setSearchTerm] = useState("");

  const loadKategori = async () => {
    try {
      const data = await kategoriProdukAPI.fetchKategori();
      setKategoriList(data);
    } catch (error) {
      console.error("Gagal memuat kategori:", error.message);
    }
  };

  useEffect(() => {
    loadKategori();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setFormData({
      category: "",
      description: "",
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
        await kategoriProdukAPI.updateKategori(formData.id, formData);
      } else {
        await kategoriProdukAPI.createKategori(formData);
      }
      setIsModalOpen(false);
      setFormData({ category: "", description: "" });
      loadKategori();
    } catch (error) {
      alert("Error saving data: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah anda yakin ingin menghapus kategori ini?");
    if (!confirmDelete) return;
    try {
      await kategoriProdukAPI.deleteKategori(id);
      loadKategori();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredKategori = kategoriList.filter((item) =>
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
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
                <td className="p-4 font-semibold">{item.category}</td>
                <td className="p-4 text-gray-600">{item.description}</td>
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
        <KategoriProdukModal
          onClose={() => setIsModalOpen(false)}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}