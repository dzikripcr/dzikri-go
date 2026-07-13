import React, { useState } from "react";
import { useCart } from "../../context/CartContext"; 
import { useRewards } from "../../context/RewardsContext";
import { FiMinus, FiPlus, FiTrash2, FiMapPin, FiTruck, FiCreditCard, FiTag, FiCheck, FiArrowRight, FiHome } from "react-icons/fi";
import { BsCheckCircleFill } from "react-icons/bs";
import Header from "./Header";
import Footer from "./Footer";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, placeOrder } = useCart();
  const { availableVouchers, findVoucherByCode } = useRewards();

  // State Form Checkout Belanja
  const [address, setAddress] = useState("Jl. Budi Utomo No. 12, Kel. Sukamaju, Kec. Lima Puluh, Pekanbaru, Riau");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [shippingMessage, setShippingMessage] = useState("");
  const [shippingOption, setShippingOption] = useState("reguler");
  const [selectedCoupon, setSelectedCoupon] = useState("none");
  const [paymentMethod, setPaymentMethod] = useState("qris");
  const [voucherCode, setVoucherCode] = useState("");
  const [klaimError, setKlaimError] = useState("");
  
  // State Baru untuk Pop-Up Sukses
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState("");

  // Helper Format Rupiah
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const shippingRates = {
    hemat: { name: "Hemat / Kargo", price: 15000 },
    reguler: { name: "Reguler Standar", price: 25000 },
    express: { name: "Express Kilat", price: 45000 },
  };

  // Kupon demo statis (tidak berkaitan dengan poin) + kupon dinamis
  // hasil tukar poin dari RewardsContext (Marketing Automation)
  const staticCoupons = [
    { id: "none", name: "Tidak Menggunakan Kupon" },
    { id: "gratis_ongkir", name: "Gratis Ongkir (Maks Rp20.000)" },
    { id: "diskon_butik", name: "Diskon Eksklusif DM 10%" },
    { id: "cashback", name: "Cashback Spesial Belanja 5%" },
  ];

  const voucherCoupons = availableVouchers.map((v) => ({
    id: `voucher-${v.code}`,
    name: `🎁 ${v.label} • ${v.code}`,
  }));

  const couponOptions = [...staticCoupons, ...voucherCoupons];

  const subtotalProduk = cartItems.reduce((acc, item) => acc + item.harga * item.quantity, 0);
  const biayaPengiriman = cartItems.length > 0 ? shippingRates[shippingOption].price : 0;

  let potonganHarga = 0;
  let potonganOngkir = 0;
  let cashbackPoin = 0;
  let appliedVoucherCode = null;

  if (selectedCoupon === "gratis_ongkir") {
    potonganOngkir = Math.min(biayaPengiriman, 20000);
  } else if (selectedCoupon === "diskon_butik") {
    potonganHarga = subtotalProduk * 0.1;
  } else if (selectedCoupon === "cashback") {
    cashbackPoin = subtotalProduk * 0.05;
  } else if (selectedCoupon.startsWith("voucher-")) {
    // Kupon berasal dari voucher hasil tukar poin
    const code = selectedCoupon.replace("voucher-", "");
    const voucher = availableVouchers.find((v) => v.code === code);
    if (voucher) {
      appliedVoucherCode = voucher.code;
      if (voucher.type === "gratis_ongkir") {
        potonganOngkir = Math.min(biayaPengiriman, voucher.value);
      } else if (voucher.type === "diskon_persen") {
        potonganHarga = subtotalProduk * (voucher.value / 100);
      } else if (voucher.type === "cashback_persen") {
        cashbackPoin = subtotalProduk * (voucher.value / 100);
      } else if (voucher.type === "potongan_nominal") {
        potonganHarga = Math.min(voucher.value, subtotalProduk);
      }
    }
  }

  const totalHemat = potonganHarga + potonganOngkir;
  const totalPembayaran = subtotalProduk + biayaPengiriman - totalHemat;

  // Klaim kode voucher manual: cocokkan dengan voucher hasil tukar poin milik pelanggan
  const handleKlaimVoucher = () => {
    if (!voucherCode.trim()) return;
    const found = findVoucherByCode(voucherCode);
    if (found) {
      setSelectedCoupon(`voucher-${found.code}`);
      setKlaimError("");
      setVoucherCode("");
    } else {
      setKlaimError("Kode voucher tidak ditemukan atau sudah terpakai.");
      setTimeout(() => setKlaimError(""), 3000);
    }
  };

  // Handler Buat Pesanan yang memicu Pop-up & integrasi Context
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return alert("Keranjang belanja Anda kosong.");
    
    const orderId = `DM-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedOrderId(orderId);

    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
      items: [...cartItems],
      subtotal: subtotalProduk,
      shippingFee: biayaPengiriman,
      discount: totalHemat,
      total: totalPembayaran,
      payment: paymentMethod,
      shippingName: shippingRates[shippingOption].name,
      address: address,
      status: "dikirim", // Set default 'dikirim' untuk simulasi progres bar pelacakan kurir
      cashbackEarned: cashbackPoin,
      voucherCode: appliedVoucherCode, // dipakai CartContext untuk menandai voucher sudah terpakai
    };

    placeOrder(newOrder); 
    setSelectedCoupon("none");
    setIsSuccessOpen(true); 
  };

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col relative">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-10 pb-36">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-8 text-center md:text-left">
          Keranjang Belanja
        </h2>

        {cartItems.length === 0 && !isSuccessOpen ? (
          <div className="text-center py-24 bg-gray-50 rounded-[32px] border border-dashed border-gray-200">
            <p className="text-gray-500 font-medium text-lg">Keranjang belanja Anda kosong.</p>
            <p className="text-gray-400 text-sm mt-1">Silakan pilih produk DM Boutiquera terlebih dahulu.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* KOLOM KIRI */}
            <div className="lg:col-span-2 space-y-6">
              {/* Alamat Penerima */}
              <div className="bg-[#F2F0F1] p-6 rounded-[24px]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-base uppercase tracking-wider flex items-center gap-2">
                    <FiMapPin className="text-black" /> Alamat Pengiriman
                  </h3>
                  <button 
                    onClick={() => setIsEditingAddress(!isEditingAddress)}
                    className="text-xs font-bold underline uppercase tracking-tight cursor-pointer"
                  >
                    {isEditingAddress ? "Simpan" : "Ubah"}
                  </button>
                </div>
                {isEditingAddress ? (
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-white p-3 rounded-xl text-sm border border-transparent focus:border-black outline-none resize-none"
                    rows="2"
                  />
                ) : (
                  <p className="text-sm text-gray-600 bg-white/50 p-3 rounded-xl">{address}</p>
                )}
              </div>

              {/* Item Produk */}
              <div className="border border-gray-100 rounded-[24px] p-6 space-y-4 shadow-sm">
                <h3 className="font-bold text-base uppercase tracking-wider mb-2">Produk Dipilih</h3>
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex items-center justify-between gap-4 pb-4 border-b border-gray-100 last:border-none last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#F0EEED] w-20 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.gambar} alt={item.nama} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm md:text-base text-gray-900 line-clamp-1">{item.nama}</h4>
                        <p className="text-xs text-gray-400 mt-0.5">Ukuran: <span className="text-gray-700 font-medium">{item.size}</span></p>
                        <p className="text-sm font-black text-gray-900 mt-1">{formatRupiah(item.harga)}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <button 
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-gray-400 hover:text-red-500 transition cursor-pointer"
                      >
                        <FiTrash2 size={16} />
                      </button>
                      <div className="flex items-center bg-[#F0F0F0] rounded-lg p-0.5">
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, -1)}
                          className="p-1 hover:bg-white rounded-md text-gray-600 transition"
                        >
                          <FiMinus size={12} />
                        </button>
                        <span className="font-bold text-gray-800 text-xs px-2 w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, 1)}
                          className="p-1 hover:bg-white rounded-md text-gray-600 transition"
                        >
                          <FiPlus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Opsi Pengiriman */}
              <div className="bg-[#F2F0F1] p-6 rounded-[24px] space-y-4">
                <div>
                  <h3 className="font-bold text-base uppercase tracking-wider flex items-center gap-2 mb-3">
                    <FiTruck className="text-black" /> Opsi Pengiriman
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {Object.keys(shippingRates).map((key) => (
                      <label 
                        key={key} 
                        className={`bg-white p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition ${
                          shippingOption === key ? "border-black shadow-sm" : "border-transparent opacity-70"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-tight text-gray-700">{shippingRates[key].name}</span>
                          <input 
                            type="radio" 
                            name="shipping" 
                            value={key} 
                            checked={shippingOption === key}
                            onChange={() => setShippingOption(key)}
                            className="accent-black" 
                          />
                        </div>
                        <span className="text-sm font-black text-gray-900 mt-2">{formatRupiah(shippingRates[key].price)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-xs font-bold uppercase text-gray-500 block mb-1">Pesan untuk Penjual (Opsional):</span>
                  <input
                    type="text"
                    placeholder="Contoh: Tolong double-wrap paketnya ya..."
                    value={shippingMessage}
                    onChange={(e) => setShippingMessage(e.target.value)}
                    className="w-full bg-white px-4 py-2.5 rounded-xl text-sm border border-transparent focus:border-black outline-none"
                  />
                </div>
              </div>
            </div>

            {/* KOLOM KANAN */}
            <div className="space-y-6">
              {/* Kupon */}
              <div className="border border-gray-100 rounded-[24px] p-6 shadow-sm">
                <h3 className="font-bold text-base uppercase tracking-wider flex items-center gap-2 mb-4">
                  <FiTag className="text-black" /> Kupon & Promo Butik
                </h3>
                
                <div className="space-y-2 mb-4">
                  {couponOptions.map((coupon) => (
                    <label 
                      key={coupon.id}
                      className={`flex items-center justify-between p-3 rounded-xl text-xs font-medium border cursor-pointer ${
                        selectedCoupon === coupon.id ? "bg-[#F2F0F1] border-black" : "bg-gray-50 border-transparent"
                      }`}
                    >
                      <span>{coupon.name}</span>
                      <input 
                        type="radio" 
                        name="coupon" 
                        value={coupon.id}
                        checked={selectedCoupon === coupon.id}
                        onChange={() => setSelectedCoupon(coupon.id)}
                        className="accent-black"
                      />
                    </label>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Masukkan kode voucher manual..."
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    className="flex-1 bg-[#F2F0F1] px-3 py-2 rounded-xl text-xs outline-none border border-transparent focus:border-black"
                  />
                  <button
                    onClick={handleKlaimVoucher}
                    className="bg-black text-white text-xs font-bold px-4 rounded-xl hover:bg-gray-800 transition cursor-pointer"
                  >
                    Klaim
                  </button>
                </div>
                {klaimError && (
                  <p className="text-[11px] text-red-500 font-medium mt-2">{klaimError}</p>
                )}
                <p className="text-[10px] text-gray-400 mt-2">
                  Dapatkan lebih banyak voucher dengan menukar Poin Reward Anda lewat ikon 🎁 di header.
                </p>
              </div>

              {/* Metode Pembayaran */}
              <div className="bg-[#F2F0F1] p-6 rounded-[24px]">
                <h3 className="font-bold text-base uppercase tracking-wider flex items-center gap-2 mb-4">
                  <FiCreditCard className="text-black" /> Metode Pembayaran
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  {[
                    { id: "qris", label: "QRIS Instant" },
                    { id: "cod", label: "COD (Bayar di Tempat)" },
                    { id: "transfer", label: "Bank Transfer" },
                    { id: "credit_card", label: "Credit Card" },
                    { id: "e_wallet", label: "E-Wallet" }
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-3 rounded-xl border transition text-left ${
                        paymentMethod === method.id 
                          ? "bg-black text-white border-black" 
                          : "bg-white text-gray-700 border-transparent hover:border-gray-200"
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rincian Tagihan */}
              <div className="border border-gray-100 rounded-[24px] p-6 shadow-sm space-y-3 text-sm">
                <h3 className="font-bold text-base uppercase tracking-wider mb-2">Rincian Pembayaran</h3>
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal Produk</span>
                  <span>{formatRupiah(subtotalProduk)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal Pengiriman ({shippingRates[shippingOption].name})</span>
                  <span>{formatRupiah(biayaPengiriman)}</span>
                </div>

                {potonganHarga > 0 && (
                  <div className="flex justify-between text-red-500 font-medium">
                    <span>Diskon Produk</span>
                    <span>-{formatRupiah(potonganHarga)}</span>
                  </div>
                )}
                {potonganOngkir > 0 && (
                  <div className="flex justify-between text-red-500 font-medium">
                    <span>Potongan Ongkir</span>
                    <span>-{formatRupiah(potonganOngkir)}</span>
                  </div>
                )}
                {cashbackPoin > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Potensi Cashback Koin</span>
                    <span className="flex items-center gap-1">+{formatRupiah(cashbackPoin)} <BsCheckCircleFill className="text-xs" /></span>
                  </div>
                )}
                
                <hr className="border-gray-100 my-2" />
                <div className="flex justify-between font-black text-base text-gray-900">
                  <span>Total Pembayaran</span>
                  <span>{formatRupiah(totalPembayaran)}</span>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>

      {/* STICKY BOTTOM BAR */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between shadow-[0_-8px_30px_rgba(0,0,0,0.05)] z-50">
          <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Tagihan</span>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-xl md:text-2xl font-black tracking-tight text-gray-900">
                  {formatRupiah(totalPembayaran)}
                </span>
                {totalHemat > 0 && (
                  <span className="text-[10px] md:text-xs font-bold bg-[#F2F0F1] text-gray-900 px-2.5 py-0.5 rounded-full">
                    Hemat {formatRupiah(totalHemat)}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="bg-black text-white px-8 md:px-12 py-3.5 rounded-full font-bold uppercase text-xs md:text-sm tracking-widest hover:bg-gray-800 transition duration-300 shadow-sm active:scale-95 cursor-pointer"
            >
              Buat Pesanan
            </button>
          </div>
        </div>
      )}

      {/* ======================================================================== */}
      {/* POP UP MODAL SUKSES (BOUTIQUE THEMING & EXCLUSIVE CRM FEEL) */}
      {/* ======================================================================== */}
      {isSuccessOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 transition-all duration-300 animate-fadeIn">
          <div className="bg-white max-w-md w-full rounded-[32px] p-8 border border-gray-100 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] text-center space-y-6 transform scale-100 transition-transform">
            
            {/* Elegant Check Indicator */}
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto shadow-lg shadow-black/20 animate-scaleUp">
              <FiCheck className="text-white text-3xl stroke-[3]" />
            </div>

            {/* Typography & Order ID */}
            <div className="space-y-2">
              <h3 className="font-black uppercase tracking-tight text-2xl md:text-3xl text-gray-950">
                Pesanan Berhasil
              </h3>
              <p className="text-xs font-mono tracking-widest text-gray-400 uppercase">
                ID Transaksi: {generatedOrderId}
              </p>
            </div>

            {/* Personalized CRM Note */}
            <div className="bg-[#F2F0F1] p-4 rounded-[20px] text-xs text-gray-600 font-medium leading-relaxed">
              ✨ Terima kasih, <span className="text-black font-bold">DM Luxury Member</span>. Pesanan Anda telah masuk antrean eksklusif kami. Tim kurir butik akan segera memvalidasi dan mempacking produk pesanan Anda dengan perhatian penuh ekstra.
            </div>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => window.location.href = "/pesanan"} // Sesuaikan dengan route halaman riwayat Anda
                className="flex-1 bg-black text-white text-xs font-black uppercase tracking-wider py-4 px-6 rounded-full hover:bg-gray-800 transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                Riwayat Pesanan <FiArrowRight size={14} />
              </button>
              <button
                onClick={() => window.location.href = "/"} 
                className="bg-[#F2F0F1] text-gray-900 text-xs font-bold uppercase tracking-wider py-4 px-6 rounded-full hover:bg-gray-200 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <FiHome size={14} /> Beranda
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}