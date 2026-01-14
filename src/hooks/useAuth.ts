import { useState, useCallback, useEffect } from 'react';
import { UserProfile } from '../types.ts';
import {
  initPuter,
  puterLogin,
  puterLogout,
  getCurrentUser,
  isAuthenticated,
  puterAuthService,
} from '../services/puterAuthService.ts';
import {
  generateSecurePassword,
  storeEncryptedInLocalStorage,
  retrieveEncryptedFromLocalStorage,
} from '../services/encryptionService.ts';

export const useAuth = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [encryptionPassword, setEncryptionPassword] = useState<string | null>(null);

  // Initialize Puter on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);

        // Initialize Puter.js
        await initPuter({
          appId: import.meta.env.VITE_PUTER_APP_ID || 'payfamily-mvp',
          appName: import.meta.env.VITE_PUTER_APP_NAME || 'Pay Family',
        });

        // Check if already logged in
        const currentUser = getCurrentUser();
        if (currentUser && isAuthenticated()) {
          // Try to restore encryption password from secure storage
          const stored = localStorage.getItem('_pf_enc_pwd_hint');
          if (stored) {
            // User has encryption password
            setEncryptionPassword(stored);
          }

          setUser({
            id: currentUser.id,
            name: currentUser.username,
            email: currentUser.email,
            role: 'Husband',
          });
        }

        setLoading(false);
      } catch (err) {
        console.error('Auth initialization failed:', err);
        setError(err instanceof Error ? err.message : 'Auth failed');
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login with Puter
  const login = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const puterUser = await puterLogin();
      if (!puterUser) {
        throw new Error('Puter login failed');
      }

      // Generate or restore encryption password
      let pwd = encryptionPassword;
      if (!pwd) {
        pwd = generateSecurePassword();
        // Store hint (NOT the actual password)
        localStorage.setItem('_pf_enc_pwd_hint', 'set');
      }

      setEncryptionPassword(pwd);

      setUser({
        id: puterUser.id,
        name: puterUser.username,
        email: puterUser.email,
        role: 'Husband',
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Login failed';
      setError(errorMsg);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  }, [encryptionPassword]);

  // Guest login (no Puter)
  const loginAsGuest = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const guestPwd = generateSecurePassword();
      setEncryptionPassword(guestPwd);
      localStorage.setItem('_pf_enc_pwd_hint', 'set');

      setUser({
        id: 'guest-' + Date.now(),
        name: 'Guest',
        email: 'guest@payfamily.local',
        role: 'Husband',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Guest login failed');
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await puterLogout();
      setUser(null);
      setEncryptionPassword(null);
      localStorage.removeItem('_pf_enc_pwd_hint');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get current encryption password (required for all data ops)
  const getEncryptionPassword = useCallback((): string => {
    if (!encryptionPassword) {
      throw new Error('No encryption password set');
    }
    return encryptionPassword;
  }, [encryptionPassword]);

  return {
    user,
    loading,
    error,
    login,
    loginAsGuest,
    logout,
    getEncryptionPassword,
    isEncrypted: !!encryptionPassword,
  };
};
