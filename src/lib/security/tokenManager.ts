import { Encryption } from './encryption';

interface TokenData {
  token: string;
  refreshToken: string;
  expiresAt: number;
}

export class TokenManager {
  private static readonly TOKEN_KEY = 'auth_token';
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private static readonly EXPIRY_KEY = 'token_expiry';

  static setTokens(token: string, refreshToken: string, expiresIn: number): void {
    const expiresAt = Date.now() + expiresIn * 1000;
    const tokenData: TokenData = { token, refreshToken, expiresAt };
    
    const encryptedData = Encryption.encryptObject(tokenData);
    localStorage.setItem(this.TOKEN_KEY, encryptedData);
  }

  static getTokens(): TokenData | null {
    const encryptedData = localStorage.getItem(this.TOKEN_KEY);
    if (!encryptedData) return null;

    try {
      const tokenData = Encryption.decryptObject<TokenData>(encryptedData);
      if (Date.now() >= tokenData.expiresAt) {
        this.clearTokens();
        return null;
      }
      return tokenData;
    } catch (error) {
      this.clearTokens();
      return null;
    }
  }

  static clearTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static isTokenExpired(): boolean {
    const tokenData = this.getTokens();
    if (!tokenData) return true;
    return Date.now() >= tokenData.expiresAt;
  }

  static getAccessToken(): string | null {
    const tokenData = this.getTokens();
    return tokenData?.token || null;
  }

  static getRefreshToken(): string | null {
    const tokenData = this.getTokens();
    return tokenData?.refreshToken || null;
  }
}