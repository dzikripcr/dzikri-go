import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SalesChart from "../components/SalesChart";
import Button from "../components/Button";
import { FaSearch as FaSearchIcon, FaRegFolderOpen } from "react-icons/fa";
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
  
  // State Interaktif
  const [activeSidebarFilter, setActiveSidebarFilter] = useState("all"); // "all", "instock", "outofstock"
  const [timeFilter, setTimeFilter] = useState("all"); // "all", "month", "year"

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

  // Helper format Rupiah & Angka
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(angka || 0);
  };

  const formatK = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      notation: "compact",
      compactDisplay: "short",
    }).format(angka || 0);
  };

  // --------------------------------------------------------
  // 1. FILTER PESANAN BERDASARKAN WAKTU (INTERAKTIF)
  // --------------------------------------------------------
  const currentDate = new Date();
  const filteredOrdersByTime = orders.filter((o) => {
    if (timeFilter === "all") return true;
    
    const orderDate = new Date(o.tanggal_pesanan);
    if (timeFilter === "month") {
      return orderDate.getMonth() === currentDate.getMonth() && 
             orderDate.getFullYear() === currentDate.getFullYear();
    }
    if (timeFilter === "year") {
      return orderDate.getFullYear() === currentDate.getFullYear();
    }
    return true;
  });

  // --------------------------------------------------------
  // Kalkulasi Statistik Real dari Data Pesanan yang Difilter
  // --------------------------------------------------------
  const totalSales = filteredOrdersByTime.reduce((acc, curr) => acc + (Number(curr.total_belanja) || 0), 0);
  const totalOrdersCount = filteredOrdersByTime.length;
  
  const pendingCount = filteredOrdersByTime.filter((o) => o.status_pesanan === "menunggu konfirmasi").length;
  const canceledCount = filteredOrdersByTime.filter((o) => o.status_pesanan === "dibatalkan").length;
  
  const totalCustomersCount = customers.length;
  const totalProductsCount = products.length;
  const stockProductsCount = products.filter((p) => (p.stok || 0) > 0).length;
  const outOfStockCount = products.filter((p) => (p.stok || 0) <= 0).length;

  // --------------------------------------------------------
  // 2. KALKULASI TOP PRODUCTS BERDASARKAN PENJUALAN
  // --------------------------------------------------------
  // Hitung jumlah terjual per produk dari data pesanan
  const productSalesMap = filteredOrdersByTime.reduce((acc, order) => {
    // Hanya hitung pesanan yang tidak dibatalkan
    if (order.status_pesanan !== "dibatalkan") {
      acc[order.idProduk] = (acc[order.idProduk] || 0) + (Number(order.total_kuantitas) || 0);
    }
    return acc;
  }, {});

  // Gabungkan data penjualan ke array produk & urutkan dari yang terlaris
  const productsWithSales = products.map(p => ({
    ...p,
    terjual: productSalesMap[p.id] || 0
  })).sort((a, b) => b.terjual - a.terjual);

  // Filter Produk untuk Sidebar (Pencarian + Interaktif Statistik)
  const filteredProducts = productsWithSales
    .filter((product) => {
      const matchesSearch = product.nama_produk?.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (activeSidebarFilter === "instock") {
        return matchesSearch && (product.stok || 0) > 0;
      }
      if (activeSidebarFilter === "outofstock") {
        return matchesSearch && (product.stok || 0) <= 0;
      }
      return matchesSearch;
    })
    .slice(0, 5); // Tampilkan 5 produk teratas

  const getStatusBadgeClass = (status) => {
    const cleanStatus = status?.toLowerCase() || "";
    if (cleanStatus === "stok tersedia") return "bg-emerald-50 text-emerald-700 border-emerald-100";
    if (cleanStatus === "stok menipis") return "bg-amber-50 text-amber-700 border-amber-100";
    return "bg-rose-50 text-rose-700 border-rose-100"; 
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600 mb-4"></div>
        <p className="text-gray-500 font-medium text-sm">Menyelaraskan data dengan Supabase...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen flex flex-col animate-in fade-in duration-300">
      
      {/* Top Header & Time Filter */}
      <div className="flex justify-between items-center mb-6">
        <select 
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="border border-gray-200 bg-white rounded-lg px-4 py-2 text-sm font-medium text-gray-700 outline-none focus:border-emerald-500 shadow-sm transition-all"
        >
          <option value="all">Semua Waktu</option>
          <option value="month">Bulan Ini</option>
          <option value="year">Tahun Ini</option>
        </select>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Total Sales */}
        <Card>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-900 font-bold text-lg">Total Penjualan</h3>
              <p className="text-xs text-gray-400 mt-1">
                {timeFilter === 'all' ? 'Akumulasi seluruh penjualan' : `Pendapatan ${timeFilter === 'month' ? 'bulan' : 'tahun'} ini`}
              </p>
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
              <h3 className="text-gray-900 font-bold text-lg">Total Pesanan</h3>
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
              <h3 className="text-gray-900 font-bold text-lg">Tertunda & Batal</h3>
              <p className="text-xs text-gray-400 mt-1">Butuh perhatian</p>
            </div>
            <Button type="option">⋮</Button>
          </div>
          <div className="mt-6 flex justify-between items-end">
            <div className="flex space-x-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Menunggu</p>
                <span className="text-2xl font-bold text-amber-500">{pendingCount}</span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Dibatalkan</p>
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
            <h3 className="font-bold text-gray-900 text-lg">Laporan Penjualan</h3>
            <div className="flex items-center space-x-2 bg-[#EAF8E7] p-1 rounded-[12px] border border-gray-100">
              <span className="text-xs font-semibold text-emerald-700 px-3 py-1">Data Real-Time</span>
            </div>
          </div>

          {/* Sub Header Stats (Interaktif Filter Produk) */}
          <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4 overflow-x-auto gap-4 select-none">
            <div className="whitespace-nowrap">
              <h4 className="text-xl font-bold text-gray-900">{formatK(totalCustomersCount)}</h4>
              <p className="text-xs text-gray-400 mt-1">Pelanggan</p>
            </div>

            {/* Filter: Semua Produk */}
            <div 
              onClick={() => setActiveSidebarFilter("all")}
              className={`whitespace-nowrap cursor-pointer transition-all pb-2 -mb-[18px] px-2 rounded-t-md ${
                activeSidebarFilter === "all" ? "border-b-2 border-emerald-500 font-semibold" : "opacity-70 hover:opacity-100"
              }`}
            >
              <h4 className="text-xl font-bold text-gray-900">{totalProductsCount}</h4>
              <p className="text-xs text-gray-400 mt-1">Semua Produk</p>
            </div>

            {/* Filter: Produk In Stock */}
            <div 
              onClick={() => setActiveSidebarFilter("instock")}
              className={`whitespace-nowrap cursor-pointer transition-all pb-2 -mb-[18px] px-2 rounded-t-md ${
                activeSidebarFilter === "instock" ? "border-b-2 border-emerald-500 font-semibold" : "opacity-70 hover:opacity-100"
              }`}
            >
              <h4 className="text-xl font-bold text-gray-950">{stockProductsCount}</h4>
              <p className="text-xs text-emerald-600 font-medium mt-1">● Stok Tersedia</p>
            </div>

            {/* Filter: Produk Out of Stock */}
            <div 
              onClick={() => setActiveSidebarFilter("outofstock")}
              className={`whitespace-nowrap cursor-pointer transition-all pb-2 -mb-[18px] px-2 rounded-t-md ${
                activeSidebarFilter === "outofstock" ? "border-b-2 border-rose-500 font-semibold" : "opacity-70 hover:opacity-100"
              }`}
            >
              <h4 className="text-xl font-bold text-gray-950">{outOfStockCount}</h4>
              <p className="text-xs text-rose-500 font-medium mt-1">● Stok Habis</p>
            </div>

            <div className="whitespace-nowrap">
              <h4 className="text-xl font-bold text-emerald-600">{formatK(totalSales)}</h4>
              <p className="text-xs text-gray-400 mt-1">Pendapatan</p>
            </div>
          </div>

          <div className="flex-grow w-full h-[250px]">
            {/* Kirimkan data pesanan yang sudah difilter waktu ke Chart */}
            <SalesChart data={filteredOrdersByTime} />
          </div>
        </div>

        {/* Right Sidebar Stats - Top Products */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col">
                <h3 className="font-bold text-gray-900 text-lg">Produk Terlaris</h3>
                <span className="text-xs text-gray-400 mt-0.5">Berdasarkan {timeFilter === 'all' ? 'semua pesanan' : 'periode yang dipilih'}</span>
              </div>
              <Link to="/Products" className="text-[#6467F2] font-semibold text-sm hover:underline transition-colors">
                Lihat Semua
              </Link>
            </div>

            {/* Search Input */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearchIcon className="text-gray-400" />
              </div>
              <InputField
                type="text"
                placeholder="Cari produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-gray-200 transition-colors"
              />
            </div>

            {/* List Produk Real (Diurutkan dari yang terbanyak terjual) */}
            <div className="space-y-0">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-8">
                  <FaRegFolderOpen className="mx-auto text-gray-300 text-3xl mb-2" />
                  <p className="text-xs text-gray-400">Tidak ada produk ditemukan</p>
                  {activeSidebarFilter !== "all" && (
                    <button 
                      onClick={() => setActiveSidebarFilter("all")}
                      className="text-xs text-[#6467F2] font-semibold mt-1 hover:underline outline-none"
                    >
                      Reset Filter Status
                    </button>
                  )}
                </div>
              ) : (
                filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className={`flex items-center justify-between py-4 ${
                      index !== filteredProducts.length - 1 ? "border-b border-gray-100" : ""
                    } hover:bg-gray-50/50 transition-colors rounded-lg px-2 -mx-2`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center text-[10px] text-gray-400 border border-gray-100 shadow-sm">
                        {product.gambar_produk ? (
                          <img src={product.gambar_produk} alt={product.nama_produk} className="w-full h-full object-cover" />
                        ) : (
                          "No Img"
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-800 truncate pr-1">
                          {product.nama_produk}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full border capitalize ${getStatusBadgeClass(product.status)}`}>
                            {product.status || "Stok Habis"}
                          </span>
                          <span className="text-[11px] text-gray-500 font-medium">
                            Terjual: <span className="text-gray-900 font-bold">{product.terjual}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="font-extrabold text-gray-900 text-sm ml-2 whitespace-nowrap">
                      {formatRupiah(product.harga)}
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