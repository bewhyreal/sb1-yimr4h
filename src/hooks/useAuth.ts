import { useEffect, useCallback } from 'react';
import { useAuthStore } from '../stores/authStore';

export function useAuth() {
  const { user, loading, error, checkAuth } = useAuthStore();

  const initAuth = useCallback(async () => {
    try {
      await checkAuth();
    } catch (err) {
      console.error('Auth initialization error:', err);
    }
  }, [checkAuth]);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
  };
}