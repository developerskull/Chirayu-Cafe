'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type Lang = 'en' | 'mr';

interface LangContextType {
  lang: Lang;
  toggle: () => void;
  t: (en: string, mr: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  toggle: () => {},
  t: (en) => en,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('cc-lang') as Lang | null;
    if (saved === 'mr' || saved === 'en') setLang(saved);
  }, []);

  const toggle = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'en' ? 'mr' : 'en';
      localStorage.setItem('cc-lang', next);
      return next;
    });
  }, []);

  const t = useCallback(
    (en: string, mr: string) => (lang === 'mr' ? mr : en),
    [lang]
  );

  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
