import axios from "axios";

const API_URL = "https://eazbbeabwiggkdtujveb.supabase.co/rest/v1/kupon";
const API_KEY = "sb_publishable_kzt9cJe9q0rWdbJLdjgyBw_6YgjDHay";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

const STATUS_TO_DB = {
  Active: "aktif",
  Inactive: "tidak aktif",
  Expired: "kadaluarsa",
};

const STATUS_FROM_DB = {
  aktif: "Active",
  "tidak aktif": "Inactive",
  kadaluarsa: "Expired",
};

const toDb = (data) => ({
  name: data.name,
  kode: data.code,
  tipe_diskon: data.discountType,
  diskon: Number(data.discountValue) || 0,
  minimal_belanja: Number(data.minPurchase) || 0,
  maksimal_pemakaian: data.maxUsage ? Number(data.maxUsage) : null,
  berlaku_dari: data.validFrom || null,
  berlaku_sampai: data.validUntil || null,
  status: STATUS_TO_DB[data.status] || "aktif",
});

const fromDb = (row) => ({
  id: row.id,
  name: row.name,
  code: row.kode,
  discountType: row.tipe_diskon,
  discountValue: row.diskon,
  minPurchase: row.minimal_belanja,
  maxUsage: row.maksimal_pemakaian,
  validFrom: row.berlaku_dari,
  validUntil: row.berlaku_sampai,
  status: STATUS_FROM_DB[row.status] || "Active",
});

export const kuponAPI = {
  async fetchKupon() {
    const response = await axios.get(API_URL, { headers });
    return response.data.map(fromDb);
  },

  async createKupon(data) {
    const response = await axios.post(API_URL, toDb(data), {
      headers: { ...headers, Prefer: "return=representation" },
    });
    return fromDb(response.data[0]);
  },

  async updateKupon(id, data) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, toDb(data), {
      headers,
    });
    return response.data;
  },

  async deleteKupon(id) {
    const response = await axios.delete(`${API_URL}?id=eq.${id}`, {
      headers,
    });
    return response.data;
  },
};