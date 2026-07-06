import { supabase } from "../services/SupabaseClient";

export const kategoriProdukAPI = {
  fetchKategori: async () => {
    const { data, error } = await supabase
      .from("kategori_produk")
      .select("*")
      .order("id", { ascending: true });
    if (error) throw error;
    return data;
  },

  createKategori: async (kategoriData) => {
    const { data, error } = await supabase
      .from("kategori_produk")
      .insert([{ category: kategoriData.category, description: kategoriData.description }])
      .select();
    if (error) throw error;
    return data;
  },

  updateKategori: async (id, kategoriData) => {
    const { data, error } = await supabase
      .from("kategori_produk")
      .update({ category: kategoriData.category, description: kategoriData.description })
      .eq("id", id)
      .select();
    if (error) throw error;
    return data;
  },

  deleteKategori: async (id) => {
    const { error } = await supabase
      .from("kategori_produk")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return true;
  }
};