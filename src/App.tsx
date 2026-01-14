import React, { useState, useEffect } from 'react';
import { Document, FilterState, CATEGORIES } from './types.ts';
import { Header } from './components/Header.tsx';
import { LoginScreen } from './components/LoginScreen.tsx';
import { ReceiptForm } from './components/ReceiptForm.tsx';
import { ReceiptList } from './components/ReceiptList.tsx';
import { PricingView } from './components/PricingView.tsx';
import { ExportControls } from './components/ExportControls.tsx';
import { useAuth } from './hooks/useAuth.ts';
import { useDocuments } from './hooks/useDocuments.ts';
import { Spinner } from './Spinner.tsx';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const { user, login, loginAsGuest, logout, loading: authLoading, getEncryptionPassword } = useAuth();
  const { documents, addDocument, deleteDocument, updateDocument, loading: docsLoading } = useDocuments();

  const [activeView, setActiveView] = useState<'receipts' | 'invoices' | 'pricing'>('receipts');
  const [familyRole, setFamilyRole] = useState<'Husband' | 'Wife'>('Husband');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    vendor: '',
    startDate: '',
    endDate: '',
    category: '',
    companyName: '',
    taxId: '',
    member: '',
  });

  // Обработка Puter Login
  const handlePuterLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Puter login failed:', error);
    }
  };

  // Обработка Guest Login
  const handleGuestLogin = async () => {
    try {
      await loginAsGuest();
    } catch (error) {
      console.error('Guest login failed:', error);
    }
  };

  // Обработка добавления документа
  const handleAddDocument = async (docData: Partial<Document>) => {
    setIsSubmitting(true);
    try {
      const doc: Document = {
        id: uuidv4(),
        type: docData.type || 'receipt',
        vendorName: docData.vendorName || '',
        companyName: docData.companyName || '',
        totalAmount: docData.totalAmount || 0,
        currency: docData.currency || 'USD',
        category: docData.category || 'Other',
        transactionDate: docData.transactionDate || new Date().toISOString().split('T')[0],
        addedBy: user?.name || 'Unknown',
        familyRole: familyRole,
        createdAt: new Date().toISOString(),
        description: docData.description || '',
        items: docData.items || [],
      };

      // Если есть изображение, конвертируем в data URL
      if (docData.file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          doc.imageSrc = e.target?.result as string;
          await addDocument(doc);
        };
        reader.readAsDataURL(docData.file);
      } else {
        await addDocument(doc);
      }
    } catch (error) {
      console.error('Failed to add document:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Фильтрация документов
  const filteredDocuments = documents.filter(doc => {
    if (filters.vendor && !doc.vendorName.toLowerCase().includes(filters.vendor.toLowerCase())) {
      return false;
    }
    if (filters.category && doc.category !== filters.category) {
      return false;
    }
    if (filters.startDate && doc.transactionDate < filters.startDate) {
      return false;
    }
    if (filters.endDate && doc.transactionDate > filters.endDate) {
      return false;
    }
    if (filters.member && doc.addedBy !== filters.member) {
      return false;
    }
    return true;
  });

  // Показывать экран входа если пользователь не авторизирован
  if (!user && !authLoading) {
    return (
      <LoginScreen
        onPuterLogin={handlePuterLogin}
        onGuestLogin={handleGuestLogin}
        isLoading={authLoading}
      />
    );
  }

  // Показывать загрузку
  if (authLoading || docsLoading) {
    return (
      <div style={styles.loadingContainer}>
        <Spinner size="lg" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <Header
        activeView={activeView}
        onViewChange={setActiveView}
        familyRole={familyRole}
        onFamilyRoleChange={setFamilyRole}
        onLogout={logout}
      />

      <main style={styles.main}>
        <div style={styles.container}>
          {/* RECEIPTS VIEW */}
          {activeView === 'receipts' && (
            <div>
              <section style={styles.section}>
                <ReceiptForm
                  onSubmit={handleAddDocument}
                  isLoading={isSubmitting}
                  categories={CATEGORIES}
                />
              </section>

              <section style={styles.section}>
                <ExportControls
                  documents={filteredDocuments}
                  fileName={`receipts-${new Date().toISOString().split('T')[0]}`}
                />
              </section>

              <section style={styles.section}>
                <FilterPanel
                  filters={filters}
                  onFiltersChange={setFilters}
                  categories={CATEGORIES}
                  members={['All', ...new Set(documents.map(d => d.addedBy || 'Unknown'))]}
                />
              </section>

              <section style={styles.section}>
                <ReceiptList
                  receipts={filteredDocuments}
                  onDelete={deleteDocument}
                  onUpdate={updateDocument}
                />
              </section>

              <section style={styles.section}>
                <TotalsSummary documents={filteredDocuments} />
              </section>
            </div>
          )}

          {/* INVOICES VIEW */}
          {activeView === 'invoices' && (
            <div style={styles.emptyState}>
              <h2>Invoices Module</h2>
              <p>Invoice management coming soon...</p>
              <p style={{ fontSize: '12px', color: '#999' }}>
                This module will include B2B invoice tracking and tax report generation.
              </p>
            </div>
          )}

          {/* PRICING VIEW */}
          {activeView === 'pricing' && (
            <PricingView onSelectPlan={(planId) => {
              console.log('Selected plan:', planId);
              alert('Plan selection redirect would happen here');
            }} />
          )}
        </div>
      </main>

      <footer style={styles.footer}>
        <p>Pay Family © 2024 | Zero-Knowledge Client-Side Architecture</p>
      </footer>
    </div>
  );
}

// Компонент фильтра
const FilterPanel: React.FC<{
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  categories: string[];
  members: string[];
}> = ({ filters, onFiltersChange, categories, members }) => {
  return (
    <div style={styles.filterPanel}>
      <h3>Filters</h3>
      <div style={styles.filterGrid}>
        <input
          type="text"
          placeholder="Vendor name"
          value={filters.vendor}
          onChange={(e) => onFiltersChange({ ...filters, vendor: e.target.value })}
          style={styles.filterInput}
        />
        <select
          value={filters.category}
          onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
          style={styles.filterInput}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => onFiltersChange({ ...filters, startDate: e.target.value })}
          style={styles.filterInput}
        />
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => onFiltersChange({ ...filters, endDate: e.target.value })}
          style={styles.filterInput}
        />
      </div>
    </div>
  );
};

// Компонент итогов
const TotalsSummary: React.FC<{ documents: Document[] }> = ({ documents }) => {
  const total = documents.reduce((sum, d) => sum + d.totalAmount, 0);
  const byCategory = documents.reduce((acc, d) => {
    acc[d.category] = (acc[d.category] || 0) + d.totalAmount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div style={styles.summary}>
      <h3>Summary</h3>
      <div style={styles.summaryStats}>
        <div style={styles.stat}>
          <span>Total Expenses</span>
          <strong>${total.toFixed(2)}</strong>
        </div>
        <div style={styles.stat}>
          <span>Number of Items</span>
          <strong>{documents.length}</strong>
        </div>
        <div style={styles.stat}>
          <span>Average</span>
          <strong>${(total / documents.length || 0).toFixed(2)}</strong>
        </div>
      </div>

      <div style={styles.byCategory}>
        <h4>By Category</h4>
        {Object.entries(byCategory).map(([category, amount]) => (
          <div key={category} style={styles.categoryRow}>
            <span>{category}</span>
            <span>${amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// STYLES
const styles = {
  app: {
    minHeight: '100vh',
    background: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column' as const,
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  main: {
    flex: 1,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    width: '100%',
  },
  section: {
    marginBottom: '20px',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#f5f5f5',
  },
  emptyState: {
    textAlign: 'center' as const,
    padding: '60px 20px',
    background: '#fff',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  filterPanel: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  } as React.CSSProperties,
  filterGrid: {
    display: 'grid' as const,
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px',
  },
  filterInput: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  } as React.CSSProperties,
  summary: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  } as React.CSSProperties,
  summaryStats: {
    display: 'grid' as const,
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '16px',
    marginBottom: '20px',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '16px',
    background: '#f9f9f9',
    borderRadius: '6px',
    borderLeft: '4px solid #667eea',
  } as React.CSSProperties,
  byCategory: {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #f0f0f0',
  } as React.CSSProperties,
  categoryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #f0f0f0',
  } as React.CSSProperties,
  footer: {
    textAlign: 'center' as const,
    padding: '20px',
    background: '#f0f0f0',
    color: '#666',
    marginTop: '40px',
    fontSize: '14px',
  } as React.CSSProperties,
};

export default App;
