export interface Database {
  public: {
    Tables: {
      cars: {
        Row: {
          id: string;
          brand: string;
          model: string;
          year: number;
          price: number;
          mileage: number | null;
          image_url: string | null;
          description: string | null;
          features: string[];
          available: boolean;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          brand: string;
          model: string;
          year: number;
          price: number;
          mileage?: number | null;
          image_url?: string | null;
          description?: string | null;
          features?: string[];
          available?: boolean;
          active?: boolean;
        };
        Update: {
          brand?: string;
          model?: string;
          year?: number;
          price?: number;
          mileage?: number | null;
          image_url?: string | null;
          description?: string | null;
          features?: string[];
          available?: boolean;
          active?: boolean;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          role: string;
          full_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role?: string;
          full_name?: string | null;
        };
        Update: {
          role?: string;
          full_name?: string | null;
          updated_at?: string;
        };
      };
    };
  };
}