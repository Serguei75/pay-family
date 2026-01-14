import React, { useEffect, useState } from 'react';

type Language = 'en' | 'ru' | 'pl';

const getDeviceLanguage = (): Language => {
  const lang = navigator.language.split('-')[0].toLowerCase();
  if (lang === 'pl') return 'pl';
  if (lang === 'ru') return 'ru';
  return 'en';
};

const LegalFooter: React.FC<{ language?: Language }> = ({ language: propLanguage }) => {
  const [language, setLanguage] = useState<Language>(propLanguage || 'en');

  useEffect(() => {
    if (!propLanguage) {
      setLanguage(getDeviceLanguage());
    }
  }, [propLanguage]);

  const translations = {
    en: {
      privacy: 'Privacy',
      legal: 'Legal',
      security: 'Security',
      dsr: 'Data Subject Requests',
      terms: 'Terms of Service',
      cookies: 'Cookie Policy',
      compliance: 'Compliance & Standards',
      gdpr: 'GDPR Compliant',
      lgpd: 'LGPD Compliant',
      pipeda: 'PIPEDA Compliant',
      ccpa: 'CCPA Compliant',
      copyright: '© Pay Family. All rights reserved.',
      license: 'MIT License - Open Source',
      currencies: 'Supported Currencies: USD, EUR, RUB, PLN',
    },
    ru: {
      privacy: 'Конфиденциальность',
      legal: 'Юридические документы',
      security: 'Безопасность',
      dsr: 'Запросы данных',
      terms: 'Условия обслуживания',
      cookies: 'Политика cookies',
      compliance: 'Соответствие стандартам',
      gdpr: 'Соответствие GDPR',
      lgpd: 'Соответствие LGPD',
      pipeda: 'Соответствие PIPEDA',
      ccpa: 'Соответствие CCPA',
      copyright: '© Pay Family. Все права защищены.',
      license: 'MIT License - Открытый исходный код',
      currencies: 'Поддерживаемые валюты: USD, EUR, RUB, PLN',
    },
    pl: {
      privacy: 'Prywatność',
      legal: 'Dokumenty prawne',
      security: 'Bezpieczeństwo',
      dsr: 'Wnioski o dane',
      terms: 'Warunki usługi',
      cookies: 'Polityka cookies',
      compliance: 'Zgodność ze standardami',
      gdpr: 'Zgodne z RODO',
      lgpd: 'Zgodne z LGPD',
      pipeda: 'Zgodne z PIPEDA',
      ccpa: 'Zgodne z CCPA',
      copyright: '© Pay Family. Wszelkie prawa zastrzeżone.',
      license: 'MIT License - Open Source',
      currencies: 'Obsługiwane waluty: USD, EUR, RUB, PLN',
    },
  };

  const t = translations[language];

  return (
    <footer
      style={{
        background: '#1f2122',
        color: '#e0e0e0',
        padding: '40px 20px',
        marginTop: '60px',
        borderTop: '1px solid #333',
        fontSize: '13px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Main footer links */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '30px',
            marginBottom: '40px',
          }}
        >
          {/* Privacy Column */}
          <div>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' }}>
              {t.privacy}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '6px' }}>
                <a href="mailto:privacy@payfamily.com" style={{ color: '#64b5f6', textDecoration: 'none' }}>
                  privacy@payfamily.com
                </a>
              </li>
              <li>
                <a href="#legal" style={{ color: '#64b5f6', textDecoration: 'none' }}>
                  {t.cookies}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' }}>
              {t.legal}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '6px' }}>
                <a href="mailto:legal@payfamily.com" style={{ color: '#64b5f6', textDecoration: 'none' }}>
                  legal@payfamily.com
                </a>
              </li>
              <li>
                <a href="#legal" style={{ color: '#64b5f6', textDecoration: 'none' }}>
                  {t.terms}
                </a>
              </li>
            </ul>
          </div>

          {/* Security Column */}
          <div>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' }}>
              {t.security}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '6px' }}>
                <a href="mailto:security@payfamily.com" style={{ color: '#64b5f6', textDecoration: 'none' }}>
                  security@payfamily.com
                </a>
              </li>
              <li>
                <a href="#security" style={{ color: '#64b5f6', textDecoration: 'none' }}>
                  🔐 Bug Bounty
                </a>
              </li>
            </ul>
          </div>

          {/* GDPR Column */}
          <div>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' }}>
              {t.dsr}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>
                <a href="mailto:dsr@payfamily.com" style={{ color: '#64b5f6', textDecoration: 'none' }}>
                  dsr@payfamily.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Compliance Badges */}
        <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid #333' }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: '#999' }}>
            {t.compliance}
          </h4>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div
              style={{
                padding: '8px 12px',
                background: 'rgba(100, 181, 246, 0.1)',
                border: '1px solid #64b5f6',
                borderRadius: '4px',
                fontSize: '12px',
                color: '#64b5f6',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              ✅ {t.gdpr}
            </div>
            <div
              style={{
                padding: '8px 12px',
                background: 'rgba(100, 181, 246, 0.1)',
                border: '1px solid #64b5f6',
                borderRadius: '4px',
                fontSize: '12px',
                color: '#64b5f6',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              ✅ {t.lgpd}
            </div>
            <div
              style={{
                padding: '8px 12px',
                background: 'rgba(100, 181, 246, 0.1)',
                border: '1px solid #64b5f6',
                borderRadius: '4px',
                fontSize: '12px',
                color: '#64b5f6',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              ✅ {t.pipeda}
            </div>
            <div
              style={{
                padding: '8px 12px',
                background: 'rgba(100, 181, 246, 0.1)',
                border: '1px solid #64b5f6',
                borderRadius: '4px',
                fontSize: '12px',
                color: '#64b5f6',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              ✅ {t.ccpa}
            </div>
          </div>
        </div>

        {/* Currency Support */}
        <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid #333' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#999' }}>💱 {t.currencies}</p>
        </div>

        {/* Bottom Section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            color: '#999',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div>
            <p style={{ margin: '0 0 4px 0' }}>{t.copyright}</p>
            <p style={{ margin: 0 }}>{t.license}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: '0 0 4px 0' }}>
              GitHub:{' '}
              <a href="https://github.com/Serguei75/pay-family" style={{ color: '#64b5f6', textDecoration: 'none' }}>
                Serguei75/pay-family
              </a>
            </p>
            <p style={{ margin: 0 }}>
              v1.0.0 (2026-01-14)
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LegalFooter;