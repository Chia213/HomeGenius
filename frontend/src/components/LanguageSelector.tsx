import React, { useState } from 'react';
import { useLocale } from '../contexts/LocaleContext.tsx';
import { Globe, Check } from 'lucide-react';

const LanguageSelector: React.FC = () => {
  const { currentLocale, config, setCurrentLocale, availableLocales } = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const getCountryFlag = (locale: string) => {
    const flagMap: Record<string, string> = {
      'sv-SE': '🇸🇪',
      'en-US': '🇺🇸',
      'en-GB': '🇬🇧',
      'de-DE': '🇩🇪',
      'fr-FR': '🇫🇷',
    };
    return flagMap[locale] || '🌍';
  };

  const getLanguageName = (locale: string) => {
    const nameMap: Record<string, string> = {
      'sv-SE': 'Svenska',
      'en-US': 'English (US)',
      'en-GB': 'English (UK)',
      'de-DE': 'Deutsch',
      'fr-FR': 'Français',
    };
    return nameMap[locale] || locale;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 rounded-md hover:bg-gray-100 transition-colors duration-200"
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium">
          {getCountryFlag(currentLocale)} {getLanguageName(currentLocale)}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
            <div className="py-1">
              {availableLocales.map((locale) => {
                const isSelected = locale === currentLocale;
                return (
                  <button
                    key={locale}
                    onClick={() => {
                      setCurrentLocale(locale);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200 ${
                      isSelected ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{getCountryFlag(locale)}</span>
                      <span>{getLanguageName(locale)}</span>
                    </div>
                    {isSelected && (
                      <Check className="h-4 w-4 text-blue-600" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;
