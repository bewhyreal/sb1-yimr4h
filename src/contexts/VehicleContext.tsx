import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';
import type { Database } from '../types/supabase';

type Vehicle = Database['public']['Tables']['cars']['Row'];
type NewVehicle = Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>;

interface VehicleContextType {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  addVehicle: (vehicle: NewVehicle) => Promise<void>;
  updateVehicle: (id: string, vehicle: Partial<Vehicle>) => Promise<void>;
  deleteVehicle: (id: string) => Promise<void>;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export function VehicleProvider({ children }: { children: ReactNode }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchVehicles();
  }, []);

  async function fetchVehicles() {
    try {
      const { data, error: fetchError } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setVehicles(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
      setError('Failed to fetch vehicles');
    } finally {
      setLoading(false);
    }
  }

  async function addVehicle(vehicle: NewVehicle) {
    try {
      if (!user) throw new Error('User must be authenticated to add vehicles');

      const { error: insertError } = await supabase
        .from('cars')
        .insert([{ ...vehicle }]);

      if (insertError) throw insertError;
      
      await fetchVehicles();
      setError(null);
    } catch (err) {
      console.error('Error adding vehicle:', err);
      throw new Error('Failed to add vehicle');
    }
  }

  async function updateVehicle(id: string, updates: Partial<Vehicle>) {
    try {
      if (!user) throw new Error('User must be authenticated to update vehicles');

      const { error: updateError } = await supabase
        .from('cars')
        .update(updates)
        .eq('id', id);

      if (updateError) throw updateError;
      
      await fetchVehicles();
      setError(null);
    } catch (err) {
      console.error('Error updating vehicle:', err);
      throw new Error('Failed to update vehicle');
    }
  }

  async function deleteVehicle(id: string) {
    try {
      if (!user) throw new Error('User must be authenticated to delete vehicles');

      const { error: deleteError } = await supabase
        .from('cars')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      
      await fetchVehicles();
      setError(null);
    } catch (err) {
      console.error('Error deleting vehicle:', err);
      throw new Error('Failed to delete vehicle');
    }
  }

  return (
    <VehicleContext.Provider value={{ vehicles, loading, error, addVehicle, updateVehicle, deleteVehicle }}>
      {children}
    </VehicleContext.Provider>
  );
}

export function useVehicles() {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error('useVehicles must be used within a VehicleProvider');
  }
  return context;
}