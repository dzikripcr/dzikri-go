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

  async createCustomer(data) {
    const response = await axios.post(API_URL, data, {
      headers: { ...headers, Prefer: "return=representation" },
    });
    return response.data[0];
  },

  async updateCustomer(id, data) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, {
      headers,
    });
    return response.data;
  },

  async deleteCustomer(id) {
    const response = await axios.delete(`${API_URL}?id=eq.${id}`, {
      headers,
    });
    return response.data;
  },

  async createCustomerFromUser(user) {
    const payload = {
      id_user: user.id,
      name: user.name,
      email: user.email,
      profile_image: user.profile_image || null,
      phone: "",
      address: "",
      order_count: 0,
      total_spend: 0,
      status: "Aktif",
      join_date: new Date().toISOString(),
      last_purchase: null,
      completed_orders: 0,
      cancelled_orders: 0,
      level_membership: "silver",
      user_source: "Website Register",
    };
    return this.createCustomer(payload);
  },
};