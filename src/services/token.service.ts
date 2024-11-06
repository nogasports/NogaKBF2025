import * as jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { User } from '../entities/User';
import { ValidationError } from '../utils/errors';

export class TokenService {
  generateTokens(user: User) {
    const payload = {
      userId: user.id,
      role: user.role
    };

    const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    return { token, refreshToken };
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return jwt.verify(token, env.JWT_SECRET);
    } catch (error) {
      throw new ValidationError('Invalid token');
    }
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
      const newToken = jwt.sign(
        { userId: payload.userId, role: payload.role },
        env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return { token: newToken };
    } catch (error) {
      throw new ValidationError('Invalid refresh token');
    }
  }

  async revokeToken(refreshToken: string): Promise<void> {
    // In a real application, you would add the token to a blacklist
    // or remove it from a whitelist in the database
  }
}