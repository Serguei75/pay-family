import React from 'react';

interface HeaderProps {
  activeView: 'receipts' | 'invoices' | 'pricing';
  onViewChange: (view: 'receipts' | 'invoices' | 'pricing') => void;
  familyRole: 'Husband' | 'Wife';
  onFamilyRoleChange: (role: 'Husband' | 'Wife') => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onViewChange,
  familyRole,
  onFamilyRoleChange,
  onLogout,
}) => {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <h1>💰 Pay Family</h1>
          <p>Family Expense Tracker</p>
        </div>

        <nav style={styles.nav}>
          <button
            onClick={() => onViewChange('receipts')}
            style={{
              ...styles.navButton,
              ...(activeView === 'receipts' ? styles.navButtonActive : {}),
            }}
          >
            📄 Receipts
          </button>
          <button
            onClick={() => onViewChange('invoices')}
            style={{
              ...styles.navButton,
              ...(activeView === 'invoices' ? styles.navButtonActive : {}),
            }}
          >
            📊 Invoices
          </button>
          <button
            onClick={() => onViewChange('pricing')}
            style={{
              ...styles.navButton,
              ...(activeView === 'pricing' ? styles.navButtonActive : {}),
            }}
          >
            💳 Pricing
          </button>
        </nav>

        <div style={styles.controls}>
          <select
            value={familyRole}
            onChange={(e) => onFamilyRoleChange(e.target.value as 'Husband' | 'Wife')}
            style={styles.select}
          >
            <option value="Husband">👨 Husband</option>
            <option value="Wife">👩 Wife</option>
          </select>

          <button onClick={onLogout} style={styles.logoutButton}>
            🚪 Logout
          </button>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    padding: '20px 0',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  } as React.CSSProperties,
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as React.CSSProperties,
  logo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  nav: {
    display: 'flex',
    gap: '16px',
  } as React.CSSProperties,
  navButton: {
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500' as const,
    transition: 'all 0.3s',
  } as React.CSSProperties,
  navButtonActive: {
    background: '#fff',
    color: '#667eea',
  } as React.CSSProperties,
  controls: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  } as React.CSSProperties,
  select: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: 'none',
    background: 'rgba(255,255,255,0.2)',
    color: '#fff',
    cursor: 'pointer',
  } as React.CSSProperties,
  logoutButton: {
    background: '#ff6b6b',
    border: 'none',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500' as const,
    transition: 'background 0.3s',
  } as React.CSSProperties,
};
