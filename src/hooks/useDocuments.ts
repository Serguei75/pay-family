import { useState, useCallback, useEffect } from 'react';
import { Document } from '../types.ts';
import {
  initDB,
  addDocument as dbAddDocument,
  getAllDocuments,
  deleteDocument as dbDeleteDocument,
  updateDocument as dbUpdateDocument,
} from '../services/storageService.ts';

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize DB and load documents
  useEffect(() => {
    const loadDocuments = async () => {
      try {
        setLoading(true);
        await initDB();
        const docs = await getAllDocuments();
        setDocuments(docs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load documents');
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, []);

  const addDocument = useCallback(async (doc: Document) => {
    try {
      await dbAddDocument(doc);
      setDocuments(prev => [...prev, doc]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add document');
    }
  }, []);

  const deleteDocument = useCallback(async (id: string) => {
    try {
      await dbDeleteDocument(id);
      setDocuments(prev => prev.filter(d => d.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete document');
    }
  }, []);

  const updateDocument = useCallback(async (doc: Document) => {
    try {
      await dbUpdateDocument(doc);
      setDocuments(prev => prev.map(d => d.id === doc.id ? doc : d));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update document');
    }
  }, []);

  return {
    documents,
    loading,
    error,
    addDocument,
    deleteDocument,
    updateDocument,
  };
};
