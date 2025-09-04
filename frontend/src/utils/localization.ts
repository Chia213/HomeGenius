export interface LocaleConfig {
  country: string;
  currency: string;
  currencyCode: string;
  language: string;
  dateFormat: string;
  numberFormat: string;
  labels: {
    rooms: string;
    bedrooms: string;
    bathrooms: string;
    area: string;
    price: string;
    search: string;
    featured: string;
    aiAnalysis: string;
    styleAnalysis: string;
    pricePrediction: string;
    recommendations: string;
  };
  placeholders: {
    search: string;
    city: string;
    minPrice: string;
    maxPrice: string;
    minArea: string;
  };
}

export const locales: Record<string, LocaleConfig> = {
  'sv-SE': {
    country: 'Sweden',
    currency: 'SEK',
    currencyCode: 'SEK',
    language: 'sv-SE',
    dateFormat: 'sv-SE',
    numberFormat: 'sv-SE',
    labels: {
      rooms: 'rum',
      bedrooms: 'sovrum',
      bathrooms: 'badrum',
      area: 'm²',
      price: 'Pris',
      search: 'Sök',
      featured: 'Utvalda bostäder',
      aiAnalysis: 'AI-analys',
      styleAnalysis: 'Stilanalys',
      pricePrediction: 'Prisprognos',
      recommendations: 'Rekommendationer',
    },
    placeholders: {
      search: 'Sök efter bostäder, platser eller stilar...',
      city: 'Stockholm, Göteborg...',
      minPrice: '0',
      maxPrice: 'Ingen gräns',
      minArea: 'Valfri',
    },
  },
  'en-US': {
    country: 'United States',
    currency: 'USD',
    currencyCode: 'USD',
    language: 'en-US',
    dateFormat: 'en-US',
    numberFormat: 'en-US',
    labels: {
      rooms: 'rooms',
      bedrooms: 'bedrooms',
      bathrooms: 'bathrooms',
      area: 'sq ft',
      price: 'Price',
      search: 'Search',
      featured: 'Featured Properties',
      aiAnalysis: 'AI Analysis',
      styleAnalysis: 'Style Analysis',
      pricePrediction: 'Price Prediction',
      recommendations: 'Recommendations',
    },
    placeholders: {
      search: 'Search for properties, locations, or styles...',
      city: 'New York, Los Angeles...',
      minPrice: '0',
      maxPrice: 'No limit',
      minArea: 'Any',
    },
  },
  'en-GB': {
    country: 'United Kingdom',
    currency: 'GBP',
    currencyCode: 'GBP',
    language: 'en-GB',
    dateFormat: 'en-GB',
    numberFormat: 'en-GB',
    labels: {
      rooms: 'rooms',
      bedrooms: 'bedrooms',
      bathrooms: 'bathrooms',
      area: 'sq ft',
      price: 'Price',
      search: 'Search',
      featured: 'Featured Properties',
      aiAnalysis: 'AI Analysis',
      styleAnalysis: 'Style Analysis',
      pricePrediction: 'Price Prediction',
      recommendations: 'Recommendations',
    },
    placeholders: {
      search: 'Search for properties, locations, or styles...',
      city: 'London, Manchester...',
      minPrice: '0',
      maxPrice: 'No limit',
      minArea: 'Any',
    },
  },
  'de-DE': {
    country: 'Germany',
    currency: 'EUR',
    currencyCode: 'EUR',
    language: 'de-DE',
    dateFormat: 'de-DE',
    numberFormat: 'de-DE',
    labels: {
      rooms: 'Zimmer',
      bedrooms: 'Schlafzimmer',
      bathrooms: 'Badezimmer',
      area: 'm²',
      price: 'Preis',
      search: 'Suchen',
      featured: 'Empfohlene Immobilien',
      aiAnalysis: 'KI-Analyse',
      styleAnalysis: 'Stilanalyse',
      pricePrediction: 'Preisvorhersage',
      recommendations: 'Empfehlungen',
    },
    placeholders: {
      search: 'Nach Immobilien, Standorten oder Stilen suchen...',
      city: 'Berlin, München...',
      minPrice: '0',
      maxPrice: 'Keine Grenze',
      minArea: 'Beliebig',
    },
  },
  'fr-FR': {
    country: 'France',
    currency: 'EUR',
    currencyCode: 'EUR',
    language: 'fr-FR',
    dateFormat: 'fr-FR',
    numberFormat: 'fr-FR',
    labels: {
      rooms: 'pièces',
      bedrooms: 'chambres',
      bathrooms: 'salles de bain',
      area: 'm²',
      price: 'Prix',
      search: 'Rechercher',
      featured: 'Propriétés en vedette',
      aiAnalysis: 'Analyse IA',
      styleAnalysis: 'Analyse de style',
      pricePrediction: 'Prédiction de prix',
      recommendations: 'Recommandations',
    },
    placeholders: {
      search: 'Rechercher des propriétés, lieux ou styles...',
      city: 'Paris, Lyon...',
      minPrice: '0',
      maxPrice: 'Aucune limite',
      minArea: 'Tout',
    },
  },
};

export const getCurrentLocale = (): string => {
  // Try to get from localStorage first, then browser language, then default to en-US
  const stored = localStorage.getItem('locale');
  if (stored && locales[stored]) {
    return stored;
  }
  
  const browserLang = navigator.language;
  if (locales[browserLang]) {
    return browserLang;
  }
  
  // Try to match language without region
  const langOnly = browserLang.split('-')[0];
  const matchingLocale = Object.keys(locales).find(locale => 
    locale.startsWith(langOnly)
  );
  
  return matchingLocale || 'en-US';
};

export const setLocale = (locale: string) => {
  if (locales[locale]) {
    localStorage.setItem('locale', locale);
    window.location.reload(); // Reload to apply new locale
  }
};

export const formatPrice = (price: number, locale: string = getCurrentLocale()): string => {
  const config = locales[locale];
  return new Intl.NumberFormat(config.numberFormat, {
    style: 'currency',
    currency: config.currencyCode,
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatArea = (area: number, locale: string = getCurrentLocale()): string => {
  const config = locales[locale];
  return `${area} ${config.labels.area}`;
};

export const getLocalizedText = (key: keyof LocaleConfig['labels'], locale: string = getCurrentLocale()): string => {
  return locales[locale]?.labels[key] || locales['en-US'].labels[key];
};

export const getLocalizedPlaceholder = (key: keyof LocaleConfig['placeholders'], locale: string = getCurrentLocale()): string => {
  return locales[locale]?.placeholders[key] || locales['en-US'].placeholders[key];
};
