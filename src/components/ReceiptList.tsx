import React, { useState } from 'react';
import { Document } from '../types.ts';

interface ReceiptListProps {
  receipts: Document[];
  onDelete: (id: string) => void;
  onUpdate: (doc: Document) => void;
}

export const ReceiptList: React.FC<ReceiptListProps> = ({
  receipts,
  onDelete,
  onUpdate,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Document | null>(null);

  const handleEdit = (doc: Document) => {
    setEditingId(doc.id);
    setEditData({ ...doc });
  };

  const handleSave = () => {
    if (editData) {
      onUpdate(editData);
      setEditingId(null);
      setEditData(null);
    }
  };

  return (
    <div style={styles.container}>
      <h3>Receipts ({receipts.length})</h3>
      {receipts.length === 0 ? (
        <p style={styles.empty}>💵 No receipts yet. Add one to get started!</p>
      ) : (
        <div style={styles.list}>
          {receipts.map((receipt) =>
            editingId === receipt.id && editData ? (
              <div key={receipt.id} style={styles.editForm}>
                <input
                  type="text"
                  value={editData.vendorName}
                  onChange={(e) =>
                    setEditData({ ...editData, vendorName: e.target.value })
                  }
                  style={styles.input}
                />
                <input
                  type="number"
                  value={editData.totalAmount}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      totalAmount: parseFloat(e.target.value),
                    })
                  }
                  style={styles.input}
                />
                <div style={styles.buttonGroup}>
                  <button
                    onClick={handleSave}
                    style={{ ...styles.button, background: '#27ae60' }}
                  >
                    ✅ Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    style={{ ...styles.button, background: '#95a5a6' }}
                  >
                    ❌ Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div key={receipt.id} style={styles.item}>
                {receipt.imageSrc && (
                  <img src={receipt.imageSrc} alt="Receipt" style={styles.image} />
                )}
                <div style={styles.content}>
                  <h4>{receipt.vendorName}</h4>
                  <p>${receipt.totalAmount.toFixed(2)}</p>
                  <p style={styles.meta}>
                    {receipt.category} • {receipt.transactionDate} • {receipt.addedBy}
                  </p>
                </div>
                <div style={styles.actions}>
                  <button
                    onClick={() => handleEdit(receipt)}
                    style={styles.button}
                  >
                    ✍️ Edit
                  </button>
                  <button
                    onClick={() => onDelete(receipt.id)}
                    style={{ ...styles.button, background: '#e74c3c' }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  } as React.CSSProperties,
  list: {
    display: 'grid',
    gap: '12px',
    marginTop: '16px',
  } as React.CSSProperties,
  empty: {
    textAlign: 'center' as const,
    color: '#999',
    padding: '40px 20px',
  },
  item: {
    display: 'flex',
    gap: '16px',
    padding: '16px',
    border: '1px solid #eee',
    borderRadius: '6px',
    alignItems: 'center',
  } as React.CSSProperties,
  image: {
    width: '80px',
    height: '80px',
    borderRadius: '6px',
    objectFit: 'cover' as const,
  } as React.CSSProperties,
  content: {
    flex: 1,
  } as React.CSSProperties,
  meta: {
    fontSize: '12px',
    color: '#999',
    margin: '8px 0 0 0',
  } as React.CSSProperties,
  actions: {
    display: 'flex',
    gap: '8px',
  } as React.CSSProperties,
  button: {
    padding: '8px 12px',
    background: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold' as const,
  } as React.CSSProperties,
  buttonGroup: {
    display: 'flex',
    gap: '8px',
  } as React.CSSProperties,
  editForm: {
    padding: '16px',
    background: '#f9f9f9',
    borderRadius: '6px',
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-end',
  } as React.CSSProperties,
  input: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    flex: 1,
  } as React.CSSProperties,
};
