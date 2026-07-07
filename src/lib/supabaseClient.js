import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eazbbeabwiggkdtujveb.supabase.co";
const supabaseKey = "sb_publishable_kzt9cJe9q0rWdbJLdjgyBw_6YgjDHay";

export const supabase = createClient(supabaseUrl, supabaseKey);