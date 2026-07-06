import { supabase } from "../services/SupabaseClient";

export const produkAPI = {
  fetchProduk: async () => {
    const { data, error } = await supabase
      .from("produk")
      .select(`
        *,
        kategori_produk (id, category)
      `)
      .order("id", { ascending: true });
    if (error) throw error;
    return data;
  },

  uploadImage: async (file) => {
    if (!file) return null;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}_${Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  createProduk: async (produkData) => {
    const { data, error } = await supabase
      .from("produk")
      .insert([produkData])
      .select();
    if (error) throw error;
    return data;
  },

  updateProduk: async (id, produkData) => {
    const { data, error } = await supabase
      .from("produk")
      .update(produkData)
      .eq("id", id)
      .select();
    if (error) throw error;
    return data;
  },

  deleteProduk: async (id) => {
    const { error } = await supabase
      .from("produk")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return true;
  }
};