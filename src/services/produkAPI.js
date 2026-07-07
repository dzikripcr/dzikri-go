import axios from "axios";
import { supabase } from "@/lib/supabaseClient";

const API_URL = "https://eazbbeabwiggkdtujveb.supabase.co/rest/v1/produk";
const API_KEY = "sb_publishable_kzt9cJe9q0rWdbJLdjgyBw_6YgjDHay";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const produkAPI = {
  async fetchProduk() {
    const response = await axios.get(
      `${API_URL}?select=*,kategori_produk(id,category)&order=id.asc`, 
      { headers }
    );
    return response.data;
  },

  async createProduk(data) {
    const response = await axios.post(API_URL, data, {
      headers: { ...headers, Prefer: "return=representation" },
    });
    return response.data[0];
  },

  async deleteProduk(id) {
    const response = await axios.delete(`${API_URL}?id=eq.${id}`, {
      headers,
    });
    return response.data;
  },

  async updateProduk(id, data) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, {
      headers,
    });
    return response.data;
  },

  async uploadImage(file, identifier = "product") {
    if (!file) return null;
    
    const fileExt = file.name.split(".").pop();
    const fileName = `${identifier}-${Math.random()}_${Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(filePath, file, { upsert: true });

    if (error) throw error;

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  },
};