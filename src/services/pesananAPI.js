import axios from "axios";

const BASE_URL = "https://eazbbeabwiggkdtujveb.supabase.co/rest/v1";
const PESANAN_URL = `${BASE_URL}/pesanan`;
const TRANSAKSI_URL = `${BASE_URL}/transaksi`;
const API_KEY = "sb_publishable_kzt9cJe9q0rWdbJLdjgyBw_6YgjDHay";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const pesananAPI = {
  async fetchPesanan() {
    const response = await axios.get(
      // Disesuaikan dengan kolom tanggal_pesanan di database
      `${PESANAN_URL}?order=tanggal_pesanan.desc`,
      { headers }
    );
    return response.data;
  },

  async fetchTransaksiOptions() {
    const response = await axios.get(
      // Disesuaikan dengan skema tabel transaksi
      `${TRANSAKSI_URL}?select=id,nama_customer,tanggal_transaksi`,
      { headers }
    );
    return response.data;
  },

  async createPesanan(data) {
    const response = await axios.post(PESANAN_URL, data, {
      headers: { ...headers, Prefer: "return=representation" },
    });
    return response.data[0];
  },

  async updatePesanan(id, data) {
    const response = await axios.patch(
      `${PESANAN_URL}?id=eq.${id}`,
      data,
      { headers }
    );
    return response.data;
  },

  async deletePesanan(id) {
    const response = await axios.delete(`${PESANAN_URL}?id=eq.${id}`, {
      headers,
    });
    return response.data;
  },
};