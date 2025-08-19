import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // ✅ Vite way
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY; // ✅ Vite way
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true, // required for OAuth
  },
});
