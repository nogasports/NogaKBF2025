import { apiClient } from '../client';
import { ENDPOINTS } from '../endpoints';

export interface LoginCredentials {
  email: string;
  password: string;
  userType: 'admin' | 'team' | 'official' | 'player' | 'fan';
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post(ENDPOINTS.LOGIN, credentials);
    return response.data;
  },

  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    const response = await apiClient.post(ENDPOINTS.REFRESH_TOKEN, { refreshToken });
    return response.data;
  },

  async logout(): Promise<void> {
    await apiClient.post(ENDPOINTS.LOGOUT);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
  },
};