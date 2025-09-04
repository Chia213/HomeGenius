import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LocaleConfig, getCurrentLocale, setLocale, locales } from '../utils/localization';

interface LocaleContextType {
  currentLocale: string;
  config: LocaleConfig;
  setCurrentLocale: (locale: string) => void;
  availableLocales: string[];
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};

interface LocaleProviderProps {
  children: ReactNode;
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
  const [currentLocale, setCurrentLocaleState] = useState<string>(getCurrentLocale());

  const config = locales[currentLocale];
  const availableLocales = Object.keys(locales);

  const setCurrentLocale = (locale: string) => {
    setLocale(locale);
    setCurrentLocaleState(locale);
  };

  const value: LocaleContextType = {
    currentLocale,
    config,
    setCurrentLocale,
    availableLocales,
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
};
