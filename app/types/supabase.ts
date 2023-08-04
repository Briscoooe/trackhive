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
          access_token: string | null;
          access_token_old: string | null;
          id: number;
          inserted_at: string;
          refresh_token: string | null;
          refresh_token_old: string | null;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          access_token?: string | null;
          access_token_old?: string | null;
          id?: number;
          inserted_at?: string;
          refresh_token?: string | null;
          refresh_token_old?: string | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          access_token?: string | null;
          access_token_old?: string | null;
          id?: number;
          inserted_at?: string;
          refresh_token?: string | null;
          refresh_token_old?: string | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      user_tracked_playlist: {
        Row: {
          archive_mode: number;
          id: number;
          inserted_at: string;
          playlist_id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          archive_mode?: number;
          id?: number;
          inserted_at?: string;
          playlist_id: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          archive_mode?: number;
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
          access_token: string | null;
          access_token_old: string | null;
          decrypted_access_token: string | null;
          decrypted_refresh_token: string | null;
          id: number | null;
          inserted_at: string | null;
          refresh_token: string | null;
          refresh_token_old: string | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          access_token?: string | null;
          access_token_old?: string | null;
          decrypted_access_token?: never;
          decrypted_refresh_token?: never;
          id?: number | null;
          inserted_at?: string | null;
          refresh_token?: string | null;
          refresh_token_old?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          access_token?: string | null;
          access_token_old?: string | null;
          decrypted_access_token?: never;
          decrypted_refresh_token?: never;
          id?: number | null;
          inserted_at?: string | null;
          refresh_token?: string | null;
          refresh_token_old?: string | null;
          updated_at?: string | null;
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
