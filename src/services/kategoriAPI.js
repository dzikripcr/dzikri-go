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
    const response = await axios.get(API_URL, { headers });
    return response.data;
  },

  async createKategori(data) {
    const response = await axios.post(API_URL, data, {
      headers: { ...headers, Prefer: "return=representation" },
    });
    return response.data[0];
  },

  async updateKategori(id, data) {
    const { id: excludedId, created_at, updated_at, ...cleanPayload } = data;

    const response = await axios.patch(`${API_URL}?id=eq.${id}`, cleanPayload, {
      headers,
    });
    return response.data;
  },

  async deleteKategori(id) {
    const response = await axios.delete(`${API_URL}?id=eq.${id}`, {
      headers,
    });
    return response.data;
  },
};