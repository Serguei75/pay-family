import React from 'react';

interface LoginScreenProps {
  onGoogleLogin: () => void;
  onGuestLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onGoogleLogin,
  onGuestLogin,
}) => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1>💰 Pay Family</h1>
          <p>Family Expense Tracker MVP</p>
        </div>

        <p style={styles.description}>
          Track family expenses together. Simple, secure, and smart.
        </p>

        <div style={styles.features}>
          <div style={styles.feature}>
            <span>📱</span>
            <p>Snap & Auto-Categorize</p>
          </div>
          <div style={styles.feature}>
            <span>👥</span>
            <p>Family Sharing</p>
          </div>
          <div style={styles.feature}>
            <span>📊</span>
            <p>Analytics & Reports</p>
          </div>
        </div>

        <button
          onClick={onGoogleLogin}
          style={styles.buttonGoogle}
        >
          🔐 Login with Google
        </button>

        <button
          onClick={onGuestLogin}
          style={styles.buttonGuest}
        >
          👤 Guest Login
        </button>

        <p style={styles.footer}>
          No credit card required. Free plan available.
        </p>
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
    marginBottom: '30px',
  } as React.CSSProperties,
  description: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '30px',
  } as React.CSSProperties,
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginBottom: '40px',
  } as React.CSSProperties,
  feature: {
    textAlign: 'center' as const,
  } as React.CSSProperties,
  buttonGoogle: {
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
    transition: 'background 0.3s',
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
  footer: {
    marginTop: '20px',
    fontSize: '12px',
    color: '#999',
  } as React.CSSProperties,
};
