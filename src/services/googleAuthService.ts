// Google OAuth 2.0 Integration
// Production: Replace mock implementation with real Google API calls

export interface GoogleAuthConfig {
  clientId: string;
  clientSecret?: string;
  redirectUri: string;
  scopes: string[];
}

export interface GoogleAuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  tokenType: string;
}

const defaultScopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/drive.readonly',
];

export class GoogleAuthService {
  private config: GoogleAuthConfig;

  constructor(clientId: string) {
    this.config = {
      clientId,
      redirectUri: `${window.location.origin}/callback`,
      scopes: defaultScopes,
    };
  }

  /**
   * Initiate OAuth 2.0 login flow
   */
  async initiateLogin(): Promise<void> {
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.append('client_id', this.config.clientId);
    authUrl.searchParams.append('redirect_uri', this.config.redirectUri);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('scope', this.config.scopes.join(' '));
    authUrl.searchParams.append('access_type', 'offline');
    authUrl.searchParams.append('prompt', 'consent');

    window.location.href = authUrl.toString();
  }

  /**
   * Exchange authorization code for tokens
   */
  async exchangeCodeForToken(code: string): Promise<GoogleAuthToken> {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: this.config.clientId,
        code,
        grant_type: 'authorization_code',
        redirect_uri: this.config.redirectUri,
      }).toString(),
    });

    if (!response.ok) throw new Error('Token exchange failed');
    return response.json();
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<GoogleAuthToken> {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: this.config.clientId,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }).toString(),
    });

    if (!response.ok) throw new Error('Token refresh failed');
    return response.json();
  }

  /**
   * Validate token
   */
  async validateToken(accessToken: string): Promise<boolean> {
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
      );
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const createGoogleAuthService = (clientId: string) => {
  return new GoogleAuthService(clientId);
};
