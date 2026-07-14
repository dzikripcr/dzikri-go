import { AiFillEye } from "react-icons/ai";
import { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import ProductModal from "../components/ProductModal";
import Table from "../components/Table";
import Button from "../components/Button";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import AlertBox from "../components/AlertBox";
import DeleteModal from "../components/DeleteModal";
import { produkAPI } from "../services/produkAPI";
import { kategoriProdukAPI } from "../services/kategoriAPI";
import Badge from "../components/Badge"; // Pastikan path ini benar

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // State untuk Alert Box
  const [alert, setAlert] = useState({ show: false, message: "", type: "info" });

  // State untuk Delete Confirmation Modal
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  const [formData, setFormData] = useState({
    nama_produk: "",
    idKategori: "",
    harga: "",
    stok: "",
    status: "stok tersedia",
    gambar_produk: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("id");

  const loadData = async () => {
    try {
      const prodData = await produkAPI.fetchProduk();
      const katData = await kategoriProdukAPI.fetchKategori();
      setProducts(prodData);
      setCategories(katData);
    } catch (error) {
      console.error("Gagal sinkronisasi data Supabase:", error.message);
      showAlert("Gagal memuat data", "error");
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
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const openAddModal = () => {
    setFormData({
      nama_produk: "",
      idKategori: categories[0]?.id || "",
      harga: "",
      stok: "",
      status: "stok tersedia",
      gambar_produk: "",
    });
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setFormData({
      id: product.id,
      nama_produk: product.nama_produk,
      idKategori: product.idKategori,
      harga: product.harga,
      stok: product.stok,
      status: product.status,
      gambar_produk: product.gambar_produk,
    });
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.gambar_produk;
      
      if (selectedFile) {
        imageUrl = await produkAPI.uploadImage(selectedFile);
      }

      const payload = {
        nama_produk: formData.nama_produk,
        idKategori: parseInt(formData.idKategori),
        harga: parseFloat(formData.harga),
        stok: parseInt(formData.stok),
        status: formData.status,
        gambar_produk: imageUrl,
      };

      if (formData.id) {
        await produkAPI.updateProduk(formData.id, payload);
        showAlert("Produk berhasil diperbarui!", "success");
      } else {
        await produkAPI.createProduk(payload);
        showAlert("Produk baru berhasil ditambahkan!", "success");
      }

      setIsModalOpen(false);
      loadData();
    } catch (error) {
      showAlert("Gagal memproses data produk: " + error.message, "error");
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    try {
      await produkAPI.deleteProduk(deleteModal.id);
      showAlert("Produk berhasil dihapus!", "success");
      loadData();
    } catch (error) {
      console.error(error);
      showAlert("Gagal menghapus produk!", "error");
    } finally {
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  const _searchTerm = searchTerm.toLowerCase();

  const filteredProducts = products
    .filter((product) => {
      const categoryName = product.kategori_produk?.nama_kategori?.toLowerCase() || "";
      const matchesSearch =
        (product.nama_produk && product.nama_produk.toLowerCase().includes(_searchTerm)) ||
        categoryName.includes(_searchTerm);

      const matchesCategory =
        selectedCategory && selectedCategory !== "all"
          ? product.idKategori === parseInt(selectedCategory)
          : true;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "stock-asc":
          return a.stok - b.stok;
        case "stock-desc":
          return b.stok - a.stok;
        default:
          return String(a.id).localeCompare(String(b.id));
      }
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
          <FaPlus className="mr-2" /> Add Product
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-80">
            <InputField
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-200 rounded-md py-1.5 pl-8 pr-3 text-sm outline-none focus:border-[#4EA674]/50 transition-colors"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          </div>

          <div className="flex space-x-2 w-full md:w-auto">
            <SelectField
              value={sortBy}
              onChange={setSortBy}
              options={[
                { label: "Default Sort", value: "id" },
                { label: "Stock: Lowest to Highest", value: "stock-asc" },
                { label: "Stock: Highest to Lowest", value: "stock-desc" },
              ]}
              className="w-[220px]"
            />
            <SelectField
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="All Category"
              options={[
                { label: "All Category", value: "all" },
                ...categories.map((cat) => ({
                  label: cat.nama_kategori, 
                  value: String(cat.id),
                })),
              ]}
              className="w-[180px]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table headers={["No.", "Product Name", "Category", "Price", "Stock", "Status", "Action"]}>
            {filteredProducts.map((product, index) => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 text-sm transition-colors">
                <td className="p-4 text-gray-500">{index + 1}</td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden">
                      {product.gambar_produk ? (
                        <img src={product.gambar_produk} alt={product.nama_produk} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-xs text-gray-400">No Image</div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{product.nama_produk}</p>
                    </div>
                  </div>
                </td>
                
                <td className="p-4 text-gray-600">{product.kategori_produk?.nama_kategori || "Uncategorized"}</td>
                <td className="p-4 font-bold text-gray-800">Rp {parseFloat(product.harga).toLocaleString("id-ID")}</td>
                <td className="p-4 text-gray-800 font-medium">{product.stok}</td>
                
                <td className="p-4">
                  {/* PEMANGGILAN KOMPONEN BADGE */}
                  <Badge type={product.status}>{product.status}</Badge>
                </td>

                <td className="p-4 flex space-x-3 text-gray-400">
                  <Button type="edit" onClick={() => openEditModal(product)}>
                    <FaEdit />
                  </Button>
                  <Button type="hapus" onClick={() => handleDeleteClick(product.id)}>
                    <FaTrashAlt />
                  </Button>
                  <Link to={`/products/${product.id}`} className="text-emerald-400 hover:text-emerald-500 mt-1">
                    <AiFillEye size={18} />
                  </Link>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </div>

      {isModalOpen && (
        <ProductModal
          onClose={() => setIsModalOpen(false)}
          formData={formData}
          categories={categories}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
          selectedFile={selectedFile}
        />
      )}

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        message="Apakah Anda yakin ingin menghapus produk ini secara permanen?"
      />
    </div>
  );
}