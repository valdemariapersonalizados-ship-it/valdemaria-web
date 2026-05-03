import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/supabase";

export const createClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    throw new Error("Supabase no está configurado. La app sigue en modo demo.");
  }

  return createBrowserClient<Database>(url, anon);
};
