import axios from "axios";

const API_URL = "https://eazbbeabwiggkdtujveb.supabase.co/rest/v1/user";
const API_KEY = "sb_publishable_kzt9cJe9q0rWdbJLdjgyBw_6YgjDHay";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const userAPI = {
  async fetchUser() {
    const response = await axios.get(API_URL, {
      headers,
    });

    return response.data;
  },

  async createUser(data) {
    const response = await axios.post(API_URL, data, {
      headers,
    });

    return response.data;
  },

  async deleteUser(id) {
    const response = await axios.delete(
      `${API_URL}?id=eq.${id}`,

      {
        headers,
      },
    );

    return response.data;
  },

  async updateUser(id, data) {
    const response = await axios.patch(
      `${API_URL}?id=eq.${id}`,

      data,

      {
        headers,
      },
    );

    return response.data;
  },
};
