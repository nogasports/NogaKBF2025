import { useState, useCallback, useEffect } from 'react';
import { authService, LoginCredentials, AuthResponse } from '../lib/api/services/auth.service';
import { TokenManager } from '../lib/security/tokenManager';
import { schemas } from '../lib/security/validation';
import { withValidation } from '../lib/api/client';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tokenData = TokenManager.getTokens();
    if (tokenData && !TokenManager.isTokenExpired()) {
      setIsAuthenticated(true);
      // TODO: Fetch user profile
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials, withValidation(schemas.login));
      TokenManager.setTokens(
        response.token,
        response.refreshToken,
        3600 // 1 hour
      );
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      TokenManager.clearTokens();
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
  };
}