/**
 * Supabase Database Types
 * Auto-generated from the Supabase schema.
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          event_date: string | null
          event_type: string
          first_name: string
          id: string
          is_read: boolean | null
          last_name: string
          message: string
          phone: string
          venue: string | null
        }
        Insert: {
          created_at?: string
          email: string
          event_date?: string | null
          event_type: string
          first_name: string
          id?: string
          is_read?: boolean | null
          last_name: string
          message: string
          phone: string
          venue?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          event_date?: string | null
          event_type?: string
          first_name?: string
          id?: string
          is_read?: boolean | null
          last_name?: string
          message?: string
          phone?: string
          venue?: string | null
        }
        Relationships: []
      }
      packages: {
        Row: {
          base_price: number
          created_at: string
          description: string | null
          display_order: number | null
          event_type: Database["public"]["Enums"]["event_type"]
          features: Json | null
          id: string
          image_url: string | null
          is_active: boolean | null
          is_popular: boolean | null
          name: string
          slug: string
        }
        Insert: {
          base_price: number
          created_at?: string
          description?: string | null
          display_order?: number | null
          event_type: Database["public"]["Enums"]["event_type"]
          features?: Json | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_popular?: boolean | null
          name: string
          slug: string
        }
        Update: {
          base_price?: number
          created_at?: string
          description?: string | null
          display_order?: number | null
          event_type?: Database["public"]["Enums"]["event_type"]
          features?: Json | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_popular?: boolean | null
          name?: string
          slug?: string
        }
        Relationships: []
      }
      portfolio_items: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          event_type: Database["public"]["Enums"]["event_type"]
          featured: boolean | null
          id: string
          image_urls: string[] | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          event_type: Database["public"]["Enums"]["event_type"]
          featured?: boolean | null
          id?: string
          image_urls?: string[] | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          event_type?: Database["public"]["Enums"]["event_type"]
          featured?: boolean | null
          id?: string
          image_urls?: string[] | null
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      quotes: {
        Row: {
          admin_notes: string | null
          created_at: string
          email: string
          estimated_budget: string | null
          event_date: string | null
          event_type: Database["public"]["Enums"]["event_type"]
          first_name: string
          guest_count: number | null
          id: string
          last_name: string
          message: string
          phone: string
          quoted_amount: number | null
          status: Database["public"]["Enums"]["quote_status"]
          updated_at: string
          user_id: string | null
          venue: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          email: string
          estimated_budget?: string | null
          event_date?: string | null
          event_type: Database["public"]["Enums"]["event_type"]
          first_name: string
          guest_count?: number | null
          id?: string
          last_name: string
          message: string
          phone: string
          quoted_amount?: number | null
          status?: Database["public"]["Enums"]["quote_status"]
          updated_at?: string
          user_id?: string | null
          venue?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          email?: string
          estimated_budget?: string | null
          event_date?: string | null
          event_type?: Database["public"]["Enums"]["event_type"]
          first_name?: string
          guest_count?: number | null
          id?: string
          last_name?: string
          message?: string
          phone?: string
          quoted_amount?: number | null
          status?: Database["public"]["Enums"]["quote_status"]
          updated_at?: string
          user_id?: string | null
          venue?: string | null
        }
        Relationships: []
      }
      virtual_previews: {
        Row: {
          ai_model: string | null
          ai_prompt: string | null
          created_at: string
          custom_prompt: string | null
          error_message: string | null
          generated_image_path: string | null
          generated_image_url: string | null
          id: string
          original_image_path: string
          original_image_url: string
          processing_time_ms: number | null
          status: Database["public"]["Enums"]["preview_status"]
          strength: number | null
          theme: Database["public"]["Enums"]["preview_theme"]
          user_id: string
        }
        Insert: {
          ai_model?: string | null
          ai_prompt?: string | null
          created_at?: string
          custom_prompt?: string | null
          error_message?: string | null
          generated_image_path?: string | null
          generated_image_url?: string | null
          id?: string
          original_image_path: string
          original_image_url: string
          processing_time_ms?: number | null
          status?: Database["public"]["Enums"]["preview_status"]
          strength?: number | null
          theme: Database["public"]["Enums"]["preview_theme"]
          user_id: string
        }
        Update: {
          ai_model?: string | null
          ai_prompt?: string | null
          created_at?: string
          custom_prompt?: string | null
          error_message?: string | null
          generated_image_path?: string | null
          generated_image_url?: string | null
          id?: string
          original_image_path?: string
          original_image_url?: string
          processing_time_ms?: number | null
          status?: Database["public"]["Enums"]["preview_status"]
          strength?: number | null
          theme?: Database["public"]["Enums"]["preview_theme"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_preview_rate_limit: {
        Args: { p_user_id: string }
        Returns: boolean
      }
      get_daily_preview_count: { Args: { p_user_id: string }; Returns: number }
    }
    Enums: {
      event_type:
        | "wedding"
        | "mehndi_sangeet"
        | "ladies_sangeet"
        | "bride_groom_entry"
        | "birthday"
        | "family_ceremony"
        | "other"
      preview_status: "pending" | "processing" | "completed" | "failed"
      preview_theme:
        | "mehndi_vibes"
        | "sangeet_glow"
        | "grand_wedding"
        | "bride_groom_entry"
        | "birthday_fun"
        | "custom"
      quote_status:
        | "pending"
        | "reviewed"
        | "quoted"
        | "accepted"
        | "declined"
        | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Convenience type aliases
export type EventType = Database["public"]["Enums"]["event_type"]
export type QuoteStatus = Database["public"]["Enums"]["quote_status"]
export type PreviewTheme = Database["public"]["Enums"]["preview_theme"]
export type PreviewStatus = Database["public"]["Enums"]["preview_status"]

export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"]
export type TablesInsert<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Insert"]
export type TablesUpdate<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Update"]
