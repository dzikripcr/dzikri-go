import axios from "axios";

const API_URL = "https://eazbbeabwiggkdtujveb.supabase.co/rest/v1/customer";
const API_KEY = "sb_publishable_kzt9cJe9q0rWdbJLdjgyBw_6YgjDHay";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const customerAPI = {
  async fetchCustomers() {
    const response = await axios.get(API_URL, { headers });
    return response.data;
  },

  async fetchCustomerById(id) {
    const response = await axios.get(`${API_URL}?id=eq.${id}`, { headers });
    return response.data.length ? response.data[0] : null;
  },
  
  async createCustomerFromUser(newUser) {
    const payload = {
      idUser: newUser.id,
      nama_customer: newUser.nama_user,
      email: newUser.email,
      poto_profil: newUser.poto_profil || null,
      jumlah_pesanan: 0,
      total_belanja: 0,
      status: "aktif", 
      level_membership: "silver",
    };

    const response = await axios.post(API_URL, payload, {
      headers: { ...headers, Prefer: "return=representation" },
    });
    return response.data[0];
  },

  async createCustomer(data) {
    const response = await axios.post(API_URL, data, {
      headers: { ...headers, Prefer: "return=representation" },
    });
    return response.data[0];
  },

  async updateCustomer(id, data) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, {
      headers: { ...headers, Prefer: "return=representation" },
    });
    return response.data.length ? response.data[0] : null;
  },

  async deleteCustomer(id) {
    const response = await axios.delete(`${API_URL}?id=eq.${id}`, {
      headers,
    });
    return response.data;
  },

  // Sinkronisasi foto jika diubah dari menu User
  async syncProfileImageByUserId(userId, profileImage) {
    const response = await axios.patch(
      `${API_URL}?idUser=eq.${userId}`,
      { poto_profil: profileImage },
      { headers: { ...headers, Prefer: "return=representation" } }
    );
    return response.data.length ? response.data[0] : null;
  },
};