// feedbackAPI.js
import axios from "axios";

const API_URL = "https://eazbbeabwiggkdtujveb.supabase.co/rest/v1/feedback";
const API_KEY = "sb_publishable_kzt9cJe9q0rWdbJLdjgyBw_6YgjDHay";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const feedbackAPI = {

  async fetchFeedback() {
    try {
      const response = await axios.get(`${API_URL}?select=*&order=created_at.desc`, { headers });
      
      return response.data.map(item => ({
        ...item,
        customerName: item.name
      }));
    } catch (error) {
      console.error("Error fetching feedback:", error);
      throw error;
    }
  }
};