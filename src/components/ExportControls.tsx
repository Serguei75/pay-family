import React from 'react';
import { Document } from '../types.ts';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

interface ExportControlsProps {
  documents: Document[];
  fileName: string;
}

export const ExportControls: React.FC<ExportControlsProps> = ({
  documents,
  fileName,
}) => {
  const exportToCSV = () => {
    const csv = [
      ['Vendor', 'Amount', 'Category', 'Date', 'Added By', 'Description'],
      ...documents.map((d) => [
        d.vendorName,
        d.totalAmount,
        d.category,
        d.transactionDate,
        d.addedBy || 'Unknown',
        d.description || '',
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.csv`;
    a.click();
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      documents.map((d) => ({
        Vendor: d.vendorName,
        Amount: d.totalAmount,
        Category: d.category,
        Date: d.transactionDate,
        'Added By': d.addedBy || 'Unknown',
        Description: d.description || '',
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Receipts');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  const exportToPDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text('Receipt Summary', 20, 20);

    let yPos = 40;
    documents.forEach((d) => {
      if (yPos > 250) {
        pdf.addPage();
        yPos = 20;
      }
      pdf.setFontSize(12);
      pdf.text(`Vendor: ${d.vendorName}`, 20, yPos);
      yPos += 7;
      pdf.text(`Amount: $${d.totalAmount.toFixed(2)}`, 20, yPos);
      yPos += 7;
      pdf.text(`Category: ${d.category}`, 20, yPos);
      yPos += 7;
      pdf.text(`Date: ${d.transactionDate}`, 20, yPos);
      yPos += 12;
    });

    pdf.save(`${fileName}.pdf`);
  };

  return (
    <div style={styles.container}>
      <h3>Export Data</h3>
      <div style={styles.buttons}>
        <button onClick={exportToCSV} style={styles.button}>
          📊 CSV
        </button>
        <button onClick={exportToExcel} style={styles.button}>
          📈 Excel
        </button>
        <button onClick={exportToPDF} style={styles.button}>
          📄 PDF
        </button>
      </div>
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
  buttons: {
    display: 'flex',
    gap: '12px',
    marginTop: '12px',
  } as React.CSSProperties,
  button: {
    padding: '10px 16px',
    background: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold' as const,
  } as React.CSSProperties,
};
