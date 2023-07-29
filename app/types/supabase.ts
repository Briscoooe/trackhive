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
      user_spotify_playlists: {
        Row: {
          id: number
          inserted_at: string
          spotify_playlist_uri: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: number
          inserted_at?: string
          spotify_playlist_uri: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: number
          inserted_at?: string
          spotify_playlist_uri?: string
          updated_at?: string
          user_id?: string
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
