import axios from "axios";

const API_URL = "https://eazbbeabwiggkdtujveb.supabase.co/rest/v1/kupon";
const API_KEY = "sb_publishable_kzt9cJe9q0rWdbJLdjgyBw_6YgjDHay";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation", // Memaksa Supabase mengembalikan data setelah insert/update
};

export const kuponAPI = {
  async fetchKupon() {
    try {
      const response = await axios.get(`${API_URL}?order=id.desc`, { headers });
      return response.data;
    } catch (error) {
      console.error("Error fetchKupon:", error.response?.data || error.message);
      throw error;
    }
  },

  async createKupon(data) {
    try {
      const response = await axios.post(API_URL, data, { headers });
      return response.data[0];
    } catch (error) {
      console.error("Error createKupon:", error.response?.data || error.message);
      throw error;
    }
  },

  async updateKupon(id, data) {
    try {
      const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
      return response.data[0];
    } catch (error) {
      console.error("Error updateKupon:", error.response?.data || error.message);
      throw error;
    }
  },

  async deleteKupon(id) {
    try {
      const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
      return response.data;
    } catch (error) {
      console.error("Error deleteKupon:", error.response?.data || error.message);
      throw error;
    }
  },
};