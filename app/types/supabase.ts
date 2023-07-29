export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      spotify_auth_tokens: {
        Row: {
          access_token: string | null
          id: number
          inserted_at: string
          refresh_token: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          access_token?: string | null
          id?: number
          inserted_at?: string
          refresh_token?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          access_token?: string | null
          id?: number
          inserted_at?: string
          refresh_token?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
