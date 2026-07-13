import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const RewardsContext = createContext();

const REWARDS_STORAGE_KEY = "dm_boutiquera_rewards";

// ============================================================
// KATALOG REWARD — daftar yang bisa ditukar dengan poin
// Ubah/tambah item di sini kalau mau menyesuaikan promo
// ============================================================
export const REWARD_CATALOG = [
  {
    id: "ongkir_reguler",
    label: "Voucher Gratis Ongkir Reguler",
    description: "Potongan ongkir hingga Rp25.000 untuk pengiriman reguler",
    cost: 50,
    type: "gratis_ongkir",
    value: 25000,
  },
  {
    id: "ongkir_express",
    label: "Voucher Gratis Ongkir Express",
    description: "Potongan ongkir hingga Rp45.000 untuk pengiriman express",
    cost: 90,
    type: "gratis_ongkir",
    value: 45000,
  },
  {
    id: "diskon_10",
    label: "Voucher Diskon 10%",
    description: "Diskon 10% dari subtotal belanja produk",
    cost: 100,
    type: "diskon_persen",
    value: 10,
  },
  {
    id: "diskon_20",
    label: "Voucher Diskon 20% (VVIP)",
    description: "Diskon 20% dari subtotal belanja produk",
    cost: 200,
    type: "diskon_persen",
    value: 20,
  },
  {
    id: "cashback_5",
    label: "Cashback Belanja 5%",
    description: "Dapatkan cashback poin sebesar 5% dari subtotal belanja",
    cost: 80,
    type: "cashback_persen",
    value: 5,
  },
  {
    id: "potongan_50k",
    label: "Voucher Potongan Rp50.000",
    description: "Potongan langsung Rp50.000 tanpa minimum belanja",
    cost: 150,
    type: "potongan_nominal",
    value: 50000,
  },
];

// ============================================================
// ATURAN PEROLEHAN POIN
// 1 poin didapat setiap kelipatan Rp10.000 dari subtotal produk
// ============================================================
export const POINTS_PER_RUPIAH = 10000;

function loadFromStorage(key, defaultValue) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error(`Gagal membaca ${key} dari localStorage:`, error);
    return defaultValue;
  }
}

function generateVoucherCode(prefix = "DMV") {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${random}`;
}

export function RewardsProvider({ children }) {
  const { user } = useAuth();

  // Inisialisasi dari localStorage. Kalau belum pernah ada data tersimpan,
  // pakai user.points dari AuthContext sebagai titik awal (kalau ada).
  const initial = loadFromStorage(REWARDS_STORAGE_KEY, null);

  const [points, setPoints] = useState(() => initial?.points ?? (user?.points ?? 0));
  const [vouchers, setVouchers] = useState(() => initial?.vouchers ?? []);
  const [pointHistory, setPointHistory] = useState(() => initial?.history ?? []);

  // Sinkronkan seluruh state reward ke localStorage setiap kali berubah
  useEffect(() => {
    try {
      localStorage.setItem(
        REWARDS_STORAGE_KEY,
        JSON.stringify({ points, vouchers, history: pointHistory })
      );
    } catch (error) {
      console.error("Gagal menyimpan data rewards ke localStorage:", error);
    }
  }, [points, vouchers, pointHistory]);

  // Dipanggil otomatis oleh CartContext setiap kali checkout berhasil
  const addPoints = (amount, reason = "Belanja Produk") => {
    if (!amount || amount <= 0) return;
    setPoints((prev) => prev + amount);
    setPointHistory((prev) => [
      { id: Date.now(), type: "earn", amount, reason, date: new Date().toISOString() },
      ...prev,
    ]);
  };

  // Menukar poin dengan salah satu item di REWARD_CATALOG
  const redeemReward = (rewardId) => {
    const reward = REWARD_CATALOG.find((r) => r.id === rewardId);
    if (!reward) return { success: false, message: "Reward tidak ditemukan." };
    if (points < reward.cost) return { success: false, message: "Poin Anda tidak mencukupi." };

    const newVoucher = {
      code: generateVoucherCode(),
      rewardId: reward.id,
      label: reward.label,
      type: reward.type,
      value: reward.value,
      redeemedAt: new Date().toISOString(),
      used: false,
    };

    setPoints((prev) => prev - reward.cost);
    setVouchers((prev) => [newVoucher, ...prev]);
    setPointHistory((prev) => [
      { id: Date.now(), type: "redeem", amount: -reward.cost, reason: reward.label, date: new Date().toISOString() },
      ...prev,
    ]);

    return { success: true, voucher: newVoucher };
  };

  // Menandai voucher sudah dipakai — dipanggil otomatis oleh CartContext saat checkout
  const markVoucherUsed = (code) => {
    setVouchers((prev) => prev.map((v) => (v.code === code ? { ...v, used: true } : v)));
  };

  // Cari voucher berdasarkan kode (dipakai fitur "klaim kode manual" di Cart.jsx)
  const findVoucherByCode = (code) =>
    vouchers.find((v) => v.code.toLowerCase() === code.trim().toLowerCase() && !v.used);

  const availableVouchers = vouchers.filter((v) => !v.used);

  return (
    <RewardsContext.Provider
      value={{
        points,
        vouchers,
        availableVouchers,
        pointHistory,
        rewardCatalog: REWARD_CATALOG,
        addPoints,
        redeemReward,
        markVoucherUsed,
        findVoucherByCode,
      }}
    >
      {children}
    </RewardsContext.Provider>
  );
}

export const useRewards = () => useContext(RewardsContext);