export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      auth_token: {
        Row: {
          created_at: string | null;
          id: number;
          provider_refresh_token: string;
          provider_token: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          provider_refresh_token: string;
          provider_token: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          provider_refresh_token?: string;
          provider_token?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      user_tracked_playlist: {
        Row: {
          archive_mode: number;
          day_of_week: number;
          id: number;
          inserted_at: string;
          playlist_id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          archive_mode?: number;
          day_of_week?: number;
          id?: number;
          inserted_at?: string;
          playlist_id: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          archive_mode?: number;
          day_of_week?: number;
          id?: number;
          inserted_at?: string;
          playlist_id?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      user_tracked_playlist_snapshot: {
        Row: {
          id: number;
          inserted_at: string;
          original_playlist_id: string;
          updated_at: string;
          user_id: string;
          user_playlist_id: string | null;
        };
        Insert: {
          id?: number;
          inserted_at?: string;
          original_playlist_id: string;
          updated_at?: string;
          user_id: string;
          user_playlist_id?: string | null;
        };
        Update: {
          id?: number;
          inserted_at?: string;
          original_playlist_id?: string;
          updated_at?: string;
          user_id?: string;
          user_playlist_id?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      decrypted_auth_token: {
        Row: {
          created_at: string | null;
          decrypted_provider_refresh_token: string | null;
          decrypted_provider_token: string | null;
          id: number | null;
          provider_refresh_token: string | null;
          provider_token: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          decrypted_provider_refresh_token?: never;
          decrypted_provider_token?: never;
          id?: number | null;
          provider_refresh_token?: string | null;
          provider_token?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          decrypted_provider_refresh_token?: never;
          decrypted_provider_token?: never;
          id?: number | null;
          provider_refresh_token?: string | null;
          provider_token?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type UserTrackedPlaylist =
  Database["public"]["Tables"]["user_tracked_playlist"]["Row"];
export type UserTrackedPlaylistSnapshot =
  Database["public"]["Tables"]["user_tracked_playlist_snapshot"]["Row"];
export type AuthToken = Database["public"]["Tables"]["auth_token"]["Row"];
