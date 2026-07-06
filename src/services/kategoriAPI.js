import axios from "axios";

const API_URL = "https://eazbbeabwiggkdtujveb.supabase.co/rest/v1/kategori_produk";
const API_KEY = "sb_publishable_kzt9cJe9q0rWdbJLdjgyBw_6YgjDHay";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const kategoriProdukAPI = {
  async fetchKategori() {
    const response = await axios.get(`${API_URL}?select=*&order=id.asc`, { 
      headers 
    });
    return response.data;
  },

  async createKategori(data) {
    const payload = { category: data.category, description: data.description };
    const response = await axios.post(API_URL, payload, {
      headers: { ...headers, Prefer: "return=representation" },
    });
    return response.data[0];
  },

  async deleteKategori(id) {
    const response = await axios.delete(`${API_URL}?id=eq.${id}`, {
      headers,
    });
    return response.data;
  },

  async updateKategori(id, data) {
    const payload = { category: data.category, description: data.description };
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, payload, {
      headers,
    });
    return response.data;
  }
};