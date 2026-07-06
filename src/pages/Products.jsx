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
    name: "",
    category_id: "",
    price: "",
    stock: "",
    status: "Low Stock",
    image: "",
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

  // Fungsi pembantu untuk memunculkan alert sementara
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
      name: "",
      category_id: categories[0]?.id || "",
      price: "",
      stock: "",
      status: "Low Stock",
      image: "",
    });
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setFormData({
      id: product.id,
      name: product.name,
      category_id: product.category_id,
      price: product.price,
      stock: product.stock,
      status: product.status,
      image: product.image,
    });
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.image;
      
      // Proses upload jika ada berkas foto baru pilihan user
      if (selectedFile) {
        imageUrl = await produkAPI.uploadImage(selectedFile);
      }

      const payload = {
        name: formData.name,
        category_id: parseInt(formData.category_id),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        status: formData.status,
        image: imageUrl,
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
      const categoryName = product.kategori_produk?.category?.toLowerCase() || "";
      const matchesSearch =
        product.name.toLowerCase().includes(_searchTerm) ||
        categoryName.includes(_searchTerm);

      const matchesCategory =
        selectedCategory && selectedCategory !== "all"
          ? product.category_id === parseInt(selectedCategory)
          : true;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "stock-asc":
          return a.stock - b.stock;
        case "stock-desc":
          return b.stock - a.stock;
        default:
          return String(a.id).localeCompare(String(b.id));
      }
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
                { label: "Default Stock", value: "id" },
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
                  label: cat.category,
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
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-xs text-gray-400">No Image</div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{product.name}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-gray-600">{product.kategori_produk?.category || "Uncategorized"}</td>
                <td className="p-4 font-bold text-gray-800">${parseFloat(product.price).toFixed(2)}</td>
                <td className="p-4 text-gray-800 font-medium">{product.stock}</td>
                <td className="p-4">{product.status}</td>
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
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        message="Apakah Anda yakin ingin menghapus produk ini secara permanen?"
      />
    </div>
  );
}