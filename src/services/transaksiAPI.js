import axios from "axios";

const API_URL = "https://eazbbeabwiggkdtujveb.supabase.co/rest/v1/transaksi";
const CUSTOMER_URL = "https://eazbbeabwiggkdtujveb.supabase.co/rest/v1/customer";
const API_KEY = "sb_publishable_kzt9cJe9q0rWdbJLdjgyBw_6YgjDHay";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const transaksiAPI = {
  async fetchTransaksi() {
    const response = await axios.get(`${API_URL}?select=*&order=id.desc`, {
      headers,
    });
    return response.data;
  },

  async createTransaksi(data) {
    const payload = {
      id_customer: data.id_customer,
      name: data.name,
      date: data.date,
      payment: data.payment,
      status: data.status,
    };
    const response = await axios.post(API_URL, payload, {
      headers: { ...headers, Prefer: "return=representation" },
    });
    return response.data[0];
  },

  async updateTransaksi(id, data) {
    const payload = {
      id_customer: data.id_customer,
      name: data.name,
      date: data.date,
      payment: data.payment,
      status: data.status,
    };
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, payload, {
      headers,
    });
    return response.data;
  },

  async deleteTransaksi(id) {
    const response = await axios.delete(`${API_URL}?id=eq.${id}`, {
      headers,
    });
    return response.data;
  },
  async fetchCustomers() {
    const response = await axios.get(
      `${CUSTOMER_URL}?select=id,name&order=name.asc`,
      { headers }
    );
    return response.data;
  },
};