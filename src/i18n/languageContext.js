import React, { createContext, useState, useEffect } from 'react';
import { translations } from './translations';

/* ── Contexte i18n unifié ───────────────────────────── */
export const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('playforest_lang') || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('playforest_lang', lang);
    document.documentElement.lang = lang === 'darija' ? 'ar' : lang;
    document.documentElement.dir = lang === 'darija' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = translations[lang] || translations.fr;
  const changeLang = (code) => setLang(code);

  return React.createElement(
    LanguageContext.Provider,
    { value: { lang, setLang: changeLang, t } },
    children
  );
};
