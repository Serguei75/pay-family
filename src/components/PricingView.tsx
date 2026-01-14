import React from 'react';
import { PRICING_PLANS } from '../types.ts';

interface PricingViewProps {
  onSelectPlan: (planId: string) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onSelectPlan }) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Simple, Transparent Pricing</h1>
        <p>Choose the perfect plan for your family</p>
      </div>

      <div style={styles.grid}>
        {PRICING_PLANS.map((plan) => (
          <div
            key={plan.id}
            style={{
              ...styles.card,
              ...(plan.isPopular ? styles.cardPopular : {}),
            }}
          >
            {plan.isPopular && <div style={styles.badge}>Most Popular</div>}
            <h3>{plan.name}</h3>
            <div style={styles.price}>
              ${plan.price}
              <span style={styles.period}>/{plan.period}</span>
            </div>
            <ul style={styles.features}>
              {plan.features.map((feature, i) => (
                <li key={i} style={styles.feature}>
                  ✅ {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => onSelectPlan(plan.id)}
              style={{
                ...styles.button,
                ...(plan.isPopular ? styles.buttonPrimary : styles.buttonSecondary),
              }}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '60px 20px',
    background: '#fff',
    borderRadius: '8px',
  } as React.CSSProperties,
  header: {
    textAlign: 'center' as const,
    marginBottom: '50px',
  } as React.CSSProperties,
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
  } as React.CSSProperties,
  card: {
    padding: '32px 24px',
    border: '1px solid #eee',
    borderRadius: '8px',
    position: 'relative' as const,
    transition: 'transform 0.3s',
  } as React.CSSProperties,
  cardPopular: {
    border: '2px solid #667eea',
    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.2)',
    transform: 'scale(1.05)',
  } as React.CSSProperties,
  badge: {
    position: 'absolute' as const,
    top: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#667eea',
    color: '#fff',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold' as const,
  } as React.CSSProperties,
  price: {
    fontSize: '42px',
    fontWeight: 'bold' as const,
    margin: '20px 0',
  } as React.CSSProperties,
  period: {
    fontSize: '14px',
    color: '#999',
  } as React.CSSProperties,
  features: {
    listStyle: 'none',
    margin: '24px 0',
    padding: 0,
  } as React.CSSProperties,
  feature: {
    padding: '10px 0',
    borderBottom: '1px solid #f0f0f0',
  } as React.CSSProperties,
  button: {
    width: '100%',
    padding: '12px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
    marginTop: '20px',
  } as React.CSSProperties,
  buttonPrimary: {
    background: '#667eea',
    color: '#fff',
  } as React.CSSProperties,
  buttonSecondary: {
    background: '#f5f5f5',
    color: '#333',
    border: '2px solid #ddd',
  } as React.CSSProperties,
};
