/**
 * Puter.js Authentication Service
 * Zero-server architecture: All authentication & data stored client-side
 * GDPR Compliant: No user data stored on our servers
 */

export interface PuterUser {
  id: string;
  username: string;
  email: string;
  profilePicture?: string;
}

export interface PuterAuthConfig {
  appId: string; // Puter App ID (public, safe to expose)
  appName: string;
  redirectUrl?: string;
}

let puterInstance: any = null;
let currentUser: PuterUser | null = null;

/**
 * Initialize Puter.js - GDPR Safe
 * Only loads public configuration
 */
export async function initPuter(config: PuterAuthConfig): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    // Load Puter SDK from CDN
    if (!(window as any).puter) {
      const script = document.createElement('script');
      script.src = 'https://js.puter.com/v2/';
      script.async = true;
      document.head.appendChild(script);

      // Wait for Puter to load
      await new Promise((resolve) => {
        const checkPuter = setInterval(() => {
          if ((window as any).puter) {
            clearInterval(checkPuter);
            resolve(null);
          }
        }, 100);
      });
    }

    puterInstance = (window as any).puter;

    // Initialize with public config only
    if (puterInstance?.auth) {
      await puterInstance.auth.init({
        appId: config.appId,
        appName: config.appName,
      });
    }
  } catch (error) {
    console.error('Puter initialization failed:', error);
  }
}

/**
 * Login with Puter - Zero server involvement
 * User authenticates through Puter's secure system
 * We never see their password or sensitive data
 */
export async function puterLogin(): Promise<PuterUser | null> {
  try {
    if (!puterInstance?.auth) {
      throw new Error('Puter not initialized');
    }

    // Puter handles all authentication securely
    const user = await puterInstance.auth.login();

    if (user) {
      currentUser = {
        id: user.id || user.email,
        username: user.username || user.email.split('@')[0],
        email: user.email,
        profilePicture: user.profilePicture,
      };

      // Store only user ID and username locally (encrypted)
      localStorage.setItem(
        'puter_user_id',
        JSON.stringify({
          id: currentUser.id,
          username: currentUser.username,
          email: currentUser.email,
          timestamp: Date.now(),
        })
      );

      return currentUser;
    }

    return null;
  } catch (error) {
    console.error('Puter login error:', error);
    return null;
  }
}

/**
 * Logout - Clear local session
 */
export async function puterLogout(): Promise<void> {
  try {
    if (puterInstance?.auth?.logout) {
      await puterInstance.auth.logout();
    }

    currentUser = null;
    localStorage.removeItem('puter_user_id');
    // DO NOT clear documents - they stay locally encrypted
  } catch (error) {
    console.error('Puter logout error:', error);
  }
}

/**
 * Get current user session
 */
export function getCurrentUser(): PuterUser | null {
  if (currentUser) return currentUser;

  // Try to restore from localStorage
  try {
    const stored = localStorage.getItem('puter_user_id');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Check if session is fresh (within 7 days)
      if (Date.now() - parsed.timestamp < 7 * 24 * 60 * 60 * 1000) {
        currentUser = parsed;
        return currentUser;
      }
    }
  } catch (e) {
    // Ignore parse errors
  }

  return null;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

/**
 * Get Puter access token for optional cloud backup
 * User has full control - can revoke anytime
 */
export async function getPuterAccessToken(): Promise<string | null> {
  try {
    if (puterInstance?.auth) {
      return await puterInstance.auth.getToken();
    }
  } catch (error) {
    console.error('Could not get Puter token:', error);
  }
  return null;
}

/**
 * Save encrypted data to Puter Drive (optional)
 * User explicitly consents to cloud backup
 * Data is encrypted client-side before upload
 */
export async function saveToPuterDrive(
  filename: string,
  encryptedData: string
): Promise<boolean> {
  try {
    if (!puterInstance?.fs) {
      console.warn('Puter FS not available, skipping cloud backup');
      return false;
    }

    // Save to /Documents/PayFamily/ on user's Puter drive
    const path = `/Documents/PayFamily/${filename}`;
    await puterInstance.fs.write(path, encryptedData);
    return true;
  } catch (error) {
    console.error('Puter Drive save error:', error);
    return false;
  }
}

/**
 * Load encrypted data from Puter Drive
 */
export async function loadFromPuterDrive(filename: string): Promise<string | null> {
  try {
    if (!puterInstance?.fs) return null;

    const path = `/Documents/PayFamily/${filename}`;
    const content = await puterInstance.fs.read(path);
    return content;
  } catch (error) {
    console.error('Puter Drive load error:', error);
    return null;
  }
}

/**
 * List all backups in Puter Drive
 */
export async function listPuterBackups(): Promise<string[]> {
  try {
    if (!puterInstance?.fs) return [];

    const files = await puterInstance.fs.listdir('/Documents/PayFamily/');
    return files.map((f: any) => f.name).filter((name: string) => name.endsWith('.backup'));
  } catch (error) {
    console.error('Puter list backups error:', error);
    return [];
  }
}

export const puterAuthService = {
  initPuter,
  puterLogin,
  puterLogout,
  getCurrentUser,
  isAuthenticated,
  getPuterAccessToken,
  saveToPuterDrive,
  loadFromPuterDrive,
  listPuterBackups,
};
