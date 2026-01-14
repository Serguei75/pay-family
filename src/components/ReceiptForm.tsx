import React, { useState } from 'react';
import { Document } from '../types.ts';

interface ReceiptFormProps {
  onSubmit: (data: Partial<Document>) => void;
  isLoading: boolean;
  categories: string[];
}

export const ReceiptForm: React.FC<ReceiptFormProps> = ({
  onSubmit,
  isLoading,
  categories,
}) => {
  const [formData, setFormData] = useState({
    vendorName: '',
    totalAmount: '',
    category: 'Other',
    transactionDate: new Date().toISOString().split('T')[0],
    description: '',
  });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.vendorName || !formData.totalAmount) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit({
      ...formData,
      totalAmount: parseFloat(formData.totalAmount),
      file: file || undefined,
    });
    setFormData({
      vendorName: '',
      totalAmount: '',
      category: 'Other',
      transactionDate: new Date().toISOString().split('T')[0],
      description: '',
    });
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Add Receipt</h2>
      
      <div style={styles.formGroup}>
        <label>Vendor Name *</label>
        <input
          type="text"
          value={formData.vendorName}
          onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
          placeholder="e.g., Whole Foods"
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label>Amount *</label>
        <input
          type="number"
          step="0.01"
          value={formData.totalAmount}
          onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
          placeholder="0.00"
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label>Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          style={styles.input}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.formGroup}>
        <label>Date</label>
        <input
          type="date"
          value={formData.transactionDate}
          onChange={(e) => setFormData({ ...formData, transactionDate: e.target.value })}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label>Image (Receipt photo)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          style={styles.input}
        />
        {file && <p style={styles.fileName}>Selected: {file.name}</p>}
      </div>

      <div style={styles.formGroup}>
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Additional notes..."
          style={{ ...styles.input, minHeight: '80px' } as React.CSSProperties}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        style={{
          ...styles.submitButton,
          ...(isLoading ? styles.submitButtonDisabled : {}),
        }}
      >
        {isLoading ? '⏳ Adding...' : '✅ Add Receipt'}
      </button>
    </form>
  );
};

const styles = {
  form: {
    background: '#fff',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    margin: '0 auto',
  } as React.CSSProperties,
  formGroup: {
    marginBottom: '16px',
  } as React.CSSProperties,
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    fontFamily: 'inherit',
    boxSizing: 'border-box' as const,
  } as React.CSSProperties,
  fileName: {
    fontSize: '12px',
    color: '#667eea',
    marginTop: '4px',
  } as React.CSSProperties,
  submitButton: {
    width: '100%',
    padding: '12px',
    background: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
    transition: 'background 0.3s',
  } as React.CSSProperties,
  submitButtonDisabled: {
    background: '#ccc',
    cursor: 'not-allowed',
  } as React.CSSProperties,
};
