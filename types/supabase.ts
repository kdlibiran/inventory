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
      items: {
        Row: {
          expiry: string;
          id: number;
          name: string;
          price: number;
          quantity: number;
          sales: number;
          user_id: string;
          purchaserecord: Database["public"]["Tables"]["purchaserecord"]["Row"][];
          salesrecord: Database["public"]["Tables"]["salesrecord"]["Row"][];
        };
        Insert: {
          expiry?: string | null;
          id?: number;
          name: string;
          price: number;
          quantity: number;
          sales: number;
          user_id?: string;
        };
        Update: {
          expiry?: string | null;
          id?: number;
          name?: string;
          price?: number;
          quantity?: number;
          sales?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "items_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      purchaserecord: {
        Row: {
          currentquantity: number;
          date: string;
          expiry: string;
          id: number;
          itemid: number;
          quantity: number;
          user_id: string;
        };
        Insert: {
          currentquantity: number;
          date: string;
          expiry: string;
          id?: number;
          itemid: number;
          quantity: number;
          user_id?: string;
        };
        Update: {
          currentquantity?: number;
          date?: string;
          expiry?: string;
          id?: number;
          itemid?: number;
          quantity?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "purchaserecord_itemid_fkey";
            columns: ["itemid"];
            referencedRelation: "items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "purchaserecord_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      salesrecord: {
        Row: {
          date: string;
          id: number;
          itemid: number;
          quantity: number;
          user_id: string;
        };
        Insert: {
          date: string;
          id?: number;
          itemid: number;
          quantity: number;
          user_id?: string;
        };
        Update: {
          date?: string;
          id?: number;
          itemid?: number;
          quantity?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "salesrecord_itemid_fkey";
            columns: ["itemid"];
            referencedRelation: "items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "salesrecord_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
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
