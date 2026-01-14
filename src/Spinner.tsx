import React from 'react';

export const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeMap = {
    sm: '24px',
    md: '40px',
    lg: '60px',
  };

  return (
    <div style={{
      display: 'inline-block',
      width: sizeMap[size],
      height: sizeMap[size],
      border: '4px solid rgba(102, 126, 234, 0.2)',
      borderTop: '4px solid #667eea',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }}>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
