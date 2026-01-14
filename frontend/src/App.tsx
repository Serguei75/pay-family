import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';

import { Header } from './components/Header.tsx';
import { ReceiptForm } from './components/ReceiptForm.tsx';
import { FilterControls } from './components/FilterControls.tsx';
import { ReceiptList } from './components/ReceiptList.tsx';
import { ExportControls } from './components/ExportControls.tsx';
import { TotalsDisplay } from './components/TotalsDisplay.tsx';
import { PricingView } from './components/PricingView.tsx';
import { LoginScreen } from './components/LoginScreen.tsx';
import { ReceiptIcon } from './components/icons/ReceiptIcon.tsx';
import { InvoiceIcon } from './components/icons/InvoiceIcon.tsx';
import { CategoryManager } from './components/CategoryManager.tsx';
import LegalHub from './components/LegalHub';
import LegalFooter from './components/LegalFooter';

import type { Document, FilterState, UserProfile } from './types.ts';
import { CATEGORIES } from './types.ts';
import { extractDocumentData } from './services/geminiService.ts';
import { initAuth as initPuter, getUserProfile as getPuterProfile, signOut as signOutPuter, triggerSignIn as signInPuter } from './services/authService.ts';
import { initGoogleAuth, triggerGoogleSignIn, signOutGoogle } from './services/googleAuthService.ts';
import { useTranslation } from './contexts/LanguageContext.tsx';
import { parseCsvToDocuments } from './services/csvParser.ts';
import * as storageService from './services/storageService.ts';
import { Spinner } from './Spinner.tsx';

type ActiveView = 'receipts' | 'invoices' | 'pricing' | 'legal';

const initialFilterState: FilterState = {
  vendor: 'all',
  startDate: '',
  endDate: '',
  category: 'all',
  companyName: '',
  taxId: '',
  member: 'all',
};

export const App = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isPuterSignedIn, setIsPuterSignedIn] = useState(false);
  const [isGoogleSignedIn, setIsGoogleSignedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(() => localStorage.getItem('auth_mode') === 'guest');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>('receipts');
  const [familyRole, setFamilyRole] = useState(() => localStorage.getItem('familyRole') || 'Husband');
  const [userCategories, setUserCategories] = useState(() => {
    const saved = localStorage.getItem('userCategories');
    return saved ? JSON.parse(saved) : [...CATEGORIES];
  });
  const [filters, setFilters] = useState(initialFilterState);
  const [selectedIds, setSelectedIds] = useState(new Set<string>());
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const objectUrlsRef = useRef(new Set<string>());

  const { t, language } = useTranslation();

  const defaultCurrency = useMemo(() => {
    if (language === 'pl') return 'PLN';
    if (language === 'ru') return 'RUB';
    return 'USD';
  }, [language]);

  const loadAndSetDocuments = useCallback(async () => {
    try {
      const docsFromDb = await storageService.getAllDocuments();
      objectUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
      objectUrlsRef.current.clear();

      const docsWithImageUrls = docsFromDb.map(doc => {
        if (doc.file) {
          const url = URL.createObjectURL(doc.file);
          objectUrlsRef.current.add(url);
          return { ...doc, imageSrc: url } as Document;
        }
        return doc as Document;
      });

      setDocuments(
        docsWithImageUrls.sort(
          (a, b) =>
            new Date(b.transactionDate).getTime() -
            new Date(a.transactionDate).getTime()
        )
      );
    } catch (e) {
      console.error('Load failed', e);
    }
  }, []);

  useEffect(() => {
    async function startup() {
      await storageService.initDB();
      await loadAndSetDocuments();

      initPuter(async (status) => {
        setIsPuterSignedIn(status.isSignedIn);
        if (status.isSignedIn) {
          const profile = await getPuterProfile();
          setUserProfile(profile);
        }
      });

      initGoogleAuth((status) => {
        setIsGoogleSignedIn(status.isSignedIn);
      });
    }

    startup();
  }, [loadAndSetDocuments]);

  const handleAddDocument = async (input: File | string) => {
    setIsLoading(true);
    setError(null);
    try {
      const extracted = await extractDocumentData(input, userCategories);
      const addedBy =
        userProfile?.name ||
        (familyRole === 'Husband' ? t('husband') : t('wife'));

      const newDoc: Document = {
        ...extracted,
        id: Date.now().toString(),
        addedBy,
        file: typeof input !== 'string' ? input : undefined,
      };

      await storageService.addDocument(newDoc);
      await loadAndSetDocuments();
      setActiveView(newDoc.type === 'receipt' ? 'receipts' : 'invoices');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errorGeneric'));
    } finally {
      setIsLoading(false);
    }
  };

  const membersList = useMemo(
    () =>
      Array.from(
        new Set(documents.map(d => d.addedBy).filter(Boolean))
      ) as string[],
    [documents]
  );

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      if (activeView === 'receipts' && doc.type !== 'receipt') return false;
      if (activeView === 'invoices' && doc.type !== 'invoice') return false;
      if (activeView === 'legal') return true; // Legal view shows no documents

      const dateMatch =
        (!filters.startDate || doc.transactionDate >= filters.startDate) &&
        (!filters.endDate || doc.transactionDate <= filters.endDate);
      const memberMatch =
        filters.member === 'all' || doc.addedBy === filters.member;

      if (doc.type === 'receipt') {
        const vendorMatch =
          filters.vendor === 'all' || doc.vendorName === filters.vendor;
        const catMatch =
          filters.category === 'all' || doc.category === filters.category;
        return dateMatch && memberMatch && vendorMatch && catMatch;
      } else {
        const companyMatch =
          !filters.companyName ||
          doc.companyName.toLowerCase().includes(filters.companyName.toLowerCase());
        return dateMatch && memberMatch && companyMatch;
      }
    });
  }, [documents, filters, activeView]);

  const getGrandTotals = useCallback(() => {
    const totals = new Map<string, number>();
    documents
      .filter(d => d.type === (activeView === 'receipts' ? 'receipt' : 'invoice'))
      .forEach(doc => {
        const curr = doc.currency.toUpperCase();
        totals.set(curr, (totals.get(curr) || 0) + doc.totalAmount);
      });
    return totals;
  }, [documents, activeView]);

  const getFilteredTotals = useCallback(() => {
    const totals = new Map<string, number>();
    filteredDocuments.forEach(doc => {
      const curr = doc.currency.toUpperCase();
      totals.set(curr, (totals.get(curr) || 0) + doc.totalAmount);
    });
    return totals;
  }, [filteredDocuments]);

  if (!isPuterSignedIn && !isGuest) {
    return <LoginScreen onGuestLogin={() => setIsGuest(true)} />;
  }

  return (
    <div className="app-container">
      <Header activeView={activeView} setActiveView={setActiveView} />

      <main className="main-content">
        {activeView === 'receipts' && (
          <>
            <ReceiptForm onAddDocument={handleAddDocument} isLoading={isLoading} />
            {error && <div className="error-message">{error}</div>}
            <FilterControls
              filters={filters}
              setFilters={setFilters}
              documents={documents}
              membersList={membersList}
            />
            <TotalsDisplay totals={getFilteredTotals()} />
            <ReceiptList documents={filteredDocuments} />
            <ExportControls documents={filteredDocuments} />
          </>
        )}

        {activeView === 'invoices' && (
          <>
            <ReceiptForm
              onAddDocument={handleAddDocument}
              isLoading={isLoading}
              documentType="invoice"
            />
            {error && <div className="error-message">{error}</div>}
            <FilterControls
              filters={filters}
              setFilters={setFilters}
              documents={documents}
              membersList={membersList}
              documentType="invoice"
            />
            <TotalsDisplay totals={getFilteredTotals()} />
            <ReceiptList documents={filteredDocuments} />
            <ExportControls documents={filteredDocuments} />
          </>
        )}

        {activeView === 'pricing' && <PricingView />}

        {activeView === 'legal' && <LegalHub />}
      </main>

      <LegalFooter />
    </div>
  );
};
