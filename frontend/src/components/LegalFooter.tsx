import React from 'react';

type Language = 'en' | 'ru';

interface FooterLink {
  label: { en: string; ru: string };
  email: string;
  icon: string;
}

const footerLinks: FooterLink[] = [
  {
    label: { en: 'Privacy', ru: 'Конфиденциальность' },
    email: 'privacy@payfamily.com',
    icon: '🔍',
  },
  {
    label: { en: 'Legal', ru: 'Юридическая' },
    email: 'legal@payfamily.com',
    icon: '⚖️',
  },
  {
    label: { en: 'Security', ru: 'Безопасность' },
    email: 'security@payfamily.com',
    icon: '🔐',
  },
  {
    label: { en: 'Data Rights', ru: 'Права данных' },
    email: 'dsr@payfamily.com',
    icon: '📄',
  },
];

export const LegalFooter: React.FC<{ language?: Language }> = ({ language = 'en' }) => {
  return (
    <footer
      style={{
        background: '#f5f5f5',
        borderTop: '1px solid #e0e0e0',
        padding: '30px 20px',
        marginTop: '50px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Main footer content */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', marginBottom: '30px' }}>
          {/* Company info */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>Pay Family</h3>
            <p style={{ fontSize: '13px', color: '#666', margin: '5px 0', lineHeight: '1.6' }}>
              {language === 'en' ? 'Financial intelligence platform with zero-knowledge architecture.' : 'Платформа финансового анализа с архитектурой нулевого знания.'}
            </p>
            <div style={{ marginTop: '12px', fontSize: '13px', color: '#0066cc' }}>
              {language === 'en' ? 'Support: ' : 'Поддержка: '}
              <a href="mailto:support@payfamily.com" style={{ color: '#0066cc', textDecoration: 'none' }}>
                support@payfamily.com
              </a>
            </div>
          </div>

          {/* Legal documents */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>
              {language === 'en' ? 'Legal Documents' : 'Юридические документы'}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <a href="#legal" style={{ fontSize: '13px', color: '#0066cc', textDecoration: 'none' }}>
                  {language === 'en' ? 'Terms of Service' : 'Условия обслуживания'}
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#legal" style={{ fontSize: '13px', color: '#0066cc', textDecoration: 'none' }}>
                  {language === 'en' ? 'Privacy Policy' : 'Политика конфиденциальности'}
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#legal" style={{ fontSize: '13px', color: '#0066cc', textDecoration: 'none' }}>
                  {language === 'en' ? 'Security Statement' : 'Заявление о безопасности'}
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#legal" style={{ fontSize: '13px', color: '#0066cc', textDecoration: 'none' }}>
                  {language === 'en' ? 'Cookie Policy' : 'Политика Cookies'}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>
              {language === 'en' ? 'Contact' : 'Контакты'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {footerLinks.map((link) => (
                <div key={link.email} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>{link.icon}</span>
                  <a
                    href={`mailto:${link.email}`}
                    style={{
                      fontSize: '13px',
                      color: '#0066cc',
                      textDecoration: 'none',
                    }}
                  >
                    {link.label[language]}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance badges */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>
              {language === 'en' ? 'Compliance' : 'Комплайенс'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <div style={{ padding: '8px', background: '#e3f2fd', borderRadius: '4px', color: '#0066cc' }}>
                ✅ GDPR
              </div>
              <div style={{ padding: '8px', background: '#e3f2fd', borderRadius: '4px', color: '#0066cc' }}>
                ✅ LGPD
              </div>
              <div style={{ padding: '8px', background: '#e3f2fd', borderRadius: '4px', color: '#0066cc' }}>
                ✅ PIPEDA
              </div>
              <div style={{ padding: '8px', background: '#e3f2fd', borderRadius: '4px', color: '#0066cc' }}>
                ✅ CCPA
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#999' }}>
          <p style={{ margin: 0 }}>
            {language === 'en' ? '© 2024-2026 Pay Family. All rights reserved. ' : '© 2024-2026 Pay Family. Все права защищены. '}
            <a href="#" style={{ color: '#0066cc', textDecoration: 'none' }}>
              {language === 'en' ? 'MIT License' : 'MIT Лицензия'}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LegalFooter;