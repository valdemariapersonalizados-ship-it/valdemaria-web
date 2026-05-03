export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      products: { Row: { id: string; name: string; price: number; created_at: string }; Insert: { name: string; price: number }; Update: Partial<{ name: string; price: number }> };
      orders: { Row: { id: string; user_id: string; total: number; created_at: string }; Insert: { user_id: string; total: number }; Update: Partial<{ total: number }> };
      mockups: { Row: { id: string; user_id: string; name: string; created_at: string }; Insert: { user_id: string; name: string }; Update: Partial<{ name: string }> };
    };
  };
}
