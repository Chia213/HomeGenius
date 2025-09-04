import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Property, PropertySearchParams, PropertyResponse } from '../types';
import { propertyApi } from '../services/api';

interface PropertyContextType {
  properties: Property[];
  featuredProperties: Property[];
  searchResults: PropertyResponse | null;
  loading: boolean;
  searchProperties: (params: PropertySearchParams) => Promise<void>;
  getFeaturedProperties: () => Promise<void>;
  getPropertyById: (id: number) => Promise<Property | null>;
  clearSearch: () => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};

interface PropertyProviderProps {
  children: ReactNode;
}

export const PropertyProvider: React.FC<PropertyProviderProps> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [searchResults, setSearchResults] = useState<PropertyResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const searchProperties = async (params: PropertySearchParams) => {
    setLoading(true);
    try {
      const results = await propertyApi.search(params);
      setSearchResults(results);
      setProperties(results.properties);
    } catch (error) {
      console.error('Error searching properties:', error);
      setSearchResults(null);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const getFeaturedProperties = async () => {
    setLoading(true);
    try {
      const featured = await propertyApi.getFeatured();
      setFeaturedProperties(featured);
    } catch (error) {
      console.error('Error fetching featured properties:', error);
      setFeaturedProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const getPropertyById = async (id: number): Promise<Property | null> => {
    try {
      const property = await propertyApi.getById(id);
      return property;
    } catch (error) {
      console.error('Error fetching property:', error);
      return null;
    }
  };

  const clearSearch = () => {
    setSearchResults(null);
    setProperties([]);
  };

  const value: PropertyContextType = {
    properties,
    featuredProperties,
    searchResults,
    loading,
    searchProperties,
    getFeaturedProperties,
    getPropertyById,
    clearSearch,
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};
