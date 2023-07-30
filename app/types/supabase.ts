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
      auth_token: {
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
      user_tracked_playlist: {
        Row: {
          archive_mode: number
          id: number
          inserted_at: string
          playlist_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          archive_mode?: number
          id?: number
          inserted_at?: string
          playlist_id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          archive_mode?: number
          id?: number
          inserted_at?: string
          playlist_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_tracked_playlist_snapshot: {
        Row: {
          id: number
          inserted_at: string
          original_playlist_id: string
          updated_at: string
          user_id: string
          user_playlist_id: string | null
        }
        Insert: {
          id?: number
          inserted_at?: string
          original_playlist_id: string
          updated_at?: string
          user_id: string
          user_playlist_id?: string | null
        }
        Update: {
          id?: number
          inserted_at?: string
          original_playlist_id?: string
          updated_at?: string
          user_id?: string
          user_playlist_id?: string | null
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
