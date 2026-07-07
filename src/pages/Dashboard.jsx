import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SalesChart from "../components/SalesChart";
import Button from "../components/Button";
import { FaSearch as FaSearchIcon } from "react-icons/fa";
import InputField from "../components/InputField";
import Card from "../components/Card";

import { pesananAPI } from "../services/pesananAPI";
import { produkAPI } from "../services/produkAPI";
import { transaksiAPI } from "../services/transaksiAPI";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // 1. Memuat semua data secara bersamaan menggunakan Promise.allSettled (Aman dari error 400)
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        const [prodRes, orderRes, custRes] = await Promise.allSettled([
          produkAPI.fetchProduk(),
          pesananAPI.fetchPesanan(),
          transaksiAPI.fetchCustomers(),
        ]);

        if (prodRes.status === "fulfilled") setProducts(prodRes.value);
        if (orderRes.status === "fulfilled") setOrders(orderRes.value);
        if (custRes.status === "fulfilled") setCustomers(custRes.value);
      } catch (error) {
        console.error("Gagal memuat data dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // 2. Helper untuk format mata uang Rupiah (Menyesuaikan database Anda)
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(angka || 0);
  };

  // Helper format angka ringkas (Contoh: 10700 menjadi 10.7K)
  const formatK = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      notation: "compact",
      compactDisplay: "short",
    }).format(angka || 0);
  };

  // 3. Kalkulasi Statistik Berdasarkan Data Riil Supabase
  const totalSales = orders.reduce((acc, curr) => acc + (curr.total_belanja || 0), 0);
  const totalOrdersCount = orders.length;
  
  const pendingCount = orders.filter((o) => o.status?.toLowerCase() === "pending").length;
  const canceledCount = orders.filter((o) => o.status?.toLowerCase() === "canceled").length;
  
  const totalCustomersCount = customers.length;
  const totalProductsCount = products.length;

  // Asumsi jika di tabel produk Anda ada kolom 'stok' atau 'stock'
  const stockProductsCount = products.filter((p) => (p.stok || p.stock || 0) > 0).length;
  const outOfStockCount = products.filter((p) => (p.stok || p.stock || 0) <= 0).length;

  // 4. Filter Produk untuk bagian "Top Products" berdasarkan kolom pencarian
  const filteredProducts = products
    .filter((product) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 4); // Ambil 4 produk teratas untuk ditampilkan di sidebar

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-500 font-medium">Memuat data dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen flex flex-col">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Total Sales */}
        <Card>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-900 font-bold text-lg">Total Sales</h3>
              <p className="text-xs text-gray-400 mt-1">Akumulasi seluruh penjualan</p>
            </div>
            <Button type="option">⋮</Button>
          </div>

          <div className="mt-6 flex items-end justify-between">
            <div className="flex items-baseline">
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
                {formatRupiah(totalSales)}
              </span>
            </div>
            <Link to="/Orders">
              <Button type="details">Details</Button>
            </Link>
          </div>
        </Card>

        {/* Total Orders */}
        <Card>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-900 font-bold text-lg">Total Orders</h3>
              <p className="text-xs text-gray-400 mt-1">Semua status pesanan</p>
            </div>
            <Button type="option">⋮</Button>
          </div>

          <div className="mt-6 flex items-end justify-between">
            <div className="flex items-baseline">
              <span className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {formatK(totalOrdersCount)}
              </span>
              <span className="text-sm font-medium text-gray-500 ml-1">pesanan</span>
            </div>
            <Link to="/Orders">
              <Button type="details">Details</Button>
            </Link>
          </div>
        </Card>

        {/* Pending & Canceled */}
        <Card>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-900 font-bold text-lg">Pending & Canceled</h3>
              <p className="text-xs text-gray-400 mt-1">Butuh perhatian</p>
            </div>
            <Button type="option">⋮</Button>
          </div>

          <div className="mt-6 flex justify-between items-end">
            <div className="flex space-x-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Pending</p>
                <span className="text-2xl font-bold text-amber-500">{pendingCount}</span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Canceled</p>
                <span className="text-2xl font-bold text-rose-500">{canceledCount}</span>
              </div>
            </div>
            <Link to="/Orders">
              <Button type="details">Details</Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 text-lg">Report Overview</h3>
            <div className="flex items-center space-x-2 bg-[#EAF8E7] p-1 rounded-[12px] border border-gray-100">
              <Button type="this_week">Live Data</Button>
            </div>
          </div>

          {/* Sub Header Stats for Chart */}
          <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4 overflow-x-auto gap-4">
            <div className="border-b-2 border-emerald-500 pb-2 -mb-[18px] whitespace-nowrap">
              <h4 className="text-xl font-bold text-gray-900">{formatK(totalCustomersCount)}</h4>
              <p className="text-xs text-gray-400 mt-1">Customers</p>
            </div>
            <div className="whitespace-nowrap">
              <h4 className="text-xl font-bold text-gray-900">{totalProductsCount}</h4>
              <p className="text-xs text-gray-400 mt-1">Total Products</p>
            </div>
            <div className="whitespace-nowrap">
              <h4 className="text-xl font-bold text-gray-900">{stockProductsCount}</h4>
              <p className="text-xs text-gray-400 mt-1">In Stock</p>
            </div>
            <div className="whitespace-nowrap">
              <h4 className="text-xl font-bold text-gray-900">{outOfStockCount}</h4>
              <p className="text-xs text-gray-400 mt-1">Out of Stock</p>
            </div>
            <div className="whitespace-nowrap">
              <h4 className="text-xl font-bold text-emerald-600">{formatK(totalSales)}</h4>
              <p className="text-xs text-gray-400 mt-1">Revenue</p>
            </div>
          </div>

          <div className="flex-grow w-full h-[250px]">
            <SalesChart data={orders} /> {/* Berikan data pesanan jika SalesChart Anda dinamis */}
          </div>
        </div>

        {/* Right Sidebar Stats - Top Products */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900 text-lg">Top Products</h3>
              <Link
                to="/Products"
                className="text-[#6467F2] font-semibold text-sm hover:underline transition-colors"
              >
                All product
              </Link>
            </div>

            {/* Search Input */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearchIcon className="text-gray-400" />
              </div>
              <InputField
                type="text"
                placeholder="Search product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-gray-200"
              />
            </div>

            {/* List Produk Real */}
            <div className="space-y-0">
              {filteredProducts.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">Tidak ada produk ditemukan</p>
              ) : (
                filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className={`flex items-center justify-between py-4 ${
                      index !== filteredProducts.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center text-xs text-gray-400">
                        {product.image || product.gambar ? (
                          <img
                            src={product.image || product.gambar}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          "No Img"
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800 line-clamp-1">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          ID: {product.id}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-800 text-sm ml-2 whitespace-nowrap">
                      {formatRupiah(product.harga || product.price)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}