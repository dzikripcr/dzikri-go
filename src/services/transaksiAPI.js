import axios from "axios";

const BASE_URL = "https://eazbbeabwiggkdtujveb.supabase.co/rest/v1";
const TRANSAKSI_URL = `${BASE_URL}/transaksi`;
const CUSTOMER_URL = `${BASE_URL}/customer`;
const API_KEY = "sb_publishable_kzt9cJe9q0rWdbJLdjgyBw_6YgjDHay";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const transaksiAPI = {
  async fetchTransaksi() {
    const response = await axios.get(
      `${TRANSAKSI_URL}?order=tanggal_transaksi.desc`,
      { headers }
    );
    return response.data;
  },

  // Dipakai untuk isi dropdown pilihan customer di TransaksiModal
  async fetchCustomers() {
    const response = await axios.get(
      `${CUSTOMER_URL}?select=id,nama_customer`,
      { headers }
    );
    return response.data;
  },

  async createTransaksi(data) {
    const response = await axios.post(TRANSAKSI_URL, data, {
      headers: { ...headers, Prefer: "return=representation" },
    });
    return response.data[0];
  },

  async updateTransaksi(id, data) {
    const response = await axios.patch(
      `${TRANSAKSI_URL}?id=eq.${id}`,
      data,
      { headers }
    );
    return response.data;
  },

  async deleteTransaksi(id) {
    const response = await axios.delete(`${TRANSAKSI_URL}?id=eq.${id}`, {
      headers,
    });
    return response.data;
  },
};