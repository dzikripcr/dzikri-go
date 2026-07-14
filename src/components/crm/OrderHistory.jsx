import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import {
  FiBox,
  FiClock,
  FiTruck,
  FiCheckCircle,
  FiChevronRight,
  FiChevronDown,
  FiAward,
  FiTag,
  FiArrowLeft,
  FiStar, // Menambahkan ikon Star untuk rating ulasan
} from "react-icons/fi";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

export default function OrderHistory() {
  const { orders } = useCart();
  const [activeTab, setActiveTab] = useState("sekarang"); // 'sekarang' | 'selesai'
  const [expandedOrder, setExpandedOrder] = useState(null);
  
  // State Baru untuk Ulasan & Testimoni
  const [reviewForm, setReviewForm] = useState(null); // Menyimpan objek { orderId, itemId } yang sedang diulas
  const [rating, setRating] = useState(0); // Nilai rating aktif (1-5)
  const [comment, setComment] = useState(""); // Nilai teks ulasan aktif
  const [completedReviews, setCompletedReviews] = useState({}); // Menyimpan ulasan terkumpul berbasis key `${orderId}-${itemId}`
  
  const navigate = useNavigate();

  // Helper Format Rupiah
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const sampleOrders = [
    {
      id: "DM-874291",
      date: "13 Jul 2026",
      items: [
        {
          id: 101,
          nama: "Oversized Tailored Blazer Black Edition",
          size: "M",
          harga: 849000,
          quantity: 1,
          gambar:
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400",
        },
        {
          id: 102,
          nama: "DM Signature Linen Pants Off-White",
          size: "L",
          harga: 429000,
          quantity: 1,
          gambar:
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400",
        },
      ],
      subtotal: 1278000,
      shippingFee: 25000,
      discount: 25000,
      total: 1278000,
      payment: "qris",
      shippingName: "Reguler Standar",
      address:
        "Jl. Budi Utomo No. 12, Kel. Sukamaju, Kec. Lima Puluh, Pekanbaru, Riau",
      status: "dikirim",
      cashbackEarned: 63900,
    },
  ];

  // Mock Data untuk order yang sudah selesai
  const completedSampleOrders = [
    {
      id: "DM-238491",
      date: "28 Juni 2026",
      items: [
        {
          id: 103,
          nama: "Monochrome Minimalist Knit Dress",
          size: "S",
          harga: 699000,
          quantity: 1,
          gambar:
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
        },
      ],
      subtotal: 699000,
      shippingFee: 15000,
      discount: 15000,
      total: 699000,
      payment: "bank_transfer",
      shippingName: "Hemat / Kargo",
      address:
        "Jl. Budi Utomo No. 12, Kel. Sukamaju, Kec. Lima Puluh, Pekanbaru, Riau",
      status: "diterima",
      cashbackEarned: 0,
    },
    {
      id: "DM-192837",
      date: "15 Mei 2026",
      items: [
        {
          id: 104,
          nama: "Vintage Silk Blouse Cream",
          size: "M",
          harga: 550000,
          quantity: 1,
          gambar:
            "https://images.unsplash.com/photo-1604043960100-3fb2e389df34?w=400",
        },
        {
          id: 105,
          nama: "Pleated Midi Skirt Brown",
          size: "M",
          harga: 480000,
          quantity: 1,
          gambar:
            "https://images.unsplash.com/photo-1582142407894-ec85a1260a46?w=400",
        },
      ],
      subtotal: 1030000,
      shippingFee: 25000,
      discount: 50000,
      total: 1005000,
      payment: "credit_card",
      shippingName: "Reguler Standar",
      address: "Jl. Sudirman No. 45, Kec. Bukit Raya, Pekanbaru, Riau",
      status: "diterima",
      cashbackEarned: 50250,
    },
  ];

  // Handler Kirim Ulasan
  const handleSubmitReview = (orderId, itemId) => {
    if (rating === 0 || !comment.trim()) return;

    // Menyimpan ulasan ke dalam state lokal terintegrasi unik id order & produk
    const reviewKey = `${orderId}-${itemId}`;
    setCompletedReviews((prev) => ({
      ...prev,
      [reviewKey]: { rating, comment, date: new Date().toLocaleDateString("id-ID") },
    }));

    // Reset Form Input
    setReviewForm(null);
    setRating(0);
    setComment("");
  };

  // 1. Filter data asli dari state terlebih dahulu
  const realCurrentOrders = orders.filter((o) => o.status !== "diterima");
  const realCompletedOrders = orders.filter((o) => o.status === "diterima");

  // 2. Cek masing-masing kategori. Jika kosong, baru gunakan mock data
  const currentOrdersList =
    realCurrentOrders.length > 0 ? realCurrentOrders : sampleOrders;
    
  const completedOrdersList =
    realCompletedOrders.length > 0 ? realCompletedOrders : completedSampleOrders;

  // 3. Tentukan list mana yang aktif berdasarkan Tab
  const currentList =
    activeTab === "sekarang" ? currentOrdersList : completedOrdersList;

  // Nilai Urutan Status untuk Progress Bar Tracker
  const statusSteps = [
    { key: "konfirmasi", label: "Menunggu Konfirmasi", icon: FiClock },
    { key: "diproses", label: "Pesanan Diproses", icon: FiBox },
    { key: "dikirim", label: "Pesanan Dikirim", icon: FiTruck },
    { key: "diterima", label: "Pesanan Diterima", icon: FiCheckCircle },
  ];

  const getStepIndex = (status) =>
    statusSteps.findIndex((step) => step.key === status);

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 md:px-8 py-10">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-8 px-5 py-2.5 font-semibold text-sm border bg-white rounded-full hover:bg-zinc-950 hover:text-white hover:scale-105 transition-all duration-500 ease-out"
        >
          <FiArrowLeft />
          Kembali
        </button>

        {/* Title & Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 mb-6 gap-4">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
            Riwayat Pembelian
          </h2>
          <div className="flex bg-[#F2F0F1] p-1 rounded-full text-xs font-bold">
            <button
              onClick={() => setActiveTab("sekarang")}
              className={`px-6 py-2.5 rounded-full uppercase tracking-wider transition ${
                activeTab === "sekarang"
                  ? "bg-black text-white shadow-sm"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Pesanan Sekarang ({currentOrdersList.length})
            </button>
            <button
              onClick={() => setActiveTab("selesai")}
              className={`px-6 py-2.5 rounded-full uppercase tracking-wider transition ${
                activeTab === "selesai"
                  ? "bg-black text-white shadow-sm"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Pesanan Selesai ({completedOrdersList.length})
            </button>
          </div>
        </div>

        {/* Orders Listing */}
        {currentList.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-[24px] border border-gray-100 text-gray-400">
            Tidak ada riwayat transaksi pada kategori ini.
          </div>
        ) : (
          <div className="space-y-6">
            {currentList.map((order) => {
              const currentStepIdx = getStepIndex(order.status);
              const isExpanded = expandedOrder === order.id;

              return (
                <div
                  key={order.id}
                  className="border border-gray-100 rounded-[24px] overflow-hidden bg-white shadow-sm transition hover:shadow-md"
                >
                  {/* Card Header Summary */}
                  <div className="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 text-xs font-medium text-gray-500">
                    <div className="flex gap-4 md:gap-8 flex-wrap">
                      <div>
                        <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                          Tanggal Transaksi
                        </span>
                        <span className="text-gray-900 font-bold">
                          {order.date}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                          ID Transaksi
                        </span>
                        <span className="text-gray-900 font-bold font-mono">
                          {order.id}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                          Total Bayar
                        </span>
                        <span className="text-gray-900 font-black">
                          {formatRupiah(order.total)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setExpandedOrder(isExpanded ? null : order.id)
                      }
                      className="text-black font-bold uppercase tracking-tight flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      {isExpanded ? "Tutup Detail" : "Lihat Rincian"}{" "}
                      {isExpanded ? <FiChevronDown /> : <FiChevronRight />}
                    </button>
                  </div>

                  {/* Card Body & Dynamic Tracker */}
                  <div className="p-6 space-y-8">
                    {/* CUSTOM DESIGN MODERN PROGRESS STEPS BAR */}
                    <div className="relative pt-4 pb-2">
                      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0 hidden md:block"></div>
                      <div
                        className="absolute top-1/2 left-0 h-0.5 bg-black -translate-y-1/2 z-0 transition-all duration-500 hidden md:block"
                        style={{
                          width: `${(currentStepIdx / (statusSteps.length - 1)) * 100}%`,
                        }}
                      ></div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
                        {statusSteps.map((step, idx) => {
                          const StepIcon = step.icon;
                          const isCompleted = idx <= currentStepIdx;
                          const isActive = idx === currentStepIdx;

                          return (
                            <div
                              key={step.key}
                              className="flex md:flex-col items-center gap-3 md:text-center"
                            >
                              <div
                                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${
                                  isCompleted
                                    ? "bg-black text-white shadow-md shadow-black/10 scale-105"
                                    : "bg-gray-200 text-gray-400"
                                } ${isActive ? "ring-4 ring-gray-100" : ""}`}
                              >
                                <StepIcon
                                  size={14}
                                  className={isActive ? "animate-pulse" : ""}
                                />
                              </div>
                              <div>
                                <p
                                  className={`text-xs font-black uppercase tracking-tight ${isCompleted ? "text-gray-900" : "text-gray-400"}`}
                                >
                                  {step.label}
                                </p>
                                {isActive && (
                                  <span className="text-[10px] text-gray-500 font-bold block md:hidden">
                                    Progres Aktif
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* LIVE TRACKING TIMELINE LOGS (Hanya Muncul jika Status 'dikirim') */}
                    {order.status === "dikirim" && (
                      <div className="bg-[#F2F0F1] p-5 rounded-[20px] space-y-4 border border-transparent">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 flex items-center gap-2">
                          <FiTruck className="text-black" /> Detail Pelacakan
                          Kurir ({order.shippingName})
                        </h4>

                        <div className="relative border-l border-gray-300 ml-2.5 pl-5 space-y-4 text-xs font-medium">
                          <div className="relative">
                            <div className="absolute -left-[25.5px] top-0.5 w-2.5 h-2.5 rounded-full bg-black ring-4 ring-white"></div>
                            <span className="text-[10px] font-mono text-gray-400 block">
                              13 Jul 2026 - 09:15 WIB
                            </span>
                            <p className="text-gray-900 font-bold">
                              Paket sedang dibawa kurir menuju alamat tujuan
                              (Rute Pekanbaru Kota).
                            </p>
                          </div>
                          <div className="relative opacity-60">
                            <div className="absolute -left-[25.5px] top-0.5 w-2.5 h-2.5 rounded-full bg-gray-400 ring-4 ring-white"></div>
                            <span className="text-[10px] font-mono text-gray-400 block">
                              12 Jul 2026 - 14:02 WIB
                            </span>
                            <p className="text-gray-700">
                              Paket telah tiba di Hub Sortir Utama Pekanbaru,
                              Riau.
                            </p>
                          </div>
                          <div className="relative opacity-60">
                            <div className="absolute -left-[25.5px] top-0.5 w-2.5 h-2.5 rounded-full bg-gray-400 ring-4 ring-white"></div>
                            <span className="text-[10px] font-mono text-gray-400 block">
                              11 Jul 2026 - 18:30 WIB
                            </span>
                            <p className="text-gray-700">
                              Paket berhasil diserahkan ke pihak logistik dari
                              Warehouse Butik DM.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Expanded Detail Dropdown */}
                    {isExpanded && (
                      <div className="pt-4 border-t border-gray-100 space-y-6 text-sm animate-fadeIn">
                        {/* List Items Ordered */}
                        <div className="space-y-4">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                            Rincian Item
                          </span>
                          {order.items.map((item, idx) => {
                            const reviewKey = `${order.id}-${item.id}`;
                            const isReviewing = reviewForm?.orderId === order.id && reviewForm?.itemId === item.id;
                            const hasBeenReviewed = completedReviews[reviewKey];

                            return (
                              <div
                                key={idx}
                                className="p-3 hover:bg-gray-50 rounded-2xl border border-transparent hover:border-gray-100 transition duration-300 space-y-3"
                              >
                                <div className="flex items-center justify-between gap-4">
                                  <div className="flex items-center gap-4">
                                    <div className="w-12 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                      <img
                                        src={item.gambar}
                                        alt={item.nama}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div>
                                      <h5 className="font-bold text-gray-900 text-xs md:text-sm line-clamp-1">
                                        {item.nama}
                                      </h5>
                                      <p className="text-[11px] text-gray-400 mt-0.5">
                                        Ukuran: {item.size} x {item.quantity}
                                      </p>
                                    </div>
                                  </div>
                                  <span className="font-bold text-gray-900 text-xs">
                                    {formatRupiah(item.harga * item.quantity)}
                                  </span>
                                </div>

                                {/* FITUR REVIEW DILAKUKAN PER ITEM JIKA STATUS 'DITERIMA' */}
                                {order.status === "diterima" && (
                                  <div className="pl-16">
                                    {hasBeenReviewed ? (
                                      /* Ulasan Sukses Dikirim */
                                      <div className="bg-zinc-50 border border-zinc-100 p-3 rounded-xl max-w-lg space-y-1">
                                        <div className="flex items-center justify-between">
                                          <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                              <FiStar 
                                                key={i} 
                                                size={12} 
                                                className={i < hasBeenReviewed.rating ? "fill-current" : "text-gray-200"} 
                                              />
                                            ))}
                                          </div>
                                          <span className="text-[10px] text-gray-400 font-medium">
                                            {hasBeenReviewed.date}
                                          </span>
                                        </div>
                                        <p className="text-xs text-gray-700 italic font-medium">
                                          "{hasBeenReviewed.comment}"
                                        </p>
                                        <span className="inline-block text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                                          Terima kasih atas ulasan Anda!
                                        </span>
                                      </div>
                                    ) : isReviewing ? (
                                      /* Form Pengisian Ulasan */
                                      <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl max-w-lg space-y-3 animate-fadeIn">
                                        <p className="text-[11px] font-black uppercase tracking-wider text-gray-700">
                                          Berikan Penilaian Produk
                                        </p>
                                        
                                        {/* Interaksi Rating Bintang */}
                                        <div className="flex gap-1">
                                          {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                              key={star}
                                              type="button"
                                              onClick={() => setRating(star)}
                                              className="transition hover:scale-110 focus:outline-none"
                                            >
                                              <FiStar
                                                size={18}
                                                className={
                                                  star <= rating 
                                                    ? "text-yellow-400 fill-current" 
                                                    : "text-gray-300"
                                                }
                                              />
                                            </button>
                                          ))}
                                        </div>

                                        {/* Teks Deskripsi Ulasan */}
                                        <textarea
                                          value={comment}
                                          onChange={(e) => setComment(e.target.value)}
                                          placeholder="Tulis ulasan produk di sini (bahan, kesesuaian ukuran, dll)..."
                                          className="w-full p-2.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black resize-none"
                                          rows={3}
                                        />

                                        {/* Tombol Aksi */}
                                        <div className="flex gap-2 justify-end">
                                          <button
                                            onClick={() => {
                                              setReviewForm(null);
                                              setRating(0);
                                              setComment("");
                                            }}
                                            className="px-3 py-1.5 text-[10px] font-bold uppercase border border-gray-200 rounded-full bg-white hover:bg-gray-100"
                                          >
                                            Batal
                                          </button>
                                          <button
                                            onClick={() => handleSubmitReview(order.id, item.id)}
                                            disabled={rating === 0 || !comment.trim()}
                                            className="px-4 py-1.5 text-[10px] font-bold uppercase rounded-full bg-black text-white hover:bg-zinc-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                                          >
                                            Kirim Ulasan
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      /* Tombol Utama Picu Form */
                                      <button
                                        onClick={() => {
                                          setReviewForm({ orderId: order.id, itemId: item.id });
                                          setRating(0);
                                          setComment("");
                                        }}
                                        className="px-4 py-1.5 text-[10px] font-black uppercase tracking-wider border border-black bg-white text-black rounded-full hover:bg-black hover:text-white transition duration-300"
                                      >
                                        Beri Ulasan
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Ringkasan Biaya Pengiriman & Alamat */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/50 p-4 rounded-2xl text-xs font-medium">
                          <div className="space-y-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                              Alamat Tujuan Pengiriman
                            </span>
                            <p className="text-gray-700 leading-relaxed">
                              {order.address}
                            </p>
                          </div>
                          <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-gray-200/60 pt-3 md:pt-0 md:pl-6">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                              Rincian Finansial
                            </span>
                            <div className="flex justify-between text-gray-500">
                              <span>Subtotal Produk</span>
                              <span>{formatRupiah(order.subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                              <span>Biaya Ongkir ({order.shippingName})</span>
                              <span>{formatRupiah(order.shippingFee)}</span>
                            </div>
                            <div className="flex justify-between text-red-500">
                              <span>Potongan Promo</span>
                              <span>-{formatRupiah(order.discount)}</span>
                            </div>
                            {order.cashbackEarned > 0 && (
                              <div className="flex justify-between text-green-600 font-bold">
                                <span>Poin Cashback Didapat</span>
                                <span className="flex items-center gap-1">
                                  +{formatRupiah(order.cashbackEarned)}{" "}
                                  <FiTag />
                                </span>
                              </div>
                            )}
                            <hr className="border-gray-200 my-1" />
                            <div className="flex justify-between text-gray-950 font-black text-sm">
                              <span>
                                Metode ({order.payment.toUpperCase()})
                              </span>
                              <span>{formatRupiah(order.total)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}