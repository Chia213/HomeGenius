export interface Property {
  id: number;
  title: string;
  description?: string;
  price: number;
  area?: number;
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  address?: string;
  city?: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
  property_type?: string;
  condition?: string;
  year_built?: number;
  floor?: number;
  total_floors?: number;
  features?: Record<string, any>;
  images?: string[];
  created_at: string;
  updated_at?: string;
  is_active: boolean;
}

export interface PropertySearchParams {
  query?: string;
  min_price?: number;
  max_price?: number;
  min_area?: number;
  max_area?: number;
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  property_type?: string;
  city?: string;
  postal_code?: string;
  page?: number;
  limit?: number;
}

export interface PropertyResponse {
  properties: Property[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface AIAnalysis {
  id: number;
  property_id: number;
  predicted_price?: number;
  price_confidence?: number;
  price_factors?: Record<string, any>;
  detected_styles?: Array<{
    style: string;
    confidence: number;
  }>;
  style_confidence?: number;
  style_features?: Record<string, any>;
  image_analysis?: Record<string, any>;
  quality_score?: number;
  model_version?: string;
  analysis_type: string;
  processing_time?: number;
  created_at: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  full_name?: string;
  is_active: boolean;
  is_verified: boolean;
  preferences?: Record<string, any>;
  created_at: string;
  last_login?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  full_name?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface StyleCategory {
  id: number;
  name: string;
  description?: string;
  keywords?: string[];
  is_active: boolean;
  created_at: string;
}

export interface Recommendation {
  property_id: number;
  score: number;
  reason: string;
  style_match?: string[];
}
