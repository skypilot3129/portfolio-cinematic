"use client";

import { createContext, useState, useContext, ReactNode } from 'react';
import { translations } from '@/lib/translations';

type Language = 'en' | 'id';

// Tipe untuk opsi terjemahan (misalnya, untuk mengambil item dari array)
type TranslationOptions = {
  index?: number;
};

// Mendefinisikan tipe data yang lebih spesifik untuk konten terjemahan
type TranslationValue = string | string[] | Record<string, unknown>[] | Record<string, unknown>;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  // Mengganti 'any' dengan 'unknown' untuk return value yang lebih aman
  t: (key: string, options?: TranslationOptions) => unknown;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('id');

  const t = (key: string, options?: TranslationOptions): unknown => {
    const keys = key.split('.');
    // Mengganti 'any' dengan tipe yang lebih spesifik
    let result: TranslationValue | undefined = translations[language];
    
    for (const k of keys) {
      if (typeof result === 'object' && result !== null && !Array.isArray(result)) {
        result = (result as Record<string, TranslationValue>)[k];
      } else {
        result = undefined;
        break;
      }

      if (result === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    if (options && options.index !== undefined && Array.isArray(result)) {
        return result[options.index];
    }
    
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

