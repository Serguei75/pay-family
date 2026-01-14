import { useState, useCallback } from 'react';
import { UserProfile } from '../types.ts';

export const useAuth = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (userData: UserProfile) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate login delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  }, []);

  return { user, loading, error, login, logout };
};
