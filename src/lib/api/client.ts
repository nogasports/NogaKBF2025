import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { securityHeaders } from '../security/headers';
import { RateLimiter } from '../security/rateLimiter';
import { RequestValidator, ValidationSchema, ValidationError } from '../security/validation';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const rateLimiter = RateLimiter.getInstance();

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    ...securityHeaders,
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor for authentication and validation
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Add auth token
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Check rate limit
    const clientId = token || config.headers['X-Client-ID'] || 'anonymous';
    if (!rateLimiter.checkLimit(clientId)) {
      throw new Error('Rate limit exceeded');
    }

    // Add security headers
    config.headers = {
      ...config.headers,
      ...securityHeaders,
    };

    // Validate request data if schema is provided
    if (config.data && config.headers['X-Validation-Schema']) {
      try {
        const schema = config.headers['X-Validation-Schema'] as ValidationSchema;
        config.data = RequestValidator.validate(config.data, schema);
      } catch (error) {
        if (error instanceof ValidationError) {
          throw new Error(`Validation failed: ${JSON.stringify(error.errors)}`);
        }
        throw error;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token refresh and error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest.headers['X-Retry']) {
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await apiClient.post('/auth/refresh', { refreshToken });
        const { token } = response.data;
        
        localStorage.setItem('auth_token', token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        originalRequest.headers['X-Retry'] = 'true';
        
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Clear tokens and redirect to login
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle rate limit exceeded
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers['retry-after'];
      return Promise.reject(new Error(`Rate limit exceeded. Try again in ${retryAfter} seconds`));
    }

    // Handle validation errors
    if (error.response?.status === 400 && error.response?.data?.validation) {
      return Promise.reject(new ValidationError(error.response.data.validation));
    }

    // Handle network errors
    if (!error.response) {
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }

    return Promise.reject(error);
  }
);

// Helper function to add validation schema to request
export const withValidation = (schema: ValidationSchema) => {
  return {
    headers: {
      'X-Validation-Schema': schema,
    },
  };
};