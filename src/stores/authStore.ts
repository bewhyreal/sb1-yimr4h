import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,

  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Ensure profile exists after successful sign in
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert([
            {
              id: data.user.id,
              role: data.user.user_metadata?.role || 'user',
            }
          ], { onConflict: 'id' });

        if (profileError) {
          console.error('Error ensuring profile:', profileError);
        }
      }

      set({ user: data.user, error: null });
    } catch (err) {
      console.error('Sign in error:', err);
      set({ error: 'Invalid email or password', user: null });
      throw err;
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, error: null });
    } catch (err) {
      console.error('Sign out error:', err);
      set({ error: 'Failed to sign out' });
      throw err;
    }
  },

  checkAuth: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      if (session?.user) {
        // Refresh the session to ensure we have valid tokens
        const { data: { user }, error: refreshError } = await supabase.auth.getUser();
        if (refreshError) throw refreshError;
        
        // Ensure profile exists
        if (user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert([
              {
                id: user.id,
                role: user.user_metadata?.role || 'user',
              }
            ], { onConflict: 'id' });

          if (profileError) {
            console.error('Error ensuring profile:', profileError);
          }
        }
        
        set({ user, loading: false, error: null });
      } else {
        set({ user: null, loading: false, error: null });
      }
    } catch (err) {
      console.error('Auth check error:', err);
      set({ 
        user: null,
        loading: false,
        error: 'Failed to check authentication status'
      });
    }
  },
}));