import axios from "axios";

const API_URL = "https://eazbbeabwiggkdtujveb.supabase.co/rest/v1/pesanan";
const TRANSAKSI_URL = "https://eazbbeabwiggkdtujveb.supabase.co/rest/v1/transaksi";
const API_KEY = "sb_publishable_kzt9cJe9q0rWdbJLdjgyBw_6YgjDHay";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const pesananAPI = {
  async fetchPesanan() {
    const response = await axios.get(`${API_URL}?select=*&order=id.desc`, {
      headers,
    });
    return response.data;
  },

  async createPesanan(data) {
    const payload = {
      id_transaksi: data.id_transaksi,
      id_produk: data.id_produk,
      product_name: data.product_name,
      date: data.date,
      payment: data.payment,
      status: data.status,
    };
    const response = await axios.post(API_URL, payload, {
      headers: { ...headers, Prefer: "return=representation" },
    });
    return response.data[0];
  },

  async updatePesanan(id, data) {
    const payload = {
      id_transaksi: data.id_transaksi,
      id_produk: data.id_produk,
      product_name: data.product_name,
      date: data.date,
      payment: data.payment,
      status: data.status,
    };
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, payload, {
      headers,
    });
    return response.data;
  },

  async deletePesanan(id) {
    const response = await axios.delete(`${API_URL}?id=eq.${id}`, {
      headers,
    });
    return response.data;
  },

  async fetchTransaksiOptions() {
    const response = await axios.get(
      `${TRANSAKSI_URL}?select=id,name&order=id.desc`,
      { headers }
    );
    return response.data;
  },
};