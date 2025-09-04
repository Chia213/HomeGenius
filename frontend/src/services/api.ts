import axios from 'axios';
import { 
  Property, 
  PropertySearchParams, 
  PropertyResponse, 
  AIAnalysis, 
  User, 
  LoginCredentials, 
  RegisterData, 
  AuthResponse,
  StyleCategory,
  Recommendation
} from '../types/index.ts';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Property API
export const propertyApi = {
  search: async (params: PropertySearchParams): Promise<PropertyResponse> => {
    const response = await api.get('/api/properties/', { params });
    return response.data;
  },

  getById: async (id: number): Promise<Property> => {
    const response = await api.get(`/api/properties/${id}`);
    return response.data;
  },

  getFeatured: async (limit: number = 10): Promise<Property[]> => {
    const response = await api.get('/api/properties/featured/', { params: { limit } });
    return response.data;
  },

  create: async (property: Omit<Property, 'id' | 'created_at' | 'updated_at' | 'is_active'>): Promise<Property> => {
    const response = await api.post('/api/properties/', property);
    return response.data;
  },

  update: async (id: number, property: Partial<Property>): Promise<Property> => {
    const response = await api.put(`/api/properties/${id}`, property);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/properties/${id}`);
  },
};

// AI Analysis API
export const aiApi = {
  analyzeProperty: async (propertyId: number, analysisType: string = 'combined'): Promise<AIAnalysis> => {
    const response = await api.post('/api/ai/analyze-property', {
      property_id: propertyId,
      analysis_type: analysisType,
    });
    return response.data;
  },

  analyzeImage: async (file: File, propertyId?: number, analysisType: string = 'style'): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);
    if (propertyId) formData.append('property_id', propertyId.toString());
    formData.append('analysis_type', analysisType);

    const response = await api.post('/api/ai/analyze-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getPropertyAnalysis: async (propertyId: number, analysisType?: string): Promise<AIAnalysis[]> => {
    const params = analysisType ? { analysis_type: analysisType } : {};
    const response = await api.get(`/api/ai/property/${propertyId}/analysis`, { params });
    return response.data;
  },

  getPricePrediction: async (propertyId: number): Promise<any> => {
    const response = await api.get(`/api/ai/price-prediction/${propertyId}`);
    return response.data;
  },

  getStyleCategories: async (): Promise<StyleCategory[]> => {
    const response = await api.get('/api/ai/styles/');
    return response.data;
  },
};

// Auth API
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    const response = await api.post('/api/auth/token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  register: async (userData: RegisterData): Promise<User> => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  updateProfile: async (preferences: Record<string, any>): Promise<User> => {
    const response = await api.put('/api/auth/me', { preferences });
    return response.data;
  },
};

// Recommendations API
export const recommendationApi = {
  getUserRecommendations: async (userId: number, limit: number = 10, recommendationType?: string): Promise<Property[]> => {
    const params: any = { limit };
    if (recommendationType) params.recommendation_type = recommendationType;
    
    const response = await api.get(`/api/recommendations/user/${userId}/properties`, { params });
    return response.data;
  },

  getStyleBasedRecommendations: async (styleKeywords: string[], limit: number = 10): Promise<Property[]> => {
    const response = await api.get('/api/recommendations/style-based', {
      params: { style_keywords: styleKeywords, limit },
    });
    return response.data;
  },

  getSimilarProperties: async (propertyId: number, limit: number = 10): Promise<Property[]> => {
    const response = await api.get(`/api/recommendations/similar/${propertyId}`, { params: { limit } });
    return response.data;
  },

  getTrendingProperties: async (limit: number = 10): Promise<Property[]> => {
    const response = await api.get('/api/recommendations/trending', { params: { limit } });
    return response.data;
  },

  submitFeedback: async (recommendationId: number, feedback: string): Promise<void> => {
    await api.post('/api/recommendations/feedback', {
      recommendation_id: recommendationId,
      feedback,
    });
  },
};

export default api;
