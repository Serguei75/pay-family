import React from 'react';

interface LoginScreenProps {
  onPuterLogin: () => void;
  onGuestLogin: () => void;
  isLoading?: boolean;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onPuterLogin,
  onGuestLogin,
  isLoading = false,
}) => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1>💰 Pay Family</h1>
          <p>Family Expense Tracker MVP</p>
        </div>

        <div style={styles.securityBadge}>
          <span>🔒</span>
          <p>Client-Side Encrypted • GDPR Compliant</p>
        </div>

        <p style={styles.description}>
          Track family expenses together. All your data stays on your device,
          encrypted and secure.
        </p>

        <div style={styles.features}>
          <div style={styles.feature}>
            <span>🔐</span>
            <p>AES-256 Encrypted</p>
            <small>End-to-end encryption</small>
          </div>
          <div style={styles.feature}>
            <span>👥</span>
            <p>Family Sharing</p>
            <small>Multiple members</small>
          </div>
          <div style={styles.feature}>
            <span>📱</span>
            <p>Works Offline</p>
            <small>No server needed</small>
          </div>
        </div>

        <button
          onClick={onPuterLogin}
          disabled={isLoading}
          style={{
            ...styles.buttonPuter,
            ...(isLoading ? styles.buttonDisabled : {}),
          }}
        >
          {isLoading ? '⏳ Connecting...' : '🔐 Login with Puter'}
        </button>

        <button
          onClick={onGuestLogin}
          disabled={isLoading}
          style={{
            ...styles.buttonGuest,
            ...(isLoading ? styles.buttonDisabled : {}),
          }}
        >
          {isLoading ? '⏳ Loading...' : '👤 Guest Login (No Account)'}
        </button>

        <div style={styles.privacyNote}>
          <p>
            ✅ <strong>Your privacy is guaranteed</strong>: All data encrypted locally.
            We never store your personal information on our servers.
          </p>
          <small>
            Read our{' '}
            <a href="/SECURITY.md" style={styles.link}>
              Security & Privacy Policy
            </a>
          </small>
        </div>

        <p style={styles.footer}>Pay Family © 2024 | Zero-Knowledge Architecture</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  } as React.CSSProperties,
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '60px 40px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
    textAlign: 'center' as const,
  },
  header: {
    marginBottom: '20px',
  } as React.CSSProperties,
  securityBadge: {
    background: '#e8f5e9',
    border: '1px solid #4caf50',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  } as React.CSSProperties,
  description: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '30px',
    lineHeight: '1.6',
  } as React.CSSProperties,
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '40px',
  } as React.CSSProperties,
  feature: {
    textAlign: 'center' as const,
    padding: '12px',
  } as React.CSSProperties,
  buttonPuter: {
    width: '100%',
    padding: '16px',
    marginBottom: '12px',
    background: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
    transition: 'all 0.3s',
  } as React.CSSProperties,
  buttonGuest: {
    width: '100%',
    padding: '16px',
    background: '#f5f5f5',
    color: '#333',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
    transition: 'all 0.3s',
  } as React.CSSProperties,
  buttonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  } as React.CSSProperties,
  privacyNote: {
    marginTop: '24px',
    padding: '16px',
    background: '#f0f4ff',
    borderRadius: '8px',
    borderLeft: '4px solid #667eea',
    textAlign: 'left' as const,
  } as React.CSSProperties,
  link: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: 'bold',
  } as React.CSSProperties,
  footer: {
    marginTop: '20px',
    fontSize: '12px',
    color: '#999',
  } as React.CSSProperties,
};
